import React, { useEffect, useRef } from 'react';
import Event from './Event';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

const Calendar = ({ currentDate, events, onEventDrop, onEventClick }) => {
  const calendarRef = useRef();

  useEffect(() => {
    // Make sure jQuery UI is loaded
    if (typeof $.fn.draggable === 'undefined' || typeof $.fn.droppable === 'undefined') {
      console.error('jQuery UI draggable/droppable not loaded');
      return;
    }

    // Initialize jQuery UI draggable
    $('.event', calendarRef.current).draggable({
      revert: 'invalid',
      helper: 'clone',
      cursor: 'move',
      zIndex: 100,
      start: function(event, ui) {
        $(this).css('opacity', '0.5');
      },
      stop: function(event, ui) {
        $(this).css('opacity', '1');
      }
    });

    // Initialize jQuery UI droppable
    $('.calendar-day', calendarRef.current).droppable({
      accept: '.event',
      drop: function(event, ui) {
        const eventId = ui.draggable.data('event-id');
        const targetDate = $(this).data('date');
        
        if (eventId && targetDate) {
          onEventDrop(eventId, targetDate);
        }
        
        ui.draggable.css('opacity', '1');
      },
      over: function(event, ui) {
        $(this).css('background-color', '#e3f2fd');
      },
      out: function(event, ui) {
        $(this).css('background-color', '');
      }
    });

    // Cleanup
    return () => {
      $('.event, .calendar-day', calendarRef.current).draggable('destroy').droppable('destroy');
    };
  }, [events, onEventDrop]);

  // ... rest of the component remains the same
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDate(date);
      const dayEvents = events.filter(event => event.date === dateString);
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday(date) ? 'today' : ''}`}
          data-date={dateString}
        >
          <div className="calendar-date">{day}</div>
          {dayEvents.map(event => (
            <Event 
              key={event.id} 
              event={event} 
              onEdit={onEventClick}
              onDelete={onEventClick}
            />
          ))}
        </div>
      );
    }
    
    return days;
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar" ref={calendarRef}>
      <div className="calendar-header">
        {dayNames.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
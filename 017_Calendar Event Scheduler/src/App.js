import React, { useState, useCallback } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Generate unique ID for events
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add or update event
  const handleSaveEvent = useCallback((eventData) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id ? { ...event, ...eventData } : event
      ));
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: generateId()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    
    setShowForm(false);
    setSelectedEvent(null);
  }, [selectedEvent]);

  // Delete event
  const handleDeleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  }, []);

  // Handle event click (edit or delete)
  const handleEventClick = useCallback((event) => {
    if (event && typeof event === 'object' && event.id) {
      // Edit event
      setSelectedEvent(event);
      setShowForm(true);
    } else if (typeof event === 'string') {
      // Delete event (event is the ID string)
      handleDeleteEvent(event);
    }
  }, [handleDeleteEvent]);

  // Handle event drag & drop
  const handleEventDrop = useCallback((eventId, newDate) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, date: newDate } : event
    ));
  }, []);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Calendar Event Scheduler</h1>
        <div className="calendar-navigation">
          <button className="btn btn-secondary" onClick={goToPreviousMonth}>
            Previous
          </button>
          <h2>{formatMonthYear(currentDate)}</h2>
          <button className="btn btn-secondary" onClick={goToNextMonth}>
            Next
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setSelectedEvent(null);
              setShowForm(true);
            }}
            style={{ marginLeft: '20px' }}
          >
            Add Event
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar
          currentDate={currentDate}
          events={events}
          onEventDrop={handleEventDrop}
          onEventClick={handleEventClick}
        />

        {showForm && (
          <EventForm
            event={selectedEvent}
            onSave={handleSaveEvent}
            onCancel={() => {
              setShowForm(false);
              setSelectedEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
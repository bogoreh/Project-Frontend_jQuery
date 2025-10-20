import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const Chart = ({ data, metric }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const drawChart = () => {
      const $chart = $(chartRef.current);
      $chart.empty();

      // Create simple bar chart using jQuery and CSS
      data.forEach((item, index) => {
        const value = item[metric];
        const maxValue = Math.max(...data.map(d => d[metric]));
        const height = (value / maxValue) * 150;
        
        const $bar = $('<div>').addClass('chart-bar');
        $bar.css({
          height: `${height}px`,
          left: `${index * 40}px`
        });
        
        const $label = $('<div>').addClass('chart-label').text(item.month);
        const $value = $('<div>').addClass('chart-value').text(value);
        
        $bar.append($value);
        $chart.append($bar);
        $chart.append($label);
      });

      // Animate chart bars
      $('.chart-bar').each(function(index) {
        $(this).hide().delay(index * 200).slideDown(500);
      });
    };

    drawChart();
  }, [data, metric]);

  return (
    <div className="chart-container">
      <h3>{metric.charAt(0).toUpperCase() + metric.slice(1)} Over Time</h3>
      <div ref={chartRef} className="chart"></div>
    </div>
  );
};

export default Chart;
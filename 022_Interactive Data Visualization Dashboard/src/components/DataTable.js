import React, { useEffect } from 'react';
import $ from 'jquery';

const DataTable = ({ data }) => {
  useEffect(() => {
    // Add jQuery table interactions
    $('.data-table tbody tr').hover(
      function() {
        $(this).addClass('highlight');
      },
      function() {
        $(this).removeClass('highlight');
      }
    );

    // Sort table functionality
    $('.sortable').click(function() {
      const column = $(this).data('column');
      const $table = $('.data-table');
      const $rows = $table.find('tbody tr').get();
      
      $rows.sort((a, b) => {
        const aVal = $(a).find(`td:eq(${getColumnIndex(column)})`).text();
        const bVal = $(b).find(`td:eq(${getColumnIndex(column)})`).text();
        
        return isNaN(aVal) ? aVal.localeCompare(bVal) : aVal - bVal;
      });
      
      $table.find('tbody').empty().append($rows);
    });

    // Animate table rows
    $('.data-table tbody tr').hide().each(function(index) {
      $(this).delay(index * 100).fadeIn(300);
    });
  }, [data]);

  const getColumnIndex = (column) => {
    const columns = ['month', 'sales', 'revenue', 'users', 'conversion'];
    return columns.indexOf(column);
  };

  return (
    <div className="table-container">
      <h3>Detailed Data</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th className="sortable" data-column="month">Month</th>
            <th className="sortable" data-column="sales">Sales</th>
            <th className="sortable" data-column="revenue">Revenue ($)</th>
            <th className="sortable" data-column="users">Users</th>
            <th className="sortable" data-column="conversion">Conversion (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.sales.toLocaleString()}</td>
              <td>${item.revenue.toLocaleString()}</td>
              <td>{item.users.toLocaleString()}</td>
              <td>{item.conversion}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
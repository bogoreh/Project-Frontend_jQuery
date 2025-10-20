import React, { useEffect } from 'react';
import $ from 'jquery';

const StatsCards = ({ data }) => {
  useEffect(() => {
    // jQuery animation for cards
    $('.stat-card').hide().fadeIn(1000);
    
    // Add hover effects
    $('.stat-card').hover(
      function() {
        $(this).css('transform', 'translateY(-5px)');
      },
      function() {
        $(this).css('transform', 'translateY(0)');
      }
    );
  }, [data]);

  const calculateStats = () => {
    if (data.length === 0) return { totalSales: 0, totalRevenue: 0, avgUsers: 0, avgConversion: 0 };
    
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const avgUsers = data.reduce((sum, item) => sum + item.users, 0) / data.length;
    const avgConversion = data.reduce((sum, item) => sum + item.conversion, 0) / data.length;

    return { totalSales, totalRevenue, avgUsers, avgConversion };
  };

  const stats = calculateStats();

  return (
    <div className="stats-cards">
      <div className="stat-card sales">
        <h3>Total Sales</h3>
        <p className="stat-value">{stats.totalSales.toLocaleString()}</p>
      </div>
      
      <div className="stat-card revenue">
        <h3>Total Revenue</h3>
        <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
      </div>
      
      <div className="stat-card users">
        <h3>Average Users</h3>
        <p className="stat-value">{stats.avgUsers.toFixed(0)}</p>
      </div>
      
      <div className="stat-card conversion">
        <h3>Avg Conversion</h3>
        <p className="stat-value">{stats.avgConversion.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default StatsCards;
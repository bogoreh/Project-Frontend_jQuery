import React, { useState, useEffect } from 'react';
import StatsCards from './components/StatsCards';
import Chart from './components/Chart';
import DataTable from './components/DataTable';
import { generateSampleData } from './utils/dataGenerator';
import './styles/App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('sales');

  useEffect(() => {
    // Generate initial sample data
    const sampleData = generateSampleData();
    setData(sampleData);
  }, []);

  const handleRefreshData = () => {
    const newData = generateSampleData();
    setData(newData);
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Interactive Data Visualization Dashboard</h1>
        <button className="refresh-btn" onClick={handleRefreshData}>
          Refresh Data
        </button>
      </header>

      <div className="dashboard-container">
        <StatsCards data={data} />
        
        <div className="chart-section">
          <div className="metric-selector">
            <h3>Select Metric:</h3>
            <select 
              value={selectedMetric} 
              onChange={(e) => handleMetricChange(e.target.value)}
            >
              <option value="sales">Sales</option>
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="conversion">Conversion Rate</option>
            </select>
          </div>
          
          <Chart data={data} metric={selectedMetric} />
        </div>

        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;
export const generateSampleData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map(month => ({
    month,
    sales: Math.floor(Math.random() * 10000) + 5000,
    revenue: Math.floor(Math.random() * 100000) + 50000,
    users: Math.floor(Math.random() * 5000) + 2000,
    conversion: (Math.random() * 10 + 2).toFixed(2)
  }));
};
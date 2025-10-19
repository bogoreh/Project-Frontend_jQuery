import React, { useEffect } from 'react';
import $ from 'jquery';
import ProductTable from './components/ProductTable';
import { products } from './data/products';
import './styles/App.css';

function App() {
  // jQuery initialization for statistics
  useEffect(() => {
    // Calculate statistics using jQuery
    const updateStatistics = () => {
      const totalProducts = $('.product-row').length;
      const inStockProducts = $('.product-row[data-instock="true"]').length;
      const outOfStockProducts = $('.product-row[data-instock="false"]').length;
      
      // Get price statistics using jQuery data attributes and traversing
      const prices = $('.product-row').map(function() {
        return parseFloat($(this).data('price'));
      }).get();
      
      const avgPrice = prices.length > 0 ? 
        prices.reduce((sum, price) => sum + price, 0) / prices.length : 0;
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);

      $('#stats-content').html(`
        <p>Total Products: ${totalProducts}</p>
        <p>In Stock: ${inStockProducts} | Out of Stock: ${outOfStockProducts}</p>
        <p>Average Price: $${avgPrice.toFixed(2)}</p>
        <p>Price Range: $${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}</p>
      `);
    };

    // Initial statistics calculation
    updateStatistics();

    // Update statistics when table changes (using MutationObserver with jQuery)
    const observer = new MutationObserver(updateStatistics);
    const table = document.querySelector('.product-table tbody');
    if (table) {
      observer.observe(table, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sortable & Filterable Product Table</h1>
        <p>Using React with jQuery for DOM manipulation</p>
      </header>
      <main>
        <ProductTable products={products} />
      </main>
    </div>
  );
}

export default App;
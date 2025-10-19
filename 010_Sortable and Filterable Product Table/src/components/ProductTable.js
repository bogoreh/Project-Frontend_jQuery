import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import ProductRow from './ProductRow';
import FilterDropdown from './FilterDropdown';

const ProductTable = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const tableRef = useRef(null);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // jQuery initialization and effects
  useEffect(() => {
    const $table = $(tableRef.current);
    
    // Add hover effects using jQuery
    $table.find('.product-row').hover(
      function() {
        $(this).addClass('row-hover');
      },
      function() {
        $(this).removeClass('row-hover');
      }
    );

    // Highlight out of stock items
    $table.find('.product-row[data-instock="false"]').addClass('out-of-stock-row');

  }, [filteredProducts]);

  // Filter products by category
  const handleFilterChange = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    // Reset sorting when filter changes
    setSortConfig({ key: null, direction: 'asc' });
  };

  // Sort products
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredProducts(sortedProducts);
    setSortConfig({ key, direction });

    // jQuery animation for sort feedback
    $(tableRef.current).find('tbody').hide().fadeIn(300);
  };

  // jQuery-based search functionality
  const handleSearch = (searchTerm) => {
    const $rows = $(tableRef.current).find('.product-row');
    
    if (searchTerm.trim() === '') {
      $rows.show();
    } else {
      $rows.hide();
      $rows.filter(function() {
        const productName = $(this).find('td:first').text().toLowerCase();
        return productName.includes(searchTerm.toLowerCase());
      }).show();
    }
  };

  return (
    <div className="product-table-container">
      <h2>Product Table</h2>
      
      {/* Filter Section */}
      <FilterDropdown categories={categories} onFilterChange={handleFilterChange} />
      
      {/* Search Section */}
      <div className="search-section">
        <label htmlFor="product-search">Search Products: </label>
        <input
          id="product-search"
          type="text"
          placeholder="Search by product name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Product Table */}
      <table ref={tableRef} className="product-table">
        <thead>
          <tr>
            <th 
              onClick={() => handleSort('name')}
              className={`sortable ${sortConfig.key === 'name' ? `sorted-${sortConfig.direction}` : ''}`}
            >
              Product Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Category</th>
            <th 
              onClick={() => handleSort('price')}
              className={`sortable ${sortConfig.key === 'price' ? `sorted-${sortConfig.direction}` : ''}`}
            >
              Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>

      {/* jQuery Statistics */}
      <div className="statistics">
        <h3>Product Statistics (jQuery powered)</h3>
        <div id="stats-content"></div>
      </div>
    </div>
  );
};

export default ProductTable;
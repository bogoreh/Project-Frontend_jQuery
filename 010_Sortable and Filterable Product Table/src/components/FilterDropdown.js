import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const FilterDropdown = ({ categories, onFilterChange }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const $dropdown = $(dropdownRef.current);
    
    // jQuery event handling for filter change
    $dropdown.on('change', function() {
      const selectedCategory = $(this).val();
      onFilterChange(selectedCategory);
      
      // jQuery filtering demonstration
      if (selectedCategory === 'all') {
        $('.product-row').show();
      } else {
        $('.product-row').hide();
        $(`.product-row[data-category="${selectedCategory}"]`).show();
      }
    });

    return () => {
      $dropdown.off('change');
    };
  }, [onFilterChange]);

  return (
    <div className="filter-section">
      <label htmlFor="category-filter">Filter by Category: </label>
      <select id="category-filter" ref={dropdownRef} className="filter-dropdown">
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
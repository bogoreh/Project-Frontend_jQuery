import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import './ProductFilter.css';

const ProductFilter = ({ onFilterChange, products }) => {
  const filterInitialized = useRef(false);

  useEffect(() => {
    if (!filterInitialized.current && products.length > 0) {
      initializeJQueryFilters();
      filterInitialized.current = true;
    }
  }, [products]);

  const initializeJQueryFilters = () => {
    // Category filter
    $('.category-filter').on('change', function() {
      applyFilters();
    });

    // Price range filter
    $('.price-filter').on('input', function() {
      $('#price-value').text('$' + $(this).val());
      applyFilters();
    });

    // Rating filter
    $('.rating-filter').on('change', function() {
      applyFilters();
    });

    // Clear filters
    $('#clear-filters').on('click', function() {
      $('.category-filter').prop('checked', false);
      $('.price-filter').val(1000);
      $('#price-value').text('$1000');
      $('.rating-filter').prop('checked', false);
      applyFilters();
    });
  };

  const applyFilters = () => {
    const selectedCategories = [];
    $('.category-filter:checked').each(function() {
      selectedCategories.push($(this).val());
    });

    const maxPrice = parseInt($('.price-filter').val());
    const minRating = $('.rating-filter:checked').val() || 0;

    // Filter products using jQuery
    $('.product-card').each(function() {
      const $card = $(this);
      const category = $card.data('category');
      const price = parseFloat($card.data('price'));
      const rating = parseFloat($card.data('rating'));

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
      const priceMatch = price <= maxPrice;
      const ratingMatch = rating >= minRating;

      if (categoryMatch && priceMatch && ratingMatch) {
        $card.show();
      } else {
        $card.hide();
      }
    });

    // Update product count
    const visibleCount = $('.product-card:visible').length;
    $('#product-count').text(visibleCount);

    // Notify parent component about filter changes
    if (onFilterChange) {
      const filters = {
        categories: selectedCategories,
        maxPrice: maxPrice,
        minRating: parseFloat(minRating)
      };
      onFilterChange(filters);
    }
  };

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="product-filter">
      <div className="filter-header">
        <h3>Filters</h3>
        <button id="clear-filters" className="clear-btn">Clear All</button>
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        {categories.map(category => (
          <label key={category} className="filter-option">
            <input 
              type="checkbox" 
              className="category-filter" 
              value={category} 
            />
            <span className="checkmark"></span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <input 
          type="range" 
          className="price-filter" 
          min="0" 
          max="1000" 
          step="10" 
          defaultValue="1000" 
        />
        <div className="price-display">
          Up to: <span id="price-value">$1000</span>
        </div>
      </div>

      <div className="filter-section">
        <h4>Minimum Rating</h4>
        {[4, 3, 2, 1].map(rating => (
          <label key={rating} className="filter-option">
            <input 
              type="radio" 
              name="rating" 
              className="rating-filter" 
              value={rating} 
            />
            <span className="checkmark radio"></span>
            {rating}+ Stars and above
          </label>
        ))}
        <label className="filter-option">
          <input 
            type="radio" 
            name="rating" 
            className="rating-filter" 
            value="0" 
            defaultChecked 
          />
          <span className="checkmark radio"></span>
          All Ratings
        </label>
      </div>

      <div className="product-count">
        Showing <span id="product-count">{products.length}</span> products
      </div>
    </div>
  );
};

export default ProductFilter;
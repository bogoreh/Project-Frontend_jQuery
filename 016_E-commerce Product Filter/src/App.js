import React, { useState, useEffect } from 'react';
import ProductFilter from './components/ProductFilter/ProductFilter';
import ProductList from './components/ProductList/ProductList';
import { products } from './data/products';
import './App.css';

function App() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    // Initialize with all products
    setFilteredProducts(products);
  }, []);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    
    // React-based filtering as backup
    const filtered = products.filter(product => {
      const categoryMatch = filters.categories.length === 0 || 
                           filters.categories.includes(product.category);
      const priceMatch = product.price <= filters.maxPrice;
      const ratingMatch = product.rating >= filters.minRating;
      
      return categoryMatch && priceMatch && ratingMatch;
    });
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>E-Commerce Store</h1>
        <p>Find the perfect products with our advanced filters</p>
      </header>
      
      <div className="app-content">
        <ProductFilter 
          onFilterChange={handleFilterChange}
          products={products}
        />
        <main className="main-content">
          <ProductList products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}

export default App;
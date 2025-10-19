import React from 'react';

const ProductRow = ({ product }) => {
  return (
    <tr 
      className="product-row" 
      data-category={product.category}
      data-price={product.price}
      data-instock={product.inStock}
    >
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>${product.price}</td>
      <td>
        <span 
          className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
          data-stock={product.inStock}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </td>
    </tr>
  );
};

export default ProductRow;
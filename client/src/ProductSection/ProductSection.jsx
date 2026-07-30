import React from "react";
import "./ProductSection.css";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/productService";

const ProductSection = () => {
  const products = getProducts();

  return (
    <section className="product-section">
      <div className="product-header">
        <div>
          <h2>Popular Products</h2>
          <p>Fresh products picked just for you</p>
        </div>

        <button className="view-btn">
          View All
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
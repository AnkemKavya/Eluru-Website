import React, { useEffect, useState } from "react";
import "./ProductSection.css";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/productService";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Food",
    "Medicine",
    "Tests",
    "Dairy",
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <section className="product-section">
      {/* Title */}
      <h2 className="product-title">
        Popular Right Now
      </h2>

      {/* Category Chips */}
      <div className="category-chips">
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              activeCategory === cat
                ? "chip active"
                : "chip"
            }
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subtitle */}
      <h4 className="section-subtitle">
        MOST ORDERED
      </h4>

      {/* Products */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
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
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const allProducts = getProducts();

  const categoryProducts =
    categoryName.toLowerCase() === "all"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.category.toLowerCase() ===
            categoryName.toLowerCase()
        );

  const filteredProducts = categoryProducts.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mobile-container">
      <div className="category-page">

        <div className="category-header">

          <h2>
            {categoryName.toLowerCase() === "all"
              ? "All Products"
              : categoryName}
          </h2>

          <p>{filteredProducts.length} Products Available</p>

          <div className="search-box">
            <input
              type="text"
              placeholder={`Search in ${
                categoryName.toLowerCase() === "all"
                  ? "products"
                  : categoryName.toLowerCase()
              }...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try another search.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
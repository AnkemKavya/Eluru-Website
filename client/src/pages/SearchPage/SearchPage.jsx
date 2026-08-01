import React from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("q") || "";

  const products = getProducts();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.category.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="category-page">
      <h2>Search Results</h2>

      <p>{filteredProducts.length} products found</p>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
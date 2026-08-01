import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [foodType, setFoodType] = useState("All");
  const [mealType, setMealType] = useState("All");

  const allProducts = getProducts();

  // Show all products or selected category
  const categoryProducts =
    categoryName.toLowerCase() === "all"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.category.toLowerCase() ===
            categoryName.toLowerCase()
        );

  // Start with category products
  let filteredProducts = categoryProducts;

  // Food Filters
  if (categoryName.toLowerCase() === "food") {

    // Veg / Non-Veg
    if (foodType !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.foodType === foodType
      );
    }

    // Breakfast / Lunch / Dinner etc.
    if (mealType !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.mealType &&
          product.mealType.includes(mealType)
      );
    }
  }

  // Search Filter
  filteredProducts = filteredProducts.filter(
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

          {/* Search */}
          <div className="search-box">
            <input 
              type="text"
              placeholder={`Search ${
                categoryName.toLowerCase() === "all"
                  ? "products"
                  : categoryName.toLowerCase()
              } items...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Food Filters */}
          {categoryName.toLowerCase() === "food" && (
            <>
              {/* Veg / Non-Veg */}

              <div className="food-type-chips">

                <button
                  className={foodType === "All" ? "active" : ""}
                  onClick={() => setFoodType("All")}
                >
                  All
                </button>

                <button
                  className={foodType === "Veg" ? "active" : ""}
                  onClick={() => setFoodType("Veg")}
                >
                  🥬 Veg
                </button>

                <button
                  className={foodType === "Non-Veg" ? "active" : ""}
                  onClick={() => setFoodType("Non-Veg")}
                >
                  🍗 Non-Veg
                </button>

              </div>

              {/* Meal Types */}

              <div className="meal-type-chips">

                {[
                  "All",
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Snacks",
                  "Juices",
                  "Ice Cream",
                ].map((meal) => (
                  <button
                    key={meal}
                    className={mealType === meal ? "active" : ""}
                    onClick={() => setMealType(meal)}
                  >
                    {meal}
                  </button>
                ))}

              </div>
            </>
          )}

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
import React, { useEffect, useState } from "react";
import "./CategorySection.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryService";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  // Open selected category
  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name}`);
  };

  // Open all products
  const handleViewAll = () => {
    navigate("/category/All");
  };

  return (
    <section className="category-section">
      <div className="section-header">
        <div>
          <h2>Shop by Category</h2>
          <p>Choose your favourite category</p>
        </div>

        <button
          className="view-all-btn"
          onClick={handleViewAll}
        >
          View All
        </button>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />

            <div className="category-content">
              <h3>{category.name}</h3>

              <p>{category.subtitle}</p>

              <button
                className="category-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category);
                }}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
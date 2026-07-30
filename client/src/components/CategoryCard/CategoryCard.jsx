import React from "react";
import "./CategoryCard.css";
import { HiOutlineArrowRight } from "react-icons/hi";

const CategoryCard = ({ image, name, subtitle }) => {
  return (
    <div className="category-card">

      <div className="category-image">
        <img src={image} alt={name} />
      </div>

      <div className="category-content">
        <h3>{name}</h3>
        <p>{subtitle}</p>

        <button className="category-btn">
          <HiOutlineArrowRight />
    
        </button>
      </div>

    </div>
  );
};

export default CategoryCard;
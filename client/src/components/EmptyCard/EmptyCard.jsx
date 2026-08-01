import React from "react";
import "./EmptyCard.css";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineShoppingCart,
  HiOutlineShoppingBag,
  HiOutlineSearch,
} from "react-icons/hi";

const icons = {
  cart: <HiOutlineShoppingCart />,
  orders: <HiOutlineShoppingBag />,
  search: <HiOutlineSearch />,
};

const EmptyCard = ({
  type = "cart",
  title,
  subtitle,
  buttonText = "Go Home",
  buttonLink = "/",
}) => {
  const navigate = useNavigate();

  return (
    <div className="empty-card">

      <div className="empty-icon">
        {icons[type]}
      </div>

      <h2>{title}</h2>

      <p>{subtitle}</p>

      <button onClick={() => navigate(buttonLink)}>
        {buttonText}
      </button>

    </div>
  );
};

export default EmptyCard;
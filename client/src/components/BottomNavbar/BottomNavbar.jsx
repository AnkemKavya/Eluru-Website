import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi";

import "./BottomNavbar.css";

const BottomNavbar = () => {
  const [count, setCount] = useState(0);

  const updateCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCount(total);
  };

  useEffect(() => {
    // Load cart count initially
    updateCartCount();

    // Update when another browser tab changes localStorage
    window.addEventListener("storage", updateCartCount);

    // Update instantly when the current tab changes the cart
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener(
        "storage",
        updateCartCount
      );

      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };
  }, []);

  return (
    <div className="bottom-navbar">

      <NavLink to="/">
        <HiOutlineHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/orders">
        <HiOutlineShoppingBag />
        <span>Orders</span>
      </NavLink>

      <NavLink to="/cart" className="cart-link">
        <div className="cart-icon">
          <HiOutlineShoppingCart />

          {count > 0 && (
            <span className="cart-badge">
              {count}
            </span>
          )}
        </div>

        <span>Cart</span>
      </NavLink>

      <NavLink to="/profile">
        <HiOutlineUser />
        <span>Profile</span>
      </NavLink>

    </div>
  );
};

export default BottomNavbar;
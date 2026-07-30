// src/components/Navbar/Navbar.jsx

import React from "react";
import "./Navbar.css";

import {
  HiOutlineMenu,
  HiOutlineBell,
  HiOutlineLocationMarker,
  HiOutlineChevronDown,
  HiOutlineSearch,
} from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="navbar-container">

      {/* Top Header */}

      <header className="navbar-header">

        <button className="menu-btn">
          <HiOutlineMenu />
        </button>

        <div className="navbar-logo">
          <h1>
            <span className="leaf">🌿</span> healthy Eluru
          </h1>
          <p>Local Delivery, Healthy Living</p>
        </div>

        <div className="navbar-actions">

          <button className="notification-btn">
            <HiOutlineBell />
            <span className="notification-dot"></span>
          </button>

          <div className="profile-avatar">
            G
          </div>

        </div>

      </header>

      {/* Delivery Address */}

      <div className="delivery-card">

        <div className="delivery-left">

          <HiOutlineLocationMarker className="location-icon" />

          <span>
            Deliver to :
            <strong> Dwaraka Nagar, Eluru</strong>
          </span>

        </div>

        <HiOutlineChevronDown className="down-icon" />

      </div>

      {/* Search */}

      <div className="search-box">

        <HiOutlineSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search vegetables, food, medicine..."
        />

      </div>

    </div>
  );
};

export default Navbar;
import React, { useEffect, useState } from "react";
import "./Navbar.css";

import {
  HiOutlineMenu,
  HiOutlineBell,
  HiOutlineLocationMarker,
  HiOutlineChevronDown,
} from "react-icons/hi";

const Navbar = () => {

  const [location, setLocation] = useState("Fetching location...");

  /* Current Location */

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const place =
            data.address.suburb ||
            data.address.neighbourhood ||
            data.address.village ||
            "";

          const city =
            data.address.city ||
            data.address.town ||
            data.address.county ||
            "";

          setLocation(`${place}, ${city}`);
        } catch {
          setLocation("Location unavailable");
        }
      },
      () => {
        setLocation("Location unavailable");
      }
    );
  }, []);


  return (
    <div className="navbar-container">
      <div className="navbar-fixed">

        {/* HEADER */}

        <header className="navbar-header">

          {/* LEFT */}

          <div className="header-left">
            <button className="menu-btn">
              <HiOutlineMenu />
            </button>
          </div>

          {/* CENTER */}

          <div className="navbar-logo">
            <h1>
              <span className="leaf">🌿</span>
              healthy Eluru
            </h1>

            <p>Local Delivery, Healthy Living</p>
          </div>

          {/* RIGHT */}

          <div className="header-right">

            <button className="notification-btn">
              <HiOutlineBell />
              <span className="notification-dot"></span>
            </button>

            <div className="profile-avatar">
              G
            </div>

          </div>

        </header>

        {/* DELIVERY */}

        <div className="delivery-card">

          <div className="delivery-left">

            <HiOutlineLocationMarker className="location-icon" />

            <span>
              Deliver to :
              <strong> {location}</strong>
            </span>

          </div>

          <HiOutlineChevronDown className="down-icon" />

        </div>

      </div>
    </div> 
  );
};

export default Navbar;
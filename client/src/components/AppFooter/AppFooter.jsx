import React from "react";
import "./AppFooter.css";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">

        {/* Company */}

        <div className="footer-column">
          <h2 className="footer-logo">🌿 Healthy Eluru</h2>

          <p>
            Fresh groceries, vegetables, fruits, food, medicines and lab tests
            delivered to your doorstep across Eluru.
          </p>
        </div>

        {/* Quick Links */}

        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>

        {/* Contact */}

        <div className="footer-column">
          <h3>Contact</h3>

          <p><FaMapMarkerAlt /> Eluru, Andhra Pradesh</p>
          <p><FaPhoneAlt /> +91 9876543210</p>
          <p><FaEnvelope /> support@healthyeluru.com</p>
        </div>

        {/* Social */}

        <div className="footer-column">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Healthy Eluru. All Rights Reserved.
      </div>
    </footer>
  );
};

export default AppFooter;
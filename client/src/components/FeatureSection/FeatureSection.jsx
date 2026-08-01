import React from "react";
import "./FeatureSection.css";

import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineSupport,
} from "react-icons/hi";

const FeatureSection = () => {
  return (
    <div className="feature-section">

      <div className="feature-card">
        <div className="feature-icon">
          <HiOutlineTruck />
        </div>

        <div>
          <h4>Fast Delivery</h4>
          <p>On time</p>
        </div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <HiOutlineShieldCheck />
        </div>

        <div>
          <h4>Best Quality</h4>
          <p>Always</p>
        </div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <HiOutlineSupport />
        </div>

        <div>
          <h4>24/7 Support</h4>
          <p>We care</p>
        </div>
      </div>

    </div>
  );
};

export default FeatureSection;
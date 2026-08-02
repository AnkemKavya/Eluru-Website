import React from "react";
import "./AddressForm.css";

import {
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineHome,
} from "react-icons/hi";

const AddressForm = ({ address, onChange }) => {
  return (
    <div className="address-card">

      <div className="address-title">

        <HiOutlineLocationMarker className="address-icon" />

        <h3>Delivery Address</h3>

      </div>

      {/* Full Name */}

      <div className="input-group">

        <HiOutlineUser className="input-icon" />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={onChange}
        />

      </div>

      {/* Phone */}

      <div className="input-group">

        <HiOutlinePhone className="input-icon" />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={onChange}
        />

      </div>

      {/* Address */}

      <div className="input-group">

        <HiOutlineHome className="input-icon" />

        <input
          type="text"
          name="address"
          placeholder="House No., Street, Area"
          value={address.address}
          onChange={onChange}
        />

      </div>

      {/* Landmark */}

      <div className="input-group">

        <input
          type="text"
          name="landmark"
          placeholder="Landmark (optional)"
          value={address.landmark}
          onChange={onChange}
        />

      </div>

      {/* City & Pincode */}

      <div className="address-row">

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={onChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={onChange}
        />

      </div>

    </div>
  );
};

export default AddressForm;
import React from "react";
import "./DeliveryAddress.css";

import {
  HiOutlineLocationMarker,
  HiOutlineUser,
} from "react-icons/hi";

export default function DeliveryAddress({ address }) {

  if (!address) return null;

  return (
    <div className="order-card">

      <h3>Delivery Address</h3>

      <div className="delivery-info">

        {/* Customer */}

        <div className="delivery-row">

          <div className="delivery-icon">
            <HiOutlineUser />
          </div>

          <div className="delivery-text">

            <h4 className="delivery-name">
              {address.fullName}
            </h4>

            <p className="delivery-phone">
              {address.phone}
            </p>

          </div>

        </div>

        {/* Address */}

        <div className="delivery-row">

          <div className="delivery-icon">
            <HiOutlineLocationMarker />
          </div>

          <div className="delivery-text">

            <h4>Delivery Address</h4>

            <p className="delivery-address">
              {address.address}
            </p>

            {address.landmark && (
              <p>{address.landmark}</p>
            )}

            <p className="delivery-city">
              {address.city} - {address.pincode}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
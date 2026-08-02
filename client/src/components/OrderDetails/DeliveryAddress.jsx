import React from "react";
import "./DeliveryAddress.css";

import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";

export default function DeliveryAddress({ address }) {

  if (!address) return null;

  return (
    <div className="order-card">

      <h3>Delivery Address</h3>

      <div className="delivery-info">

        <div className="delivery-row">

          <HiOutlineUser className="delivery-icon" />

          <div>

            <h4>{address.fullName}</h4>

            <p>{address.phone}</p>

          </div>

        </div>

        <div className="delivery-row">

          <HiOutlineLocationMarker className="delivery-icon" />

          <div>

            <p>{address.address}</p>

            {address.landmark && (
              <p>{address.landmark}</p>
            )}

            <p>
              {address.city} - {address.pincode}
            </p>

          </div>

        </div>

        <div className="delivery-row">

          <HiOutlinePhone className="delivery-icon" />

          <p>{address.phone}</p>

        </div>

      </div>

    </div>
  );
}
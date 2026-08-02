import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import AddressForm from "../../components/Checkout/AddressForm";
import CheckoutButton from "../../components/Checkout/CheckoutButton";

import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  const [savedAddress, setSavedAddress] = useState(null);
  const [error, setError] = useState("");

  // Load previously used address (don't auto-fill)
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("deliveryAddress")
    );

    if (data) {
      setSavedAddress(data);
    }
  }, []);

  // Get user's current city & pincode
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          setAddress((prev) => ({
            ...prev,
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            pincode:
              data.address.postcode || "",
          }));
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        console.log("Location permission denied");
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleContinue = () => {
    if (
      !address.fullName.trim() ||
      !address.phone.trim() ||
      !address.address.trim()
    ) {
      setError("Please fill address details");
      return;
    }

    setError("");

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(address)
    );

    navigate("/payment");
  };

  return (
    <div className="checkout-page">

      <header className="checkout-header">
        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
        </button>

        <div className="checkout-title">
          <h2>Checkout</h2>
          <p>Step 1 of 2</p>
        </div>
      </header>

      <div className="checkout-content">

        {error && (
          <div className="checkout-error">
            <span>❗</span>
            <p>{error}</p>
          </div>
        )}

        <AddressForm
          address={address}
          onChange={handleChange}
        />

        {savedAddress && (
          <div className="saved-address-card">

            <h3>Recently Used Address</h3>

            <p><strong>{savedAddress.fullName}</strong></p>

            <p>{savedAddress.address}</p>

            {savedAddress.landmark && (
              <p>{savedAddress.landmark}</p>
            )}

            <p>
              {savedAddress.city} - {savedAddress.pincode}
            </p>

            <button
              onClick={() => {
                setAddress(savedAddress);
                setError("");
              }}
            >
              Use this Address
            </button>

          </div>
        )}

      </div>

      <CheckoutButton
        text="Continue to Payment"
        onClick={handleContinue}
      />

    </div>
  );
}
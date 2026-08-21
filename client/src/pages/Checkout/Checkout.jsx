import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import AddressForm from "../../components/Checkout/AddressForm";
import CheckoutButton from "../../components/Checkout/CheckoutButton";
import SavedAddresses from "../../components/Checkout/SavedAddresses";
import LocationPicker from "../../components/Checkout/LocationPicker";

import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [address, setAddress] = useState({
    type: "Home",
    fullName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState("");

  /* ==========================
     Load Saved Addresses
  ========================== */

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("addresses")) || [];

    setAddresses(saved);

    if (saved.length === 0) {
      setShowForm(true);
    } else {
      setSelectedAddress(saved[0]);
      setShowForm(false);
    }
  }, []);

  /* ==========================
     Handle Input Changes
  ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  /* ==========================
     Save / Update Address
  ========================== */

  const handleContinue = () => {
    if (
      !address.fullName.trim() ||
      !address.phone.trim() ||
      !address.address.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    let list =
      JSON.parse(localStorage.getItem("addresses")) || [];

    let savedAddress;

    /* Update existing address */

    if (address.id) {
      list = list.map((item) =>
        item.id === address.id
          ? address
          : item
      );

      savedAddress = address;
    }

    /* Add new address */

    else {
      savedAddress = {
        ...address,
        id: Date.now(),
      };

      list.push(savedAddress);
    }

    localStorage.setItem(
      "addresses",
      JSON.stringify(list)
    );

    localStorage.setItem(
      "selectedAddress",
      JSON.stringify(savedAddress)
    );

    setAddresses(list);
    setSelectedAddress(savedAddress);
    setShowForm(false);
    setError("");

    navigate("/payment");
  };

  /* ==========================
     New Address
  ========================== */

  const handleAddNew = () => {
    setAddress({
      type: "Home",
      fullName: "",
      phone: "",
      address: "",
      landmark: "",
      city: "",
      pincode: "",
      latitude: "",
      longitude: "",
    });

    setError("");
    setShowForm(true);
  };

  /* ==========================
     Location Selected
  ========================== */

  const handleLocationSelected = (location) => {
    setAddress((prev) => ({
      ...prev,

      address: location.address || "",
      city: location.city || "",
      pincode: location.pincode || "",
      landmark: location.landmark || "",

      latitude: location.latitude || "",
      longitude: location.longitude || "",
    }));

    setShowLocationPicker(false);
    setError("");
  };

  return (
    <div className="checkout-page">

      {/* ==========================
          Header
      ========================== */}

      <header className="checkout-header">

        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
        </button>

        <div className="checkout-title">
          <h2>Checkout</h2>
          <p>Step 1 of 2</p>
        </div>

      </header>


      {/* ==========================
          Content
      ========================== */}

      <div className="checkout-content">

        {/* Error */}

        {error && (
          <div className="checkout-error">
            <span>❗</span>
            <p>{error}</p>
          </div>
        )}


        {/* ==========================
            SAVED ADDRESSES
        ========================== */}

        {!showForm && (
          <>
            <SavedAddresses
              addresses={addresses}
              selectedAddress={selectedAddress}

              onSelect={setSelectedAddress}

              setAddresses={setAddresses}

              setAddress={setAddress}

              setShowForm={setShowForm}

              onAddNew={handleAddNew}
            />

            {/* Use Selected Address */}

            {addresses.length > 0 && (
              <CheckoutButton
                text="Use Address"
                onClick={() => {

                  if (!selectedAddress) {
                    setError(
                      "Please select an address."
                    );
                    return;
                  }

                  localStorage.setItem(
                    "selectedAddress",
                    JSON.stringify(selectedAddress)
                  );

                  navigate("/payment");
                }}
              />
            )}
          </>
        )}


        {/* ==========================
            ADD / EDIT ADDRESS FORM
        ========================== */}

        {showForm && (
          <>

            {/* Location Buttons */}

            <div className="checkout-location-buttons">

              <button
                type="button"
                className="location-btn current-location-btn"
                onClick={() =>
                  setShowLocationPicker(true)
                }
              >
                📍 Use Current Location
              </button>


              <button
                type="button"
                className="location-btn select-location-btn"
                onClick={() =>
                  setShowLocationPicker(true)
                }
              >
                🗺️ Select Location
              </button>

            </div>


            {/* Address Form */}

            <AddressForm
              address={address}
              onChange={handleChange}
            />


            {/* Save / Update Button */}

            <CheckoutButton
              text={
                address.id
                  ? "Update Address"
                  : "Save Address"
              }
              onClick={handleContinue}
            />

          </>
        )}

      </div>


      {/* ==========================
          LOCATION PICKER
      ========================== */}

      {showLocationPicker && (
        <LocationPicker
          onClose={() =>
            setShowLocationPicker(false)
          }

          onLocationSelected={
            handleLocationSelected
          }
        />
      )}

    </div>
  );
}
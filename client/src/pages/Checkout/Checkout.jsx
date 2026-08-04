import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import AddressForm from "../../components/Checkout/AddressForm";
import CheckoutButton from "../../components/Checkout/CheckoutButton";
import SavedAddresses from "../../components/Checkout/SavedAddresses";

import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [address, setAddress] = useState({
    type: "Home",
    fullName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  /* Load Saved Addresses */

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

  /* Get Current Location */

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
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
      () => console.log("Location permission denied")
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
      setError("Please fill all required fields.");
      return;
    }

    let list =
      JSON.parse(localStorage.getItem("addresses")) || [];

    let savedAddress;

    if (address.id) {
      list = list.map((item) =>
        item.id === address.id ? address : item
      );

      savedAddress = address;
    } else {
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

        {/* Saved Addresses */}

        {!showForm && (
          <>
            <SavedAddresses
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={setSelectedAddress}
              setAddresses={setAddresses}
              setAddress={setAddress}
              setShowForm={setShowForm}
              onAddNew={() => {
                setAddress({
                  type: "Home",
                  fullName: "",
                  phone: "",
                  address: "",
                  landmark: "",
                  city: "",
                  pincode: "",
                });

                setShowForm(true);
              }}
            />

            {addresses.length > 0 && (
              <CheckoutButton
                text="Use Address"
                onClick={() => {
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

        {/* Address Form */}

        {showForm && (
          <>
            <AddressForm
              address={address}
              onChange={handleChange}
            />

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

    </div>
  );
}
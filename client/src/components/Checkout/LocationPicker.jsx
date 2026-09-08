import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

// Fix Leaflet marker icon issue in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// Detect map click
function LocationMarker({ position, setPosition }) {

  useMapEvents({

    click(e) {

      setPosition([
        e.latlng.lat,
        e.latlng.lng,
      ]);

    },

  });

  return position ? (
    <Marker position={position} />
  ) : null;
}


export default function LocationPicker({
  onClose,
  onLocationSelected,
}) {

  const [position, setPosition] = useState(null);

  const [loading, setLoading] = useState(false);

  const [locationName, setLocationName] =
    useState("Select your location");


  // Get user's current location
  useEffect(() => {

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (location) => {

        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        setPosition([lat, lng]);

        getAddress(lat, lng);

      },

      () => {

        // Default location: Eluru
        const defaultLocation = [
          16.7107,
          81.0952,
        ];

        setPosition(defaultLocation);

        getAddress(
          defaultLocation[0],
          defaultLocation[1]
        );

      }

    );

  }, []);


  // Reverse geocoding
  const getAddress = async (lat, lng) => {

    try {

      setLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );

      const data = await response.json();

      setLocationName(
        data.display_name ||
        "Selected location"
      );

    } catch (error) {

      console.log(
        "Unable to get address",
        error
      );

      setLocationName(
        "Location selected"
      );

    } finally {

      setLoading(false);

    }

  };


  // When user clicks the map
  const handleMapClick = (lat, lng) => {

    setPosition([lat, lng]);

    getAddress(lat, lng);

  };


  // Confirm location
  const handleConfirm = async () => {

    if (!position) {
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}&addressdetails=1`
      );

      const data = await response.json();

      const addressData = data.address || {};

      const houseNumber =
        addressData.house_number || "";

      const road =
        addressData.road ||
        addressData.neighbourhood ||
        "";

      const area =
        addressData.suburb ||
        addressData.neighbourhood ||
        addressData.village ||
        "";

      const city =
        addressData.city ||
        addressData.town ||
        addressData.village ||
        "";

      const pincode =
        addressData.postcode || "";

      const landmark =
        addressData.neighbourhood ||
        addressData.suburb ||
        "";

      const formattedAddress = [
        houseNumber,
        road,
        area,
      ]
        .filter(Boolean)
        .join(", ");


      onLocationSelected({

        address:
          formattedAddress ||
          data.display_name ||
          "",

        city: city,

        pincode: pincode,

        landmark: landmark,

        latitude: position[0],

        longitude: position[1],

      });

      onClose();

    } catch (error) {

      console.log(
        "Address lookup failed",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  if (!position) {

    return (

      <div className="location-overlay">

        <div className="location-picker">

          <div className="location-loading">
            Getting your location...
          </div>

        </div>

      </div>

    );

  }


  return (

    <div className="location-overlay">

      <div className="location-picker">


        {/* Header */}

        <div className="location-picker-header">

          <div>

            <h2>
              Select Location
            </h2>

            <p>
              Move the map and select your delivery location
            </p>

          </div>


          <button
            className="location-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>


        {/* Map */}

        <div className="location-map">

          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={true}
            style={{
              width: "100%",
              height: "100%",
            }}
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <LocationMarker
              position={position}
              setPosition={(newPosition) => {

                setPosition(newPosition);

                handleMapClick(
                  newPosition[0],
                  newPosition[1]
                );

              }}
            />

          </MapContainer>


          {/* Center marker */}

          <div className="map-center-marker">
            📍
          </div>

        </div>


        {/* Address preview */}

        <div className="selected-location-card">

          <div className="location-pin">
            📍
          </div>

          <div className="location-text">

            <h3>
              Delivery Location
            </h3>

            <p>
              {loading
                ? "Getting address..."
                : locationName}
            </p>

          </div>

        </div>


        {/* Buttons */}

        <div className="location-buttons">

          <button
            className="location-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-location-btn"
            onClick={handleConfirm}
            disabled={loading}
          >

            {loading
              ? "Getting Address..."
              : "Confirm Location"}

          </button>

        </div>


      </div>

    </div>

  );

}
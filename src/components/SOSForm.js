import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 22.5726,
  lng: 88.3639,
};

export default function SOSForm() {
  const [type, setType] = useState("medical");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const navigate = useNavigate();

  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(coords);
          if (mapRef) {
            mapRef.panTo(coords);
          }
        },
        (err) => {
          console.error("Location error:", err);
          alert("Failed to get your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !location) {
      alert("Please fill in all required fields and select location.");
      return;
    }

    try {
      await addDoc(collection(db, "sos_alerts"), {
        userId: auth.currentUser?.uid || "anonymous",
        type,
        description,
        location,
        timestamp: new Date().toISOString(),
        status: "active",
      });

      alert("🚨 SOS alert sent successfully!");
      navigate("/sos/map");
    } catch (err) {
      console.error("Failed to submit SOS:", err);
      alert("Error sending SOS. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>🚨 Send SOS Alert</h2>
      <form onSubmit={handleSubmit}>
        <label>Alert Type*</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="medical">Medical</option>
          <option value="food">Food</option>
          <option value="shelter">Shelter</option>
          <option value="water">Water</option>
          <option value="other">Other</option>
        </select>

        <br /><br />

        <label>Description*</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your emergency..."
          required
        />

        <br /><br />

        <label>Click on the map to choose your SOS location*</label>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location || defaultCenter}
            zoom={14}
            onClick={handleMapClick}
            onLoad={(map) => setMapRef(map)}
          >
            {location && <Marker position={location} />}
          </GoogleMap>
        </LoadScript>

        <br />
        <button
          type="button"
          onClick={handleUseMyLocation}
          style={{
            backgroundColor: "#444",
            color: "white",
            border: "none",
            padding: "0.6rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          📍 Use My Current Location
        </button>

        <br />

        <label>Selected Location:</label>
        <input
          type="text"
          value={location ? `Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}` : "Not selected"}
          disabled
        />

        <br /><br />
        <button
          type="submit"
          style={{ padding: "0.6rem 1.5rem", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Submit SOS
        </button>
      </form>
    </div>
  );
}

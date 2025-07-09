import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export default function SOSMap() {
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(null);

  // Default to Kolkata
  const [mapCenter, setMapCenter] = useState({
    lat: 22.5726,
    lng: 88.3639,
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sos_alerts"), (snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          const d = doc.data();
          if (
            d.location &&
            typeof d.location.lat === "number" &&
            typeof d.location.lng === "number"
          ) {
            return { id: doc.id, ...d };
          } else {
            console.warn("❌ Invalid location data for doc:", doc.id);
            return null;
          }
        })
        .filter((d) => d !== null);
      setAlerts(data);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
        🆘 Live SOS Alerts Map
      </h2>

      {/* Input for custom center */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label>
          Lat:{" "}
          <input
            type="number"
            step="0.0001"
            value={mapCenter.lat}
            onChange={(e) =>
              setMapCenter((prev) => ({
                ...prev,
                lat: parseFloat(e.target.value),
              }))
            }
          />
        </label>
        &nbsp;&nbsp;
        <label>
          Lng:{" "}
          <input
            type="number"
            step="0.0001"
            value={mapCenter.lng}
            onChange={(e) =>
              setMapCenter((prev) => ({
                ...prev,
                lng: parseFloat(e.target.value),
              }))
            }
          />
        </label>
      </div>

      {alerts.length === 0 && (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          ⏳ Loading alerts or no SOS alerts available yet...
        </p>
      )}

      <LoadScript googleMapsApiKey="AIzaSyDvgFqTIBs-IrI28FMW4bNz-QI11jj0fJg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
        >
          {alerts.map((alert) => (
            <Marker
              key={alert.id}
              position={alert.location}
              onClick={() => setSelected(alert)}
              icon={{
                url:
                  alert.type === "medical"
                    ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    : alert.type === "food"
                    ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                    : alert.type === "shelter"
                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          ))}

          {/* Optional: Your own marker for visual reference */}
          <Marker position={mapCenter} title="You are here" />

          {selected && (
            <InfoWindow
              position={selected.location}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h4>🚨 {selected.type?.toUpperCase()}</h4>
                <p>{selected.description}</p>
                <p>
                  <b>Status:</b> {selected.status}
                </p>
                <p>
                  <small>
                    📅{" "}
                    {selected.timestamp?.toDate
                      ? selected.timestamp.toDate().toLocaleString()
                      : new Date(selected.timestamp).toLocaleString()}
                  </small>
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const SOSComponent = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sosLoading, setSosLoading] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(null);
  const [sosType, setSosType] = useState("medical");
  const [sosDescription, setSosDescription] = useState("");

  // Promise-based geolocation function
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 300000,
        });
      } else {
        reject(new Error('Geolocation not supported by this browser'));
      }
    });
  };

  // OpenStreetMap Reverse Geocoding API
  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error('Error fetching address');
      }
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  };

  const handleSendSOS = async () => {
    if (!location) {
      setError("Please get your location first before sending SOS");
      return;
    }

    if (!sosDescription.trim()) {
      setError("Please provide a description for your SOS alert");
      return;
    }

    setSosLoading(true);
    setError(null);
    setSosSuccess(null);

    try {
      const sosData = {
        type: sosType,
        description: sosDescription.trim(),
        location: {
          lat: location.latitude,
          lng: location.longitude
        },
        locationName: locationName || `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`,
        accuracy: location.accuracy,
        status: "active",
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, "sos_alerts"), sosData);
      setSosSuccess(`SOS Alert sent successfully! Alert ID: ${docRef.id}`);
      setSosDescription("");
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSosSuccess(null), 5000);
      
    } catch (err) {
      console.error("Error sending SOS:", err);
      setError(`Failed to send SOS alert: ${err.message}`);
    } finally {
      setSosLoading(false);
    }
  };

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);
    setLocation(null);
    setLocationName(null);

    try {
      const position = await getLocation();
      const { latitude, longitude, accuracy } = position.coords;

      const locationData = {
        latitude,
        longitude,
        accuracy,
        timestamp: new Date(position.timestamp).toLocaleString(),
      };
      setLocation(locationData);

      const address = await getAddress(latitude, longitude);
      setLocationName(address);
    } catch (err) {
      if (err.code) {
        switch (err.code) {
          case 1:
            setError('Location access denied by user. Please enable location permissions.');
            break;
          case 2:
            setError('Location information is unavailable.');
            break;
          case 3:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown geolocation error occurred.');
        }
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        color: '#374151'
      }}>
        🆘 Emergency SOS System
      </h2>

      {/* Location Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#4b5563'
        }}>
          Step 1: Get Your Location
        </h3>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <button
            onClick={handleGetLocation}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#93c5fd' : '#3b82f6',
              color: 'white',
              fontWeight: '600',
              padding: '8px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#3b82f6';
            }}
          >
            {loading ? 'Getting Location...' : 'Get My Location'}
          </button>
        </div>
      </div>

      {/* SOS Alert Section */}
      {location && (
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#991b1b'
          }}>
            Step 2: Send SOS Alert
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Emergency Type:
            </label>
            <select
              value={sosType}
              onChange={(e) => setSosType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="medical">🏥 Medical Emergency</option>
              <option value="fire">🔥 Fire Emergency</option>
              <option value="police">🚔 Police Emergency</option>
              <option value="food">🍽️ Food/Water Need</option>
              <option value="shelter">🏠 Shelter Need</option>
              <option value="other">⚠️ Other Emergency</option>
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Description:
            </label>
            <textarea
              value={sosDescription}
              onChange={(e) => setSosDescription(e.target.value)}
              placeholder="Describe your emergency situation..."
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              rows="3"
            />
          </div>

          <button
            onClick={handleSendSOS}
            disabled={sosLoading || !location || !sosDescription.trim()}
            style={{
              width: '100%',
              backgroundColor: sosLoading || !location || !sosDescription.trim() ? '#fca5a5' : '#dc2626',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '18px',
              cursor: sosLoading || !location || !sosDescription.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!sosLoading && location && sosDescription.trim()) {
                e.target.style.backgroundColor = '#b91c1c';
              }
            }}
            onMouseOut={(e) => {
              if (!sosLoading && location && sosDescription.trim()) {
                e.target.style.backgroundColor = '#dc2626';
              }
            }}
          >
            {sosLoading ? 'Sending SOS...' : '🆘 SEND SOS ALERT'}
          </button>
        </div>
      )}

      {/* Success Message */}
      {sosSuccess && (
        <div style={{
          backgroundColor: '#dcfce7',
          border: '1px solid #4ade80',
          color: '#166534',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>✅ {sosSuccess}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #f87171',
          color: '#991b1b',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '14px', margin: '0' }}>{error}</p>
        </div>
      )}

      {/* Location Display */}
      {location && (
        <div style={{
          backgroundColor: '#dcfce7',
          border: '1px solid #4ade80',
          color: '#166534',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontWeight: '600', marginBottom: '8px', margin: '0 0 8px 0' }}>
            Your Current Location:
          </h3>

          {locationName && (
            <div style={{
              marginBottom: '12px',
              padding: '8px',
              backgroundColor: '#f0fdf4',
              borderRadius: '6px'
            }}>
              <p style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#15803d',
                margin: '0'
              }}>
                📍 {locationName}
              </p>
            </div>
          )}

          <div style={{ fontSize: '14px' }}>
            <p style={{ margin: '4px 0' }}>
              <strong>Latitude:</strong> {location.latitude.toFixed(6)}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Longitude:</strong> {location.longitude.toFixed(6)}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Accuracy:</strong> ±{Math.round(location.accuracy)} meters
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Retrieved at:</strong> {location.timestamp}
            </p>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '16px',
        fontSize: '12px',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0' }}>
          🚨 Only use this for real emergencies. Your location will be shared with emergency responders.
        </p>
      </div>
    </div>
  );
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

      {/* Simple alert display without Google Maps */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
        {alerts.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            ⏳ Loading alerts or no SOS alerts available yet...
          </p>
        )}

        {alerts.length > 0 && (
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Active SOS Alerts:</h3>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: 
                    alert.type === "medical" ? "#ffebee" :
                    alert.type === "food" ? "#fff3e0" :
                    alert.type === "shelter" ? "#e8f5e8" : "#e3f2fd"
                }}
              >
                <h4 style={{ 
                  margin: "0 0 0.5rem 0",
                  color: 
                    alert.type === "medical" ? "#c62828" :
                    alert.type === "food" ? "#ef6c00" :
                    alert.type === "shelter" ? "#2e7d32" : "#1565c0"
                }}>
                  🚨 {alert.type?.toUpperCase()}
                </h4>
                <p style={{ margin: "0.5rem 0" }}>{alert.description}</p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Status:</strong> {alert.status}
                </p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Location:</strong> {alert.location.lat.toFixed(6)}, {alert.location.lng.toFixed(6)}
                </p>
                <p style={{ margin: "0.5rem 0", fontSize: "0.9rem", color: "#666" }}>
                  📅 {alert.timestamp?.toDate
                    ? alert.timestamp.toDate().toLocaleString()
                    : new Date(alert.timestamp).toLocaleString()}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#4285f4",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontSize: "0.9rem"
                  }}
                >
                  📍 View on Maps
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <SOSComponent />
    </div>
  );
}
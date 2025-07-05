import React, { useEffect, useState } from "react";

export default function WeatherAlert() {
  const [alert, setAlert] = useState(null);
  const [translatedHi, setTranslatedHi] = useState("");
  const [translatedBn, setTranslatedBn] = useState("");
  const [noAlertTranslatedHi, setNoAlertTranslatedHi] = useState("");
  const [noAlertTranslatedBn, setNoAlertTranslatedBn] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Translate given text into a language
  const translateText = async (text, targetLang) => {
    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_TRANSLATE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
            format: "text",
          }),
        }
      );
      const data = await res.json();
      return data?.data?.translations[0]?.translatedText || "";
    } catch (err) {
      console.error(`Translation error [${targetLang}]`, err);
      return "";
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.alerts && data.alerts.length > 0) {
            const firstAlert = data.alerts[0];
            setAlert(firstAlert);

            // Translate to both Hindi and Bengali
            const hi = await translateText(firstAlert.description, "hi");
            const bn = await translateText(firstAlert.description, "bn");
            setTranslatedHi(hi);
            setTranslatedBn(bn);
          } else {
            setAlert(null);
            const fallback = "No weather alerts in your area right now. ✅";

            const hi = await translateText(fallback, "hi");
            const bn = await translateText(fallback, "bn");
            setNoAlertTranslatedHi(hi);
            setNoAlertTranslatedBn(bn);
          }

          setLoading(false);
        } catch (err) {
          console.error("Weather fetch error:", err);
          setError("Could not fetch weather alert");
          setLoading(false);
        }
      },
      (err) => {
        setError("Geolocation not allowed");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading weather alert...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // ⚠️ No Alerts Found
  if (!alert) {
    return (
      <div
        style={{
          backgroundColor: "#e6ffe7",
          padding: "1rem",
          border: "1px solid green",
          borderRadius: "8px",
          margin: "1rem 2rem",
        }}
      >
        <strong>✅ No weather alerts in your area right now.</strong>
        {noAlertTranslatedHi && (
          <p>
            <em>🔁 Hindi: {noAlertTranslatedHi}</em>
          </p>
        )}
        {noAlertTranslatedBn && (
          <p>
            <em>🔁 Bengali: {noAlertTranslatedBn}</em>
          </p>
        )}
      </div>
    );
  }

  // ✅ Alert Found
  return (
    <div
      style={{
        backgroundColor: "#ffe7e7",
        padding: "1rem",
        border: "1px solid red",
        borderRadius: "8px",
        margin: "1rem 2rem",
      }}
    >
      <strong>⚠️ {alert.event}</strong>
      <p>{alert.description}</p>
      {translatedHi && (
        <p>
          <em>🔁 Hindi: {translatedHi}</em>
        </p>
      )}
      {translatedBn && (
        <p>
          <em>🔁 Bengali: {translatedBn}</em>
        </p>
      )}
    </div>
  );
}

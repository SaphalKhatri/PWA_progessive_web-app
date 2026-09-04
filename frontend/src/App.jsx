import React, { useState } from "react";

export default function App() {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/hello`);
      const data = await res.json();
      setResponseMessage(data.message);
    } catch (err) {
      console.error(err);
      setResponseMessage("Failed to fetch message from FastAPI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>My First PWA</h1>
      <button
        onClick={fetchMessage}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "8px",
          border: "1px solid #333",
        }}
      >
        {loading ? "Loading..." : "Get Message"}
      </button>

      <div style={{ marginTop: "2rem", fontSize: "1.25rem", color: "#0070f3" }}>
        {responseMessage}
      </div>
    </div>
  );
}
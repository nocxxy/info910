import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger le compteur au démarrage
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/counter`);
      setCount(response.data.count);
      setError(null);
    } catch (err) {
      setError("Erreur de connexion au backend");
      console.error(err);
    }
  };

  const incrementCounter = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/counter/increment`);
      setCount(response.data.count);
      setError(null);
    } catch (err) {
      setError("Erreur lors de l'incrémentation");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 Compteur de Clics</h1>
        <div className="counter-display">
          <p>Nombre de clics :</p>
          <h2>{count}</h2>
        </div>
        <button
          onClick={incrementCounter}
          disabled={loading}
          className="click-button"
        >
          {loading ? "⏳ Chargement..." : "👆 Cliquer !"}
        </button>
        {error && <p className="error">{error}</p>}
      </header>
    </div>
  );
}

export default App;

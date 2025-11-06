const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
const MONGO_URL = process.env.MONGO_URL;

console.log(
  "🔗 Tentative de connexion à:",
  MONGO_URL.replace(/:[^:@]+@/, ":****@")
); // Masque le mot de passe dans les logs

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// Schéma du compteur
const counterSchema = new mongoose.Schema({
  name: { type: String, default: "main" },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const method = req.method;
  const url = req.originalUrl;

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    console.log(
      `[${timestamp}] ${ip} ${method} ${url} ${status} ${duration}ms`
    );
  });

  next();
});

// Routes API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Récupérer le compteur
app.get("/api/counter", async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "main" });
    if (!counter) {
      counter = await Counter.create({ name: "main", count: 0 });
    }
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Incrémenter le compteur
app.post("/api/counter", async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "main" });
    if (!counter) {
      counter = await Counter.create({ name: "main", count: 1 });
    } else {
      counter.count += 1;
      await counter.save();
    }
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur le port ${PORT}`);
});

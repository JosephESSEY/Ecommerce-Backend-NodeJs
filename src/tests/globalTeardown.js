// src/tests/globalTeardown.js
const db = require("../config/db");

module.exports = async () => {
  try {
    console.log("Fermeture propre de la base de données...");
    await db.end();
  } catch (err) {
    console.error("Erreur lors de la fermeture de la base :", err);
  }
};

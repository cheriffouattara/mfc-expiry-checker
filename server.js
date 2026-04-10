const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route racine
app.get('/', (req, res) => {
  res.type('text/html');
  res.sendFile(path.join(__dirname, 'index.html'), (err) => {
    if (err) {
      console.error('❌ Erreur:', err);
      res.status(500).send('Erreur serveur');
    }
  });
});

// 404 - Fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`✅ Serveur LIVE sur http://localhost:${PORT}`);
});

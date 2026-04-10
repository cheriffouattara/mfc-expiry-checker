const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging pour debug
console.log('📁 Répertoire courant:', __dirname);
console.log('📄 Fichiers:', fs.readdirSync(__dirname));

// Servir fichiers statiques
app.use(express.static(__dirname));

// Route / - servir index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  console.log('📍 Cherchant index.html à:', indexPath);
  console.log('✅ Existe ?', fs.existsSync(indexPath));
  res.sendFile(indexPath);
});

// Toutes autres routes → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Serveur LIVE sur port ${PORT}`);
});

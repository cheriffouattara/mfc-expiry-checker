const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Chercher le fichier
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // Vérifier extension
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  
  if (ext === '.css') contentType = 'text/css';
  if (ext === '.js') contentType = 'text/javascript';
  if (ext === '.json') contentType = 'application/json';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.jpg') contentType = 'image/jpeg';
  if (ext === '.svg') contentType = 'image/svg+xml';
  
  // Lire et servir le fichier
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Si pas trouvé, servir index.html (pour SPA)
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erreur serveur');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Serveur LIVE sur port ${PORT}`);
});

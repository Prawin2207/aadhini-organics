const express = require('express');
const fs = require('fs');
const path = require('path');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Serve the built Vue app in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.listen(PORT, () => console.log(`Aadhini Organics API running on http://localhost:${PORT}`));

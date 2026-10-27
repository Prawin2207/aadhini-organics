// Netlify Function entry: runs the same Express API serverlessly
const serverless = require('serverless-http');
const app = require('./app');

const handler = serverless((req, res) => {
  // Requests may arrive as /.netlify/functions/api/... instead of /api/...
  req.url = req.url.replace(/^\/\.netlify\/functions\/api/, '/api');
  app(req, res);
});

module.exports = { handler };

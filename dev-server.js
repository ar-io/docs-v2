const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Add required CORS headers for WebContainer
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve static files from the out directory (after build)
app.use(express.static(path.join(__dirname, 'out')));

// Proxy API requests to the Next.js dev server if needed
if (process.env.NODE_ENV === 'development') {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
  }));
}

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Development server with WebContainer support running on http://localhost:${PORT}`);
  console.log('This server includes the required CORS headers for WebContainer to work properly.');
}); 
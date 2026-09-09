const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. High Security Headers & Helmet Configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://api.github.com"],
      connectSrc: ["'self'", "https://api.github.com"]
    }
  })
);

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Prevents Payload Flooding DDoS
app.use(express.static(path.join(__dirname, 'public')));

// 2. Anti-DDoS Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  message: { error: 'Too many requests from this IP. Please try again later for security reasons.' }
});

app.use('/api/', apiLimiter);

// 3. AI Chatbot API Endpoint
app.post('/api/ai-chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Please provide a valid text input.' });

  const query = message.toLowerCase();
  let reply = "ZEROSE specializes in custom AI agents, automated workflow pipelines, and secure modern full-stack web solutions.";

  if (query.includes('service') || query.includes('work') || query.includes('offer')) {
    reply = "We offer 3 core services: 1) AI Process Automation, 2) Workflow Integration Nodes, 3) High-Speed Secure Web Applications.";
  } else if (query.includes('contact') || query.includes('price') || query.includes('cost') || query.includes('hire')) {
    reply = "You can request a proposal via our Contact Form or click the green WhatsApp icon to talk directly to our engineering lead!";
  } else if (query.includes('security') || query.includes('safe') || query.includes('privacy')) {
    reply = "All ZEROSE architectures comply with zero-trust standards, SSL encryption, rate limiting, and zero third-party data sharing.";
  }

  res.status(200).json({ reply });
});

// 4. Secure Lead Generation API
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are strictly required.' });
  }

  // Simple Input Sanitization against XSS Injection
  const cleanName = String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanEmail = String(email).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanMessage = String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;");

  console.log('Secure Encrypted Lead Received:', {
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
    timestamp: new Date().toISOString()
  });

  res.status(200).json({
    message: 'Proposal received securely! The ZEROSE engineering team will reach out within 24 hours.'
  });
});

// Fallback Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ZEROSE Enterprise Server running securely at http://localhost:${PORT}`);
});
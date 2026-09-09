const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Security Headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdnjs.cloudflare.com",
        "https://fonts.googleapis.com"
      ],
      fontSrc: [
        "'self'",
        "https://cdnjs.cloudflare.com",
        "https://fonts.gstatic.com"
      ],
      imgSrc: ["'self'", "data:", "https://api.github.com"],
      connectSrc: ["'self'", "https://api.github.com"]
    }
  })
);

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// 2. API Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    error: 'Too many requests from this IP. Please try again later.'
  }
});

app.use('/api/', apiLimiter);

// 3. AI Chatbot API
app.post('/api/ai-chat', (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      reply: 'Please provide a valid text input.'
    });
  }

  const query = message.toLowerCase();

  let reply =
    'ZEROSE specializes in custom AI agents, automated workflow pipelines, and secure modern full-stack web solutions.';

  if (
    query.includes('service') ||
    query.includes('work') ||
    query.includes('offer')
  ) {
    reply =
      'We offer 3 core services: 1) AI Process Automation, 2) Workflow Integration Nodes, 3) High-Speed Secure Web Applications.';
  } else if (
    query.includes('contact') ||
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('hire')
  ) {
    reply =
      'You can request a proposal via our Contact Form or click the green WhatsApp icon to talk directly to our engineering lead!';
  } else if (
    query.includes('security') ||
    query.includes('safe') ||
    query.includes('privacy')
  ) {
    reply =
      'ZEROSE focuses on secure architecture, SSL encryption, rate limiting, input validation, and privacy-conscious development.';
  }

  res.status(200).json({ reply });
});

// 4. Contact / Lead API
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      message
    } = req.body;

    // Required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email and message are required.'
      });
    }

    // Convert everything to strings safely
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanPhone = String(phone || '').trim();
    const cleanCompany = String(company || '').trim();
    const cleanService = String(service || '').trim();
    const cleanMessage = String(message).trim();

    // Length protection
    if (
      cleanName.length > 100 ||
      cleanEmail.length > 150 ||
      cleanPhone.length > 50 ||
      cleanCompany.length > 150 ||
      cleanService.length > 100 ||
      cleanMessage.length > 3000
    ) {
      return res.status(400).json({
        error: 'One or more fields are too long.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.'
      });
    }

    // Escape HTML before putting user input into email HTML
    const escapeHTML = (value) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const safeName = escapeHTML(cleanName);
    const safeEmail = escapeHTML(cleanEmail);
    const safePhone = escapeHTML(cleanPhone);
    const safeCompany = escapeHTML(cleanCompany);
    const safeService = escapeHTML(cleanService);
    const safeMessage = escapeHTML(cleanMessage);

    // Environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !contactEmail) {
      console.error('Missing RESEND_API_KEY or CONTACT_EMAIL');

      return res.status(500).json({
        error: 'Email service is not configured.'
      });
    }

    // Send lead through Resend
    const resendResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'ZEROSE Website <onboarding@resend.dev>',
          to: [contactEmail],
          reply_to: cleanEmail,
          subject: `New ZEROSE Lead — ${cleanName}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">
              
              <h2 style="margin-bottom:20px;">
                🚀 New ZEROSE Website Lead
              </h2>

              <p>
                Someone submitted the contact form from the
                <strong>ZEROSE Website</strong>.
              </p>

              <hr>

              <h3>Lead Information</h3>

              <p><strong>Name:</strong> ${safeName}</p>

              <p><strong>Email:</strong> ${safeEmail}</p>

              <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>

              <p><strong>Company:</strong> ${safeCompany || 'Not provided'}</p>

              <p><strong>Service:</strong> ${safeService || 'Not specified'}</p>

              <h3>Message</h3>

              <div style="
                background:#f5f5f5;
                padding:15px;
                border-radius:8px;
                white-space:pre-wrap;
              ">
                ${safeMessage}
              </div>

              <hr>

              <p style="font-size:13px;color:#666;">
                Source: ZEROSE Website Contact Form
              </p>

            </div>
          `
        })
      }
    );

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend Error:', resendData);

      return res.status(500).json({
        error: 'Unable to send your message right now. Please try again.'
      });
    }

    console.log('New ZEROSE lead received:', {
      name: cleanName,
      email: cleanEmail,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      message:
        'Proposal received securely! The ZEROSE engineering team will reach out within 24 hours.'
    });

  } catch (error) {
    console.error('Contact API Error:', error);

    return res.status(500).json({
      error: 'Something went wrong. Please try again later.'
    });
  }
});

// 5. Fallback Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(
    `ZEROSE Enterprise Server running securely at http://localhost:${PORT}`
  );
});

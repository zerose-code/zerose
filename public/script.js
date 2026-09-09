// 1. Particle Canvas Engine
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = 'rgba(2, 195, 154, 0.4)';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
  }
}

for (let i = 0; i < 50; i++) particlesArray.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(); particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(2, 195, 154, ${0.15 - dist / 1000})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// 3. Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// 4. Mobile Nav
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// 5. GitHub API Auto Sync
const GITHUB_USERNAME = 'zerose-code'; // Change to your username

async function loadGitHubProjects() {
  const container = document.getElementById('githubContainer');
  if (!container) return;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) return;

    container.innerHTML = repos.map(repo => `
      <div class="glass-card reveal active">
        <div class="card-icon"><i class="fab fa-github"></i></div>
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Open source software engine built for high-performance AI operations.'}</p>
        <a href="${repo.html_url}" target="_blank" class="btn btn-glass" style="margin-top:1rem; display:inline-block;">View Code</a>
      </div>
    `).join('');
  } catch (err) { console.error('GitHub Sync Error:', err); }
}
document.addEventListener('DOMContentLoaded', loadGitHubProjects);

// 6. AI Support Assistant
const aiLauncher = document.getElementById('aiLauncher');
const aiChatWindow = document.getElementById('aiChatWindow');
const closeChat = document.getElementById('closeChat');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

aiLauncher.addEventListener('click', () => aiChatWindow.classList.toggle('active'));
closeChat.addEventListener('click', () => aiChatWindow.classList.remove('active'));

async function handleAIChat() {
  const query = chatInput.value.trim();
  if (!query) return;

  chatMessages.innerHTML += `<div class="message user">${query}</div>`;
  chatInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query })
    });
    const data = await res.json();
    chatMessages.innerHTML += `<div class="message bot">${data.reply}</div>`;
  } catch (err) {
    chatMessages.innerHTML += `<div class="message bot">I am having trouble connecting to ZEROSE nodes. Please contact support via WhatsApp!</div>`;
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendChatBtn.addEventListener('click', handleAIChat);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAIChat(); });

// 7. Secure Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.innerText = 'Encrypting & Sending proposal...';

  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (res.ok) {
      formStatus.style.color = '#00f5d4';
      formStatus.innerText = result.message;
      contactForm.reset();
    } else {
      formStatus.style.color = '#ff4d4d';
      formStatus.innerText = result.error;
    }
  } catch (err) {
    formStatus.style.color = '#ff4d4d';
    formStatus.innerText = 'Connection error. Please try WhatsApp.';
  }
});

// 8. Modals Logic
const privacyModal = document.getElementById('privacyModal');
const termsModal = document.getElementById('termsModal');

document.getElementById('privacyBtn').onclick = () => privacyModal.classList.add('active');
document.getElementById('closePrivacy').onclick = () => privacyModal.classList.remove('active');
document.getElementById('termsBtn').onclick = () => termsModal.classList.add('active');
document.getElementById('closeTerms').onclick = () => termsModal.classList.remove('active');
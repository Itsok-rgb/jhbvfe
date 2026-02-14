/**
 * Valentine's Day for Jaan - Script
 * Typing effect, contribution graph, accept button, modal, confetti, scroll animations
 */

(function () {
  'use strict';

  // ----- Typing animation -----
  const messages = [
    "Jaan, you are the best thing that ever happened to me...",
    "Every moment with you feels like magic...",
    "My heart compiles only for you...",
    "You're the love of my life. Happy Valentine's Day! 💕",
    "I fall in love with you every single day..."
  ];
  let msgIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const typedEl = document.getElementById('typed');
    if (!typedEl) return;
    const currentMsg = messages[msgIndex];

    if (isDeleting) {
      typedEl.textContent = currentMsg.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedEl.textContent = currentMsg.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentMsg.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (document.getElementById('typed')) {
    setTimeout(typeEffect, 1000);
  }

  // ----- Contribution graph with hearts -----
  const grid = document.getElementById('contribGrid');
  if (grid) {
    const weeks = 53;
    const days = 7;
    const totalCells = weeks * days;

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'contrib-cell';
      const rand = Math.random();
      if (rand > 0.35) {
        cell.classList.add('filled');
        const level = Math.floor(Math.random() * 4) + 1;
        cell.classList.add('level-' + level);
        cell.title = 'Love for Jaan';
        cell.textContent = '♥';
        cell.style.fontSize = '10px';
        cell.style.color = 'white';
      }
      grid.appendChild(cell);
    }
  }

  // ----- Accept button, modal, confetti -----
  const acceptBtn = document.getElementById('acceptBtn');
  const modal = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const surpriseMessage = document.getElementById('surpriseMessage');
  const confettiContainer = document.getElementById('confettiContainer');

  function createConfetti() {
    if (!confettiContainer) return;
    const hearts = ['❤️', '💕', '💗', '💖', '💝'];
    const colors = ['#ef4444', '#f472b6', '#ff6b9d', '#fbbf24'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti heart';
        confetti.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3500);
      }, i * 50);
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      acceptBtn.classList.add('accepted');
      acceptBtn.innerHTML = 'Accepted! I love you too! 💕';
      acceptBtn.style.pointerEvents = 'none';
      if (modal) modal.classList.add('active');
      createConfetti();
      if (surpriseMessage) setTimeout(() => surpriseMessage.classList.add('show'), 500);
    });
  }

  // Secret: click "Jaan" in header for extra hearts
  const titleEl = document.querySelector('h1');
  if (titleEl) {
    titleEl.addEventListener('click', () => {
      createConfetti();
      titleEl.style.animation = 'pulse-glow 0.5s ease';
      setTimeout(() => { titleEl.style.animation = ''; }, 500);
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal) modal.classList.remove('active');
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    }
  });

  // ----- Scroll fade-in -----
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  fadeEls.forEach(el => observer.observe(el));
})();

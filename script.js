/* ============================================
   FLUENCYUP — SCRIPT PRINCIPAL
   ============================================ */

(function () {
  'use strict';

  // ---------- NAVBAR SCROLL ----------
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- MENU MOBILE ----------
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fechar menu ao clicar em link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // ---------- REVEAL ON SCROLL ----------
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => io.observe(el));

  // ---------- PROGRESS BARS (EVOLUÇÃO) ----------
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // ---------- FORMULÁRIO → WHATSAPP ----------
  const form = document.getElementById('contactForm');
  const WHATSAPP_NUMBER = '5500000000000'; // ← substitua pelo número real

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const interesse = form.interesse.value;
    const mensagem = form.mensagem.value.trim();

    // Validação básica
    if (!nome || !email || !telefone || !interesse) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    const texto =
      `Olá, Teacher Milena! 👋%0A%0A` +
      `*Quero saber mais sobre a FluencyUp.*%0A%0A` +
      `*Nome:* ${encodeURIComponent(nome)}%0A` +
      `*E-mail:* ${encodeURIComponent(email)}%0A` +
      `*WhatsApp:* ${encodeURIComponent(telefone)}%0A` +
      `*Interesse:* ${encodeURIComponent(interesse)}%0A` +
      (mensagem ? `*Mensagem:* ${encodeURIComponent(mensagem)}%0A` : '') +
      `%0AAguardo seu retorno!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
    window.open(url, '_blank');
  });

  // ---------- MÁSCARA TELEFONE ----------
  const tel = document.getElementById('telefone');
  tel.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) {
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (v.length > 0) {
      v = v.replace(/(\d{0,2})/, '($1');
    }
    e.target.value = v;
  });

  // ---------- SMOOTH SCROLL (fallback) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- ANO ATUAL NO FOOTER ----------
  const yearEl = document.querySelector('.footer-bottom p');
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
  }

  // ---------- LOG DE BOAS-VINDAS ----------
  console.log('%c✨ FluencyUp by Teacher Milena', 'color:#B9434B;font-size:18px;font-weight:bold;');
  console.log('%cInglês personalizado com resultados reais.', 'color:#172A4D;font-size:12px;');
})();

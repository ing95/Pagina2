// main.js - Lógica interactiva para Pagina2 (Ingeniería Ambiental)

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Efecto Navbar en Scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      nav.style.padding = '0.5rem 0';
    } else {
      nav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      nav.style.padding = '1rem 0';
    }
  });

  // 2. Animaciones Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 120;
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger inicial

  // 3. Manejo de Errores - Sistema de Toasts
  const toastContainer = document.getElementById('toast-container');
  
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'error' ? '⚠️' : '✅';
    
    toast.innerHTML = `
      <span>${icon}</span>
      <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400); 
    }, 4000);
  };

  // 4. Validación del Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showToast('Por favor, completa todos los campos obligatorios.', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('El formato del correo electrónico no es válido.', 'error');
        return;
      }
      
      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando Solicitud...';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      
      setTimeout(() => {
        showToast('Su solicitud ha sido enviada con éxito. Nos pondremos en contacto a la brevedad.', 'success');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 1500);
    });
  }
});

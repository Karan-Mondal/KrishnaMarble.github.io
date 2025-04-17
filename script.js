// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    // Close mobile menu if open
    navLinks.classList.remove('active');
  });
});

// Section Animation on Scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Gallery Filtering
const filterButtons = document.querySelectorAll('.gallery-filter button');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryContainer = document.querySelector('.gallery-container');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter items
    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      item.style.display = filter === 'all' || item.classList.contains(filter) ? 'block' : 'none';
    });
  });
});

// Modal Functionality
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.gallery-modal-content');
const closeBtn = document.querySelector('.gallery-modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modal.classList.add('active');
    modalImg.src = item.querySelector('img').src;
    document.body.style.overflow = 'hidden';
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Product Cards to Gallery Navigation
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const galleryType = card.dataset.gallery;

    // Update filter buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === galleryType) {
        btn.classList.add('active');
      }
    });

    // Filter gallery items
    galleryItems.forEach(item => {
      item.style.display = galleryType === 'all' || item.classList.contains(galleryType) ? 'block' : 'none';
    });

    // Scroll to gallery
    document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
  });
});
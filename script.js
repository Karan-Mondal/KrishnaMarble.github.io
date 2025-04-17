// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add animation on scroll for sections (they should start with opacity: 0)
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Gallery Filtering
const filterButtons = document.querySelectorAll('.gallery-filter button');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter items
    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Modal Functionality
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.gallery-modal-content');
const closeBtn = document.querySelector('.gallery-modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Product cards to gallery navigation
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function() {
    const galleryType = this.dataset.gallery;
    
    // Update filter buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === galleryType) {
        btn.classList.add('active');
      }
    });
    
    // Show corresponding gallery
    galleryContainers.forEach(container => {
      container.classList.remove('active');
      if (container.classList.contains(galleryType)) {
        container.classList.add('active');
      }
    });
    
    // Scroll to gallery
    document.querySelector('#gallery').scrollIntoView({
      behavior: 'smooth'
    });
  });
});
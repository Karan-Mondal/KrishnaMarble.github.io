// Smooth Scrolling for Navigation Links
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
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
sections.forEach(section => observer.observe(section));

// Mobile Menu Toggle
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

    // Filter gallery items
    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      item.style.display = filter === 'all' || item.classList.contains(filter) ? 'block' : 'none';
    });
  });
});

// Modal Functionality with Swipe and Arrow Navigation
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.gallery-modal-content');
const closeBtn = document.querySelector('.gallery-modal-close');
const arrowLeft = document.querySelector('.gallery-modal-arrow-left');
const arrowRight = document.querySelector('.gallery-modal-arrow-right');

let currentImageIndex = 0;
let visibleItems = [];
let currentFilter = 'all';
let isAnimating = false; // Prevent animation overlap

// Update visible items based on current filter
function updateVisibleItems() {
  visibleItems = Array.from(galleryItems).filter(item => {
    return currentFilter === 'all' || item.classList.contains(currentFilter);
  });
}

// Show image with premium slide animation
function showImage(index, direction) {
  if (isAnimating) return; // Prevent overlap
  isAnimating = true;

  // Handle index bounds (looping)
  if (index < 0) index = visibleItems.length - 1;
  if (index >= visibleItems.length) index = 0;
  currentImageIndex = index;

  // Apply slide animation
  modalImg.classList.remove('slide-in-left', 'slide-in-right');
  modalImg.style.animation = 'none'; // Reset animation
  void modalImg.offsetWidth; // Trigger reflow
  modalImg.src = visibleItems[currentImageIndex].querySelector('img').src;
  modalImg.classList.add(direction === 'left' ? 'slide-in-left' : 'slide-in-right');

  // Reset animation flag after animation completes
  setTimeout(() => {
    isAnimating = false;
  }, 500); // Match animation duration (0.5s)
}

// Open modal
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    currentFilter = document.querySelector('.gallery-filter button.active').dataset.filter;
    updateVisibleItems();
    currentImageIndex = visibleItems.indexOf(item);
    modal.classList.add('active');
    modalImg.src = item.querySelector('img').src;
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  modalImg.classList.remove('slide-in-left', 'slide-in-right');
});

// Close modal on backdrop click
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    modalImg.classList.remove('slide-in-left', 'slide-in-right');
  }
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    modalImg.classList.remove('slide-in-left', 'slide-in-right');
  }
});

// Arrow navigation (PC)
arrowLeft.addEventListener('click', () => {
  showImage(currentImageIndex - 1, 'left');
});

arrowRight.addEventListener('click', () => {
  showImage(currentImageIndex + 1, 'right');
});

// Keyboard navigation (PC)
document.addEventListener('keydown', e => {
  if (modal.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      showImage(currentImageIndex - 1, 'left');
    } else if (e.key === 'ArrowRight') {
      showImage(currentImageIndex + 1, 'right');
    }
  }
});

// Swipe functionality (Mobile)
let touchStartX = 0;
let touchEndX = 0;

modalImg.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

modalImg.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
    if (swipeDistance > 0) {
      showImage(currentImageIndex - 1, 'left'); // Swipe right
    } else {
      showImage(currentImageIndex + 1, 'right'); // Swipe left
    }
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
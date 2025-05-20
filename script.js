document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('letterDropdown');
  const mainImage = document.getElementById('jewelryImage');
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const closeButton = document.querySelector('.close-button');
  const chimeAudio = document.getElementById('chime');
  const imagePreviewContainer = document.querySelector('.image-preview-container');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // --- Dark Mode Toggle Logic ---
  darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  } else {
    body.classList.remove('dark-mode');
    darkModeToggle.checked = false; // Ensure it's unchecked for light mode
  }

  // --- Populate Dropdown ---
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Populate dropdown A-Z
  letters.forEach(letter => {
    const option = document.createElement('option');
    option.value = letter.toLowerCase();
    option.textContent = letter;
    dropdown.appendChild(option);
  });

  // Set default value to A and update image
  dropdown.value = 'a';
  updateProductImage('a'); // Set initial image

  // --- Event Listeners ---

  // Handle dropdown change
  dropdown.addEventListener('change', () => {
    const selectedLetter = dropdown.value;
    updateProductImage(selectedLetter);
    playChime();
  });

  // Handle main image click for modal
  imagePreviewContainer.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImage.src = mainImage.src;
    modalImage.alt = mainImage.alt;
  });

  // Handle close button click for modal
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Keyboard accessibility for modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });

  // --- Helper Functions ---

  function updateProductImage(letter) {
    mainImage.style.opacity = '0'; // Start fade out
    mainImage.style.transform = 'scale(0.9)'; // Shrink for animation
    setTimeout(() => {
      mainImage.src = `images/${letter}.png`;
      mainImage.alt = `Bubble Initial Necklace for ${letter.toUpperCase()}`;
      mainImage.style.opacity = '1'; // Fade in
      mainImage.style.transform = 'scale(1)'; // Expand for animation
    }, 300); // Match this with CSS transition time
  }

  function playChime() {
    if (chimeAudio) {
      chimeAudio.currentTime = 0; // Rewind to start if already playing
      chimeAudio.play().catch(e => console.log("Audio play prevented:", e)); // Catch potential user gesture errors
    }
  }

  // --- Animation Observer ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply animate-in to observed elements
        entry.target.classList.add('animate-in');

        // Special handling for staggered animations within grids/containers
        if (entry.target.classList.contains('info-cards-grid')) {
          const cards = entry.target.querySelectorAll('.animated-card');
          cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
          });
        } else if (entry.target.classList.contains('two-point-info-container')) {
            const boxes = entry.target.querySelectorAll('.animated-box');
            boxes.forEach((box, index) => {
                box.style.animationDelay = `${index * 0.1}s`;
                box.classList.add('animate-in');
            });
        }
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust to trigger slightly before element reaches viewport bottom
  });

  // Observe elements that need scroll animations
  document.querySelectorAll(
    '.animated-subheading, .animated-text, .info-cards-grid, .two-point-info-container' // Observe containers
  ).forEach(el => {
    // Initial opacity/transform set in CSS for .animated-card and .animated-box
    // No need to set opacity: 0 here if already handled by CSS classes
    observer.observe(el);
  });


  // Add the animate-in class to the main info section after a short delay
  const infoSection = document.querySelector('.animated-info');
  if (infoSection) {
    setTimeout(() => {
      infoSection.classList.add('animate-in');
    }, 500); // Delay for info to animate after image
  }

  // Add a simple animation to the product gallery on load
  const productGallery = document.querySelector('.product-gallery');
  if (productGallery) {
    setTimeout(() => {
      productGallery.classList.add('animate-in');
    }, 300); // Delay for image to animate
  }

});
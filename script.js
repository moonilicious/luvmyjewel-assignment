document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun for dark mode
        themeToggle.title = 'Switch to Light Mode';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon for light mode
        themeToggle.title = 'Switch to Dark Mode';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Switch to Dark Mode';
        }
    });

    // Product Initial Selector Logic
    const initialThumbs = document.querySelectorAll('.initial-thumb-wrapper');
    const mainProductImage = document.getElementById('main-product-image');
    const selectedInitialSpan = document.getElementById('selected-initial');
    const productMainTitle = document.getElementById('product-main-title'); // Get the product title

    initialThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Prevent selection if out of stock
            if (thumb.classList.contains('out-of-stock')) {
                return;
            }

            // Remove 'selected' class from all thumbs
            initialThumbs.forEach(t => t.classList.remove('selected'));

            // Add 'selected' class to the clicked thumb
            thumb.classList.add('selected');

            // Update main image and selected initial text
            const initial = thumb.dataset.initial;
            mainProductImage.src = `images/${initial}.png`;
            selectedInitialSpan.textContent = initial.toUpperCase(); // Update the displayed initial
            productMainTitle.textContent = `Bubble Initial Pendant Necklace - ${initial.toUpperCase()}`; // Update title
        });
    });

    // Quantity Selector Logic
    const decrementBtn = document.getElementById('decrement-quantity');
    const incrementBtn = document.getElementById('increment-quantity');
    const quantityInput = document.getElementById('quantity');

    decrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > parseInt(quantityInput.min)) {
            quantityInput.value = currentValue - 1;
        }
    });

    incrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < parseInt(quantityInput.max)) {
            quantityInput.value = currentValue + 1;
        }
    });

    // --- New: Hamburger Menu Toggle Logic ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navList = document.getElementById('nav-list');

    if (hamburgerMenu && navList) {
        hamburgerMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Close menu if a link is clicked (optional, but good for UX)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            });
        });

        // Close menu if clicking outside (optional, but good for UX)
        document.addEventListener('click', (event) => {
            if (!navList.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    }
});
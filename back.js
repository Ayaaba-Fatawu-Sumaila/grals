// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
        }, 1);
    }, 2);
});

// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Page navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        document.getElementById(targetPage).classList.add('active');
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Initialize animations for the new page
        setTimeout(initPageAnimations, 3);
    });
});

// Set home page as default on load
window.addEventListener('load', () => {
    // Initialize image slider
    initImageSlider();
    
    // Initialize animations
    initPageAnimations();
    
    // Initialize WhatsApp message
    setTimeout(() => {
        document.getElementById('whatsappMsg').classList.add('visible');
    }, 2000);
});

// Image slider functionality
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetInterval();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Auto advance slides
    slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.image-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize animations for elements when they come into view
function initPageAnimations() {
    // Animate about image
    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage) {
        aboutImage.classList.add('visible');
    }
    
    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
    
    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 300);
    });
    
    // Initialize map if on contact page
    if (document.getElementById('contact-page').classList.contains('active')) {
        setTimeout(initMap, 100);
    }
}

// Initialize map
function initMap() {
    // Check if map already initialized
    if (document.getElementById('map').hasChildNodes()) return;
    
    const map = L.map('map').setView([5.6500, -0.1750], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([5.6500, -0.1750])
        .addTo(map)
        .bindPopup('L-GRAL\'S Service<br>East Legon, Accra, Ghana')
        .openPopup();
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contactForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Scroll animations
window.addEventListener('scroll', () => {
    initPageAnimations();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Add hover effects to interactive elements
document.querySelectorAll('.product-card, .event-card, .partner-logo, .organic-badge').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

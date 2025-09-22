
// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('div[id$="-page"]');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Page navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Hide all pages
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show target page
        document.getElementById(targetPage).style.display = 'block';
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // If products page, initialize animations
        if (targetPage === 'products-page') {
            setTimeout(animateProductCards, 100);
        }
        
        // If contact page, initialize map
        if (targetPage === 'contact-page') {
            setTimeout(initMap, 100);
        }
    });
});

// EmailJS initialization
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
})();

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Send the form using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            alert('Failed to send message. Please try again.');
            console.log('EmailJS error:', error);
        });
});

// Set home page as default on load
window.addEventListener('load', () => {
    pages.forEach(page => {
        if (page.id !== 'home-page') {
            page.style.display = 'none';
        }
    });
    
    // Initialize image slider
    initImageSlider();
    
    // Initialize product card animations
    animateProductCards();
    
    // Initialize WhatsApp message
    setTimeout(() => {
        document.getElementById('whatsappMsg').classList.add('visible');
    }, 2000);
    
    // Initialize map if on contact page
    if (window.location.hash === '#contact') {
        document.getElementById('home-page').style.display = 'none';
        document.getElementById('contact-page').style.display = 'block';
        setTimeout(initMap, 100);
    }
});

// Image slider functionality
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Auto advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Animate product cards on scroll
function animateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
        observer.observe(card);
    });
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

// Scroll animations
window.addEventListener('scroll', () => {
    animateProductCards();
});
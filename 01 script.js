
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product Card Interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Shopping Cart Functionality
let cartCount = 3;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (btn.innerHTML.includes('fa-shopping-cart')) {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add animation effect
            cartCountElement.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                cartCountElement.style.animation = '';
            }, 300);
            
            // Show success message
            showNotification('Product added to cart!');
        } else if (btn.innerHTML.includes('fa-heart')) {
            btn.style.color = btn.style.color === 'rgb(231, 76, 60)' ? '#2c3e50' : '#e74c3c';
            showNotification('Added to wishlist!');
        }
    });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
const emailInput = newsletterForm.querySelector('input[type="email"]');
const subscribeBtn = newsletterForm.querySelector('.btn');

subscribeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        showNotification('Thank you for subscribing!');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchIcon = document.querySelector('.search-box i');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

searchIcon.addEventListener('click', performSearch);

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        showNotification(`Searching for "${query}"...`);
        // Here you would typically make an API call or filter products
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-card, .product-card, .section-header').forEach(el => {
    observer.observe(el);
});

// Dynamic Loading Effect
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Add initial loading class
document.body.classList.add('loading');

// Price Filter (if needed for future development)
function filterByPrice(minPrice, maxPrice) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const priceElement = product.querySelector('.current-price');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        
        if (price >= minPrice && price <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Social Media Sharing
function shareProduct(productName, productUrl) {
    if (navigator.share) {
        navigator.share({
            title: productName,
            text: `Check out this amazing product: ${productName}`,
            url: productUrl
        });
    } else {
        // Fallback to copying link
        navigator.clipboard.writeText(productUrl);
        showNotification('Product link copied to clipboard!');
    }
}

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('loading');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Initialize tooltips and other interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize product quick view
    initializeQuickView();
});

// Quick View Functionality
function initializeQuickView() {
    document.querySelectorAll('.action-btn').forEach(btn => {
        if (btn.innerHTML.includes('fa-eye')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = btn.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                showNotification(`Quick view for ${productName}`);
                // Here you would typically open a modal with product details
            });
        }
    });
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

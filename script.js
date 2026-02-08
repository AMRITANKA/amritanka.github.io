// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update icon
    updateDarkModeIcon(isDarkMode);
});

function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Multi-language Support
const langToggle = document.querySelector('.lang-toggle');
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        blog: 'Blog',
        contact: 'Contact'
    },
    es: {
        home: 'Inicio',
        about: 'Acerca de',
        projects: 'Proyectos',
        blog: 'Blog',
        contact: 'Contacto'
    },
    fr: {
        home: 'Accueil',
        about: 'À propos',
        projects: 'Projets',
        blog: 'Blog',
        contact: 'Contact'
    }
};

let currentLang = localStorage.getItem('language') || 'en';

langToggle.addEventListener('click', () => {
    // Cycle through languages
    const langs = Object.keys(translations);
    const currentIndex = langs.indexOf(currentLang);
    currentLang = langs[(currentIndex + 1) % langs.length];
    
    localStorage.setItem('language', currentLang);
    langToggle.innerHTML = `<i class="fas fa-globe"></i> ${currentLang.toUpperCase()}`;
    
    // Update navigation text
    updateLanguage(currentLang);
});

function updateLanguage(lang) {
    const trans = translations[lang];
    if (trans) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            const key = href.replace('.html', '').replace('#', '');
            if (trans[key]) {
                link.textContent = trans[key];
            }
        });
    }
}

// Initialize language
updateLanguage(currentLang);
langToggle.innerHTML = `<i class="fas fa-globe"></i> ${currentLang.toUpperCase()}`;

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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg');
        navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
    }
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function highlightActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === `#${current}` || (href.includes('.html') && current === href.replace('.html', ''))) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNav);

// Project Filtering System
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    // Add animation
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        default:
            notification.style.background = 'var(--primary-color)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Project Card Hover Effects
const projectCardsAll = document.querySelectorAll('.project-card');
projectCardsAll.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill Bar Animation on Scroll
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Blog Search Functionality
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

if (searchBox && searchButton) {
    const performSearch = () => {
        const searchTerm = searchBox.value.toLowerCase();
        const blogPosts = document.querySelectorAll('.blog-post');
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.post-title a').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
        
        if (searchTerm && blogPosts.length === 0) {
            showNotification('No blog posts found matching your search.', 'info');
        }
    };
    
    searchButton.addEventListener('click', performSearch);
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Pagination Handling
const paginationBtns = document.querySelectorAll('.pagination-btn');
const pageNumbers = document.querySelectorAll('.page-number');

if (paginationBtns.length > 0) {
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            // Handle pagination logic here
            const direction = this.classList.contains('prev') ? -1 : 1;
            const currentPage = document.querySelector('.page-number.active');
            const currentIndex = Array.from(pageNumbers).indexOf(currentPage);
            const newIndex = currentIndex + direction;
            
            if (newIndex >= 0 && newIndex < pageNumbers.length) {
                currentPage.classList.remove('active');
                pageNumbers[newIndex].classList.add('active');
                
                // Update button states
                document.querySelector('.pagination-btn.prev').disabled = newIndex === 0;
                document.querySelector('.pagination-btn.next').disabled = newIndex === pageNumbers.length - 1;
                
                // Load new page content (implement as needed)
                loadBlogPage(newIndex + 1);
            }
        });
    });
    
    pageNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            document.querySelector('.page-number.active').classList.remove('active');
            number.classList.add('active');
            
            // Update button states
            document.querySelector('.pagination-btn.prev').disabled = index === 0;
            document.querySelector('.pagination-btn.next').disabled = index === pageNumbers.length - 1;
            
            // Load new page content
            loadBlogPage(index + 1);
        });
    });
}

function loadBlogPage(pageNumber) {
    // Implement page loading logic here
    console.log(`Loading page ${pageNumber}`);
    // This would typically make an API call or load different content
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .interest-item, .blog-post, .sidebar-widget').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Typing Effect for Hero Titles
const heroTitles = document.querySelectorAll('.hero-content h2, .page-header h1');
heroTitles.forEach(title => {
    const originalText = title.textContent;
    title.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            title.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect when page loads
    setTimeout(typeWriter, 500);
});

// Parallax Effect for Hero Sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSections = document.querySelectorAll('.hero, .page-header');
    
    heroSections.forEach(hero => {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

// Loading Animation
window.addEventListener('load', () => {
    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    animateSkillBars();
    
    // Add loading complete class
    setTimeout(() => {
        body.classList.add('loaded');
    }, 1000);
});

// Console welcome message
console.log('%c Welcome to Amritanka\'s Portfolio! ', 'background: var(--primary-color); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');

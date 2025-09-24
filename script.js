// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counter for results section
function animateCounters() {
    const counters = document.querySelectorAll('.result-number');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = counter.innerText;
            // Only animate numeric values
            if (!isNaN(value) && value.includes('%')) {
                const target = parseInt(value);
                const increment = target / speed;

                if (parseInt(counter.innerText) < target) {
                    counter.innerText = Math.ceil(parseInt(counter.innerText) + increment) + '%';
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = target + '%';
                }
            }
        };
        animate();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Trigger counter animation when results section is visible
            if (entry.target.classList.contains('results')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-in.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .slide-in-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .slide-in-left.animate-in {
            opacity: 1;
            transform: translateX(0);
        }

        .slide-in-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .slide-in-right.animate-in {
            opacity: 1;
            transform: translateX(0);
        }

        .scale-in {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .scale-in.animate-in {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);

    // Apply animation classes to elements
    const elementsToAnimate = [
        { selector: '.about-text', class: 'fade-in' },
        { selector: '.achievement-item', class: 'slide-in-left' },
        { selector: '.skill-item', class: 'scale-in' },
        { selector: '.project-info', class: 'slide-in-left' },
        { selector: '.mirror-showcase', class: 'slide-in-right' },
        { selector: '.feature-card', class: 'fade-in' },
        { selector: '.tech-item', class: 'scale-in' },
        { selector: '.step', class: 'slide-in-left' },
        { selector: '.challenge-item', class: 'fade-in' },
        { selector: '.results', class: 'fade-in' },
        { selector: '.contact-content', class: 'fade-in' }
    ];

    elementsToAnimate.forEach(({ selector, class: className }) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add(className);
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
});

// Mirror demo interaction
document.addEventListener('DOMContentLoaded', () => {
    const mirrorContent = document.querySelector('.mirror-content');
    const clothingOverlay = document.querySelector('.clothing-overlay');

    if (mirrorContent && clothingOverlay) {
        mirrorContent.addEventListener('mouseenter', () => {
            clothingOverlay.style.opacity = '1';
            clothingOverlay.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });

        mirrorContent.addEventListener('mouseleave', () => {
            clothingOverlay.style.opacity = '0.8';
            clothingOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
});

// Enhanced mirror demo with clothing switching
document.addEventListener('DOMContentLoaded', () => {
    const shirtOverlay = document.querySelector('.shirt-overlay');
    const colors = [
        'linear-gradient(135deg, #fbbf24, #f59e0b)', // Yellow
        'linear-gradient(135deg, #ef4444, #dc2626)', // Red
        'linear-gradient(135deg, #3b82f6, #2563eb)', // Blue
        'linear-gradient(135deg, #22c55e, #16a34a)', // Green
        'linear-gradient(135deg, #a855f7, #9333ea)'  // Purple
    ];

    let currentColor = 0;

    if (shirtOverlay) {
        setInterval(() => {
            currentColor = (currentColor + 1) % colors.length;
            shirtOverlay.style.background = colors[currentColor];
        }, 3000);
    }
});

// Add typing effect to hero subtitle
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = 'Computer Science Student & Researcher';
    let index = 0;

    if (subtitle) {
        subtitle.textContent = '';

        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < hero.offsetHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Form validation for contact form (if added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced Loading Animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    // Add fade out after everything loads
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');

        // Remove from DOM after fade out completes
        setTimeout(() => {
            loadingScreen.remove();

            // Trigger entrance animations
            initializeEntranceAnimations();
        }, 500);
    }, 1000); // Show loading for at least 1 second
});

// Initialize entrance animations
function initializeEntranceAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }

    // Animate hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.animation = 'fadeInUp 1s ease 0.3s forwards';
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.opacity = '1';
        }, 300);
    }
}

// Enhanced counter animation for stats
function animateCounters() {
    const statItems = document.querySelectorAll('.stat-item h3');

    statItems.forEach(counter => {
        const text = counter.textContent;

        if (text.includes('%')) {
            const target = parseInt(text);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '%';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current) + '%';
                }
            }, 30);
        }
    });
}

// Enhanced intersection observer with staggered animations
function setupEnhancedAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Trigger counter animation for stats
                if (entry.target.classList.contains('intro-stats')) {
                    setTimeout(() => animateCounters(), 300);
                }

                // Staggered animation for achievement items
                if (entry.target.classList.contains('achievements-grid')) {
                    const items = entry.target.querySelectorAll('.achievement-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('scale-bounce', 'animate-in');
                        }, index * 150);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    const elementsToObserve = [
        '.intro-stats',
        '.achievements-grid',
        '.tech-stack-grid',
        '.feature-grid',
        '.mirror-showcase',
        '.challenge-list'
    ];

    elementsToObserve.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    setupEnhancedAnimations();
});

// Add 3D tilt effect to project cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .tech-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Modal functionality
function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalCaption.textContent = caption;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking the X
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Console log for developers
console.log(`
🚀 FlashFit Portfolio Website
👨‍💻 Developed by Xinyuan Qi
📧 Contact for collaborations and opportunities
🎯 Built for college admissions showcase
`);

// Easter egg - Konami code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }

    if (konamiCode.every((code, i) => code === correctCode[i])) {
        const mirrorContent = document.querySelector('.mirror-content');
        if (mirrorContent) {
            mirrorContent.innerHTML = `
                <div style="color: #fbbf24; text-align: center;">
                    <i class="fas fa-star" style="font-size: 3rem; animation: spin 2s linear infinite;"></i>
                    <p style="margin-top: 1rem;">Easter Egg Activated!</p>
                    <p style="font-size: 0.8rem;">FlashFit Developer Mode</p>
                </div>
            `;
        }
        console.log('🎉 Easter egg activated! Developer mode engaged.');
    }
});

// Add CSS for spinning animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);
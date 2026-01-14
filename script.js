// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== ACTIVE SECTION HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== ENHANCED SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.skill-card, .project-card, .achievement-card, .timeline-item, .info-card, .tech-item, .cert-card').forEach(el => {
    el.classList.add('animate-item');
    observer.observe(el);
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-item {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-card:nth-child(1) { transition-delay: 0s; }
    .skill-card:nth-child(2) { transition-delay: 0.15s; }
    .skill-card:nth-child(3) { transition-delay: 0.3s; }
    
    .project-card:nth-child(1) { transition-delay: 0s; }
    .project-card:nth-child(2) { transition-delay: 0.1s; }
    .project-card:nth-child(3) { transition-delay: 0.2s; }
    .project-card:nth-child(4) { transition-delay: 0.3s; }
    .project-card:nth-child(5) { transition-delay: 0.4s; }
    .project-card:nth-child(6) { transition-delay: 0.5s; }
    
    .achievement-card:nth-child(1) { transition-delay: 0s; }
    .achievement-card:nth-child(2) { transition-delay: 0.15s; }
    .achievement-card:nth-child(3) { transition-delay: 0.3s; }
    .achievement-card:nth-child(4) { transition-delay: 0.45s; }
    .achievement-card:nth-child(5) { transition-delay: 0.6s; }
    
    .timeline-item:nth-child(1) { transition-delay: 0s; }
    .timeline-item:nth-child(2) { transition-delay: 0.2s; }
    .timeline-item:nth-child(3) { transition-delay: 0.4s; }
    .timeline-item:nth-child(4) { transition-delay: 0.6s; }
    
    .cert-card:nth-child(1) { transition-delay: 0s; }
    .cert-card:nth-child(2) { transition-delay: 0.15s; }
    .cert-card:nth-child(3) { transition-delay: 0.3s; }
    .cert-card:nth-child(4) { transition-delay: 0.45s; }
    .cert-card:nth-child(5) { transition-delay: 0.6s; }
`;
document.head.appendChild(style);

// ========== PORTFOLIO FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i data-lucide="check"></i><span>Pesan Terkirim!</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    // Re-initialize lucide icons
    lucide.createIcons();

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
        lucide.createIcons();
    }, 3000);
});

// ========== SMOOTH SCROLL ==========
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

// ========== PARALLAX EFFECT FOR HERO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
        }
    }
});

// ========== ENHANCED CURSOR GLOW EFFECT ==========
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .info-card, .cert-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add enhanced glow effect styles
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .skill-card::after,
    .project-card::after,
    .achievement-card::after,
    .cert-card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(
            700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(99, 102, 241, 0.08),
            transparent 40%
        );
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
        z-index: 0;
    }
    
    .skill-card:hover::after,
    .project-card:hover::after,
    .achievement-card:hover::after,
    .cert-card:hover::after {
        opacity: 1;
    }
    
    .skill-card > *,
    .project-card > *,
    .achievement-card > *,
    .cert-card > * {
        position: relative;
        z-index: 1;
    }
`;
document.head.appendChild(glowStyle);

// ========== CERTIFICATE MODAL ==========
function initCertificateModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.innerHTML = `
        <button class="cert-modal-close">
            <i data-lucide="x"></i>
        </button>
        <div class="cert-modal-content">
            <img src="" alt="Certificate">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.cert-modal-close');

    // Add click event to certificate cards
    document.querySelectorAll('.cert-card').forEach(card => {
        const img = card.querySelector('.cert-image');
        const imageWrapper = card.querySelector('.cert-image-wrapper');

        if (imageWrapper && img) {
            imageWrapper.addEventListener('click', () => {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                lucide.createIcons();
            });
        }
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== CURSOR TRAIL EFFECT ==========
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];

            dot.style.left = x + 'px';
            dot.style.top = y + 'px';

            x += (parseInt(nextDot.style.left) || x - x) * 0.3;
            y += (parseInt(nextDot.style.top) || y - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Add cursor trail styles
const cursorTrailStyle = document.createElement('style');
cursorTrailStyle.textContent = `
    .cursor-trail-dot {
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: opacity 0.3s ease;
    }
    
    .cursor-trail-dot:nth-child(1) { opacity: 0.8; }
    .cursor-trail-dot:nth-child(5) { opacity: 0.6; }
    .cursor-trail-dot:nth-child(10) { opacity: 0.4; }
    .cursor-trail-dot:nth-child(15) { opacity: 0.2; }
    .cursor-trail-dot:nth-child(20) { opacity: 0.1; }
    
    @media (max-width: 768px) {
        .cursor-trail-dot {
            display: none;
        }
    }
`;
document.head.appendChild(cursorTrailStyle);

// ========== TYPING EFFECT FOR ROLES ==========
function initTypingEffect() {
    const roles = document.querySelectorAll('.role');

    roles.forEach((role, index) => {
        const text = role.textContent;
        role.textContent = '';
        role.style.opacity = '0';

        setTimeout(() => {
            role.style.opacity = '1';
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    role.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 400);
    });
}

// ========== SCROLL PROGRESS INDICATOR ==========
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add scroll progress styles
const scrollProgressStyle = document.createElement('style');
scrollProgressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
        z-index: 10000;
        transition: width 0.2s ease;
    }
`;
document.head.appendChild(scrollProgressStyle);

// ========== NUMBER COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const suffix = counter.textContent.replace(/[0-9]/g, '');

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize certificate modal
    initCertificateModal();

    // Initialize cursor trail (only on desktop)
    if (window.innerWidth > 768) {
        createCursorTrail();
    }

    // Initialize scroll progress
    createScrollProgress();

    // Initialize number counters
    animateCounters();

    // Initialize typing effect
    setTimeout(() => {
        initTypingEffect();
    }, 500);

    // Add loaded class to body
    document.body.classList.add('loaded');

    console.log('🚀 Portfolio loaded with modern dark theme!');
    console.log('✨ Enhanced animations and interactions active');
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
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

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

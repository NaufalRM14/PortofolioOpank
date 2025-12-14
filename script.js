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

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.skill-card, .project-card, .achievement-card, .timeline-item, .info-card, .tech-item').forEach(el => {
    el.classList.add('animate-item');
    observer.observe(el);
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-card:nth-child(2) { transition-delay: 0.1s; }
    .skill-card:nth-child(3) { transition-delay: 0.2s; }
    .skill-card:nth-child(4) { transition-delay: 0.3s; }
    
    .project-card:nth-child(2) { transition-delay: 0.1s; }
    .project-card:nth-child(3) { transition-delay: 0.15s; }
    .project-card:nth-child(4) { transition-delay: 0.2s; }
    .project-card:nth-child(5) { transition-delay: 0.25s; }
    .project-card:nth-child(6) { transition-delay: 0.3s; }
    
    .achievement-card:nth-child(2) { transition-delay: 0.1s; }
    .achievement-card:nth-child(3) { transition-delay: 0.2s; }
    .achievement-card:nth-child(4) { transition-delay: 0.3s; }
    
    .timeline-item:nth-child(2) { transition-delay: 0.15s; }
    .timeline-item:nth-child(3) { transition-delay: 0.3s; }
    .timeline-item:nth-child(4) { transition-delay: 0.45s; }
`;
document.head.appendChild(style);

// ========== PROGRESS BAR ANIMATION ==========
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.style.getPropertyValue('--progress');
            entry.target.style.width = progress;
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
});

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

    // Show success message (in real app, this would send to a server)
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i data-lucide="check"></i><span>Pesan Terkirim!</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    // Re-initialize lucide icons for the new icon
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

// ========== TYPING EFFECT FOR HERO ==========
const roles = ['Digital Designer', 'Social Media Marketing', 'Front-end Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const roleElements = document.querySelectorAll('.role');
    if (roleElements.length === 0) return;

    // This is a simple visual enhancement - roles are already displayed
    // Could be extended for more complex typing animation
}

// ========== INITIALIZE LUCIDE ICONS ==========
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Add loaded class to body for animations
    document.body.classList.add('loaded');
});

// ========== PARALLAX EFFECT FOR HERO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    }
});

// ========== CURSOR GLOW EFFECT ==========
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .info-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add hover glow effect styles
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .skill-card::after,
    .project-card::after,
    .achievement-card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(99, 102, 241, 0.06),
            transparent 40%
        );
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .skill-card:hover::after,
    .project-card:hover::after,
    .achievement-card:hover::after {
        opacity: 1;
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

// ========== OBSERVE CERTIFICATE CARDS ==========
document.querySelectorAll('.cert-card').forEach(el => {
    el.classList.add('animate-item');
    observer.observe(el);
});

// Add certificate card animation delays
const certStyle = document.createElement('style');
certStyle.textContent = `
    .cert-card:nth-child(2) { transition-delay: 0.1s; }
    .cert-card:nth-child(3) { transition-delay: 0.2s; }
    .cert-card:nth-child(4) { transition-delay: 0.3s; }
    .cert-card:nth-child(5) { transition-delay: 0.4s; }
`;
document.head.appendChild(certStyle);

// Initialize certificate modal on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initCertificateModal();
});

console.log('🚀 Portfolio loaded successfully!');

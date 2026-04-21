// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 16 + 'px';
    cursor.style.top = e.clientY - 16 + 'px';
});

// Cursor hover effect on links and buttons
const hoverables = document.querySelectorAll('a, button, input, textarea, .group');
hoverables.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'rgba(209, 160, 84, 0.1)';
        cursor.style.borderColor = 'rgba(209, 160, 84, 0.8)';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = 'rgba(209, 160, 84, 0.5)';
    });
});

// Intersection Observer for Reveal Animations
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    // Add reveal class to sections that don't have it yet to keep HTML clean
    const sections = document.querySelectorAll('section, h2, h3, .group');
    sections.forEach(sec => sec.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('nav .flex'); // Target the desktop links container for simplicity in demo

// Note: In a real implementation with more time, I'd build a proper mobile drawer.
// This is a minimal version for the demo.
menuToggle.addEventListener('click', () => {
    alert('Mobile menu clicked! In a full implementation, a sleek drawer would open here.');
});

// Smooth scroll handle (already handled by CSS scroll-smooth, but JS fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission (Demo)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            contactForm.reset();
        }, 3000);
    });
}

// Stats Animation (Rough implementation)
const animateStats = () => {
    const stats = document.querySelectorAll('h4.text-3xl');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                let startValue = 0;
                const duration = 2000;
                const startTime = performance.now();

                const update = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * endValue);
                    target.textContent = current + (target.textContent.includes('+') ? '+' : '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                };
                requestAnimationFrame(update);
                observer.unobserve(target);
            }
        });
    });
    stats.forEach(s => observer.observe(s));
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    revealElements();
    animateStats();
});

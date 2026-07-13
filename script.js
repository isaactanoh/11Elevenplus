/**
 * 11Eleven Plus - Core UI & UX Interaction Engine
 * Bold & Vibrant Edition - Enhanced Performance
 */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Master Application Components
    initPreloader();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initGlassGlowTracker();
    initAnimatedMetrics();
    initScrollProgress();
    initParallaxGlow();
    initMagneticButtons();
    initFormEnhancements();
    initSmoothScroll();
});

/* ==========================================================================
   01. LUXURY INITIAL PRELOADER TERMINATION
   ========================================================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('app-loaded');
            }, 800);
        }, 800);
    });
}

/* ==========================================================================
   02. KINETIC CUSTOM CURSOR MOTION MANAGEMENT
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');

    if (!cursor || !dot || window.matchMedia('(max-width: 991px)').matches) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        dot.style.left = targetX + 'px';
        dot.style.top = targetY + 'px';
    });

    function renderCursorFrame() {
        const diffX = targetX - currentX;
        const diffY = targetY - currentY;

        // Interpolation factor for the trailing ring cursor
        const speed = 0.75;
        currentX += diffX * speed;
        currentY += diffY * speed;

        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';

        rafId = requestAnimationFrame(renderCursorFrame);
    }

    renderCursorFrame();

    const activeTargets = document.querySelectorAll('a, button, .glass-card, input, .btn, .nav-link, .card-btn, .footer-socials a');
    activeTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
            cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
            cursor.style.borderColor = '#D4AF37';
            cursor.style.borderWidth = '2px';
        });
        target.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = '#D4AF37';
            cursor.style.borderWidth = '1.5px';
        });
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
    });
}

/* ==========================================================================
   03. HEADER SCROLL DETECTION & RESPONSIVE HAMBURGER NAVIGATION
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector('.main-header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky transform scroll states handling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
        scrollTimeout = requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    });

    // Responsive Mobile Drawer Execution
    if (hamburger && navMenu) {

        const closeDrawer = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('lock-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        const openDrawer = () => {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            document.body.classList.add('lock-scroll');
            hamburger.setAttribute('aria-expanded', 'true');
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.contains('active');
            isOpen ? closeDrawer() : openDrawer();
        });

        // Close layout drawer cleanly when interacting with any embedded anchor path links
        navLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        // Close on backdrop click (click outside menu)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                const isClickInside = navMenu.contains(e.target) || hamburger.contains(e.target);
                if (!isClickInside) closeDrawer();
            }
        });

        // Close on Escape key, and auto-close if the viewport is resized back to desktop
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) closeDrawer();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && navMenu.classList.contains('active')) closeDrawer();
        });
    }
}

/* ==========================================================================
   04. HARDWARE-ACCELERATED ELEMENT SCROLL REVEAL SCENARIOS
   ========================================================================== */
function initScrollAnimations() {
    const componentsToReveal = document.querySelectorAll('.reveal-on-scroll');
    if (componentsToReveal.length === 0) return;

    const revealSettings = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, revealSettings);

    componentsToReveal.forEach(target => scrollObserver.observe(target));
}

/* ==========================================================================
   05. MOUSE ELEMENT BOUNDING COORDS EXTRACTOR FOR GLASSMORPHISM GLOWS
   ========================================================================== */
function initGlassGlowTracker() {
    const cards = document.querySelectorAll('.glass-card');
    if (cards.length === 0 || window.matchMedia('(max-width: 991px)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const coordinateX = e.clientX - bounds.left;
            const coordinateY = e.clientY - bounds.top;

            card.style.setProperty('--x', coordinateX + 'px');
            card.style.setProperty('--y', coordinateY + 'px');
        });

        // Reset glow position when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', '-999px');
            card.style.setProperty('--y', '-999px');
        });
    });
}

/* ==========================================================================
   06. LINEAR STEP METRICS CONTEXT COUNTERS
   ========================================================================== */
function initAnimatedMetrics() {
    const counterTargets = document.querySelectorAll('.counter-number[data-target]');
    if (counterTargets.length === 0) return;

    const quantitativeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                const explicitLimit = parseInt(counterElement.getAttribute('data-target'), 10);
                if (isNaN(explicitLimit) || explicitLimit <= 0) return;

                let currentProgressionValue = 0;
                const sequenceDuration = 1500;
                const steps = Math.min(explicitLimit, 60);
                const calculationStepTime = Math.floor(sequenceDuration / steps);

                const incrementTimer = setInterval(() => {
                    currentProgressionValue += Math.ceil(explicitLimit / steps);
                    if (currentProgressionValue > explicitLimit) {
                        currentProgressionValue = explicitLimit;
                    }
                    counterElement.textContent = currentProgressionValue;

                    if (currentProgressionValue >= explicitLimit) {
                        counterElement.textContent = explicitLimit;
                        clearInterval(incrementTimer);
                    }
                }, calculationStepTime);

                quantitativeObserver.unobserve(counterElement);
            }
        });
    }, { threshold: 0.8 });

    counterTargets.forEach(metric => quantitativeObserver.observe(metric));
}

/* ==========================================================================
   07. SLIM SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    let ticking = false;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(progress, 100) + '%';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });

    updateProgress();
}

/* ==========================================================================
   08. SUBTLE PARALLAX ON HERO AMBIENT GLOW
   ========================================================================== */
function initParallaxGlow() {
    const spheres = document.querySelectorAll('.animated-gradient-sphere');
    if (spheres.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    function updateParallax() {
        const scrollTop = window.scrollY;
        spheres.forEach(sphere => {
            sphere.style.transform = `translateY(${scrollTop * 0.15}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/* ==========================================================================
   09. MAGNETIC BUTTON PULL (DESKTOP ONLY)
   ========================================================================== */
function initMagneticButtons() {
    if (window.matchMedia('(max-width: 991px)').matches) return;

    const magnets = document.querySelectorAll('.btn, .btn-nav, .card-btn');

    magnets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const bounds = el.getBoundingClientRect();
            const relX = e.clientX - bounds.left - bounds.width / 2;
            const relY = e.clientY - bounds.top - bounds.height / 2;
            el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ==========================================================================
   10. FORM ENHANCEMENTS - BETTER USER EXPERIENCE
   ========================================================================== */
function initFormEnhancements() {
    // Auto-dismiss loading state on form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                if (btnText && btnLoader) {
                    btnText.style.display = 'none';
                    btnLoader.style.display = 'inline-block';
                    submitBtn.disabled = true;
                }
            }
        });
    });

    // Input focus effects
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Placeholder animation for empty inputs
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

/* ==========================================================================
   11. SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================================== */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================================================
   12. DYNAMIC YEAR UPDATE FOR FOOTER
   ========================================================================== */
(function updateFooterYear() {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = el.textContent.replace('2026', currentYear);
    });
})();

/* ==========================================================================
   13. LAZY LOADING FOR IMAGES
   ========================================================================== */
(function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
})();

/* ==========================================================================
   14. KEYBOARD NAVIGATION ENHANCEMENTS
   ========================================================================== */
(function initKeyboardNav() {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        el.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
})();

/* ==========================================================================
   15. PERFORMANCE OPTIMIZATION - DEBOUNCE RESIZE EVENTS
   ========================================================================== */
(function initResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle any resize-specific logic here
            document.dispatchEvent(new CustomEvent('windowResized'));
        }, 250);
    });
})();

/* ==========================================================================
   16. SCROLL TO TOP BUTTON (UTILITY)
   ========================================================================== */
(function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-gold);
            color: white;
            border: none;
            box-shadow: var(--shadow-gold-lg);
            cursor: pointer;
            z-index: 999;
            opacity: 0;
            transform: translateY(20px);
            transition: all var(--transition-duration) var(--transition-premium);
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        document.body.appendChild(scrollBtn);

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 500) {
                        scrollBtn.style.opacity = '1';
                        scrollBtn.style.transform = 'translateY(0)';
                    } else {
                        scrollBtn.style.opacity = '0';
                        scrollBtn.style.transform = 'translateY(20px)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'scale(1.1)';
        });
        scrollBtn.addEventListener('mouseleave', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.transform = 'scale(1)';
            }
        });
    }
})();

/* ==========================================================================
   17. CARD TILT EFFECT (DESKTOP ONLY)
   ========================================================================== */
(function initCardTilt() {
    if (window.matchMedia('(max-width: 991px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.glass-card:not(.no-tilt)');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
})();
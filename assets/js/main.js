/**
 * ============================================
 * 株式会社サクラ工業 コーポレートサイト
 * 共通JavaScript
 * ============================================
 * Version: 1.0.0
 * Last Updated: 2025
 * Author: SAKURA KOGYO Inc.
 * ============================================
 */

'use strict';

/**
 * DOMContentLoaded時に全機能を初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initMobileNavParticles();
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
});

/**
 * ============================================
 * Hero Canvas Particles Animation
 * ============================================
 */
function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            const colors = [
                { r: 212, g: 165, b: 116 },
                { r: 232, g: 201, b: 168 },
                { r: 240, g: 184, b: 196 },
                { r: 255, g: 255, b: 255 }
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.fadeSpeed * this.fadeDirection;
            
            if (this.opacity >= 0.7) this.fadeDirection = -1;
            else if (this.opacity <= 0.1) this.fadeDirection = 1;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`;
            ctx.shadowColor = `rgba(${this.color.r},${this.color.g},${this.color.b},0.5)`;
            ctx.shadowBlur = this.size * 4;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        const count = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    
    createParticles();

    function drawConnections() {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212,165,116,${(1 - dist / maxDist) * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }
    
    animate();

    // パフォーマンス最適化: 画面外では停止
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animate();
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
}

/**
 * ============================================
 * Mobile Navigation Particles Animation
 * ============================================
 */
function initMobileNavParticles() {
    const canvas = document.getElementById('mobileNavCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let isActive = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeSpeed = Math.random() * 0.004 + 0.001;
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            const colors = [
                { r: 212, g: 165, b: 116 },
                { r: 240, g: 184, b: 196 },
                { r: 255, g: 255, b: 255 }
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.fadeSpeed * this.fadeDirection;
            
            if (this.opacity >= 0.6) this.fadeDirection = -1;
            else if (this.opacity <= 0.05) this.fadeDirection = 1;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`;
            ctx.shadowColor = `rgba(${this.color.r},${this.color.g},${this.color.b},0.3)`;
            ctx.shadowBlur = this.size * 3;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        resizeCanvas();
        const count = Math.min(50, Math.floor(canvas.width * canvas.height / 20000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    // グローバル関数として公開
    window.startMobileNavParticles = function() {
        if (isActive) return;
        isActive = true;
        createParticles();
        animate();
    };
    
    window.stopMobileNavParticles = function() {
        isActive = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', () => {
        if (isActive) resizeCanvas();
    });
}

/**
 * ============================================
 * Header Scroll Effect
 * ============================================
 */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    updateHeader();
}

/**
 * ============================================
 * Mobile Navigation Toggle
 * ============================================
 */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        if (isActive && typeof window.startMobileNavParticles === 'function') {
            window.startMobileNavParticles();
        } else if (typeof window.stopMobileNavParticles === 'function') {
            window.stopMobileNavParticles();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            if (typeof window.stopMobileNavParticles === 'function') {
                window.stopMobileNavParticles();
            }
        });
    });

    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            if (typeof window.stopMobileNavParticles === 'function') {
                window.stopMobileNavParticles();
            }
        }
    });
}

/**
 * ============================================
 * Scroll Animations (Intersection Observer)
 * ============================================
 */
function initScrollAnimations() {
    const els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    els.forEach(el => observer.observe(el));
}

/**
 * ============================================
 * Back to Top Button
 * ============================================
 */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    let ticking = false;
    
    function update() {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ============================================
 * Smooth Scroll for Anchor Links
 * ============================================
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

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
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
});

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

    function setNavOpen(isOpen) {
        hamburger.classList.toggle('active', isOpen);
        nav.classList.toggle('active', isOpen);
        document.documentElement.classList.toggle('nav-open', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    }

    hamburger.addEventListener('click', () => {
        const isActive = !nav.classList.contains('active');
        setNavOpen(isActive);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setNavOpen(false);
        });
    });

    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            setNavOpen(false);
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

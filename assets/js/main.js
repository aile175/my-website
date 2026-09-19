/* Shared interactions. Content stays accessible when JavaScript is unavailable. */
'use strict';

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initNavigation() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    const mobile = window.matchMedia('(max-width: 880px)');
    const links = [...nav.querySelectorAll('a')];
    const background = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.header .brand')].filter(Boolean);
    let open = false;

    function setOpen(next, returnFocus = false) {
        open = next && mobile.matches;
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
        toggle.querySelector('.menu-toggle-label').textContent = open ? 'CLOSE' : 'MENU';
        document.documentElement.classList.toggle('nav-open', open);
        background.forEach(element => { element.inert = open; });
        if (open) links[0]?.focus();
        else if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => setOpen(!open, open));
    links.forEach(link => link.addEventListener('click', () => setOpen(false)));
    mobile.addEventListener('change', () => setOpen(false));
    window.addEventListener('pageshow', () => setOpen(false));

    document.addEventListener('keydown', event => {
        if (!open) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false, true);
        }
        if (event.key === 'Tab') {
            const first = links[0];
            // In document order, the toggle follows the navigation links.
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                toggle.focus();
            } else if (!event.shiftKey && document.activeElement === toggle) {
                event.preventDefault();
                first?.focus();
            }
        }
    });
}

function initAnchorFocus() {
    // Keep native anchor scrolling and browser history, while moving keyboard focus.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            requestAnimationFrame(() => {
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            });
        });
    });
}

function initReveals() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    const elements = [...document.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0, rootMargin: '0px 0px 24px 0px' });

    elements.forEach(element => {
        // Anchor destinations and anything already visible never start hidden.
        if (element.getBoundingClientRect().top > window.innerHeight) {
            element.classList.add('reveal-pending');
            observer.observe(element);
        }
    });
    reduceMotion.addEventListener('change', event => {
        if (!event.matches) return;
        elements.forEach(element => element.classList.remove('reveal-pending'));
        observer.disconnect();
    });
}

function initSectionNavigation() {
    if (!('IntersectionObserver' in window)) return;
    const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
    if (!links.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}

initNavigation();
initAnchorFocus();
initReveals();
initSectionNavigation();

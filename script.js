document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSearch();
    initCategoryScroll();
    initHeroParallax();
    initHeaderScrollEffect();
    initButtonRipple();
    initImageLazyLoad();
    initAnnouncementAnimation();
    initCategoryFilter();
});
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!menuBtn || !mainNav || !overlay) return;
    function toggleMenu() {
        const isOpen = menuBtn.classList.contains('active');
        menuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }
    function closeMenu() {
        menuBtn.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });
}
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    if (!searchInput || !searchBtn) return;
    const placeholders = [
        'Search for Earrings..',
        'Search for Necklaces..',
        'Search for Rings..',
        'Search for Bracelets..',
        'Search for Gold..',
        'Search for Silver..'
    ];
    let currentIndex = 0;
    setInterval(function() {
        currentIndex = (currentIndex + 1) % placeholders.length;
        searchInput.classList.add('placeholder-fade');
        setTimeout(function() {
            searchInput.placeholder = placeholders[currentIndex];
            searchInput.classList.remove('placeholder-fade');
        }, 200);
    }, 3000);
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim()) {
            console.log('Searching for:', searchInput.value);
        } else {
            searchInput.focus();
        }
    });
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            console.log('Searching for:', this.value);
        }
    });
}
function initCategoryScroll() {
    const scrollContainer = document.querySelector('.categories-scroll');
    if (!scrollContainer) return;
    let isDown = false;
    let startX;
    let scrollLeft;
    scrollContainer.addEventListener('mousedown', function(e) {
        isDown = true;
        scrollContainer.classList.add('grabbing');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });
    scrollContainer.addEventListener('mouseleave', function() {
        isDown = false;
        scrollContainer.classList.remove('grabbing');
    });
    scrollContainer.addEventListener('mouseup', function() {
        isDown = false;
        scrollContainer.classList.remove('grabbing');
    });
    scrollContainer.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
    const pills = scrollContainer.querySelectorAll('.category-pill');
    pills.forEach(function(pill, index) {
        pill.style.animationDelay = (index * 0.1) + 's';
        pill.classList.add('pill-animate');
    });
}
function initHeroParallax() {
}
function initCategoryFilter() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const productGrids = document.querySelectorAll('.products-grid[data-category]');
    if (!filterPills.length || !productGrids.length) return;
    filterPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            filterPills.forEach(function(p) {
                p.classList.remove('active');
            });
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            productGrids.forEach(function(grid) {
                if (grid.getAttribute('data-category') === category) {
                    grid.style.display = 'flex';
                } else {
                    grid.style.display = 'none';
                }
            });
        });
    });
}
function initHeaderScrollEffect() {
}
function initButtonRipple() {
    const buttons = document.querySelectorAll('.cta-button, .category-pill');
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
}
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}
function initAnnouncementAnimation() {
    const announcement = document.querySelector('.announcement-text');
    if (!announcement) return;
    const text = announcement.textContent;
    announcement.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        if (text[i] === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = text[i];
        }
        span.style.animationDelay = (i * 0.03) + 's';
        span.classList.add('char-animate');
        announcement.appendChild(span);
    }
}
const style = document.createElement('style');
style.textContent = '\
.placeholder-fade {\
    opacity: 0.5;\
    transition: opacity 0.2s ease;\
}\
.search-container.focused .search-input {\
    border-color: var(--color-primary);\
    box-shadow: 0 0 0 3px rgba(28, 103, 88, 0.15);\
}\
.grabbing {\
    cursor: grabbing !important;\
}\
.categories-scroll {\
    cursor: grab;\
}\
.pill-animate {\
    opacity: 0;\
    transform: translateY(10px);\
    animation: pillFadeIn 0.5s ease forwards;\
}\
@keyframes pillFadeIn {\
    to {\
        opacity: 1;\
        transform: translateY(0);\
    }\
}\
.ripple {\
    position: absolute;\
    border-radius: 50%;\
    background: rgba(28, 103, 88, 0.3);\
    transform: scale(0);\
    animation: rippleEffect 0.6s ease-out;\
    pointer-events: none;\
}\
@keyframes rippleEffect {\
    to {\
        transform: scale(4);\
        opacity: 0;\
    }\
}\
.cta-button,\
.category-pill {\
    position: relative;\
    overflow: hidden;\
}\
img[loading="lazy"] {\
    opacity: 0;\
    transition: opacity 0.5s ease;\
}\
img[loading="lazy"].loaded,\
img:not([loading="lazy"]) {\
    opacity: 1;\
}\
.char-animate {\
    display: inline-block;\
    opacity: 0;\
    animation: charFadeIn 0.5s ease forwards;\
}\
@keyframes charFadeIn {\
    to {\
        opacity: 1;\
    }\
}\
.site-header.scrolled {\
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);\
}\
.announcement-bar {\
    transition: transform 0.3s ease, margin-bottom 0.3s ease;\
}\
.hero-image img {\
    will-change: transform;\
}\
.header-icon:active {\
    transform: scale(0.95);\
}\
.nav-link:active {\
    transform: scale(0.98);\
}\
';
document.head.appendChild(style);
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    const heroImages = document.querySelectorAll('.hero-image img');
    heroImages.forEach(function(img) {
        img.classList.add('loaded');
    });
});

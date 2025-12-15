document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.jPushMenuBtn');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMobileMenu() {
        mobileMenu.classList.add('cbp-spmenu-open');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('cbp-spmenu-open');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // --- NEW: Active Link Highlighting (Home Page Scroll Spy) ---
    const navLinks = document.querySelectorAll('.nav-list li a');
    const sections = document.querySelectorAll('section');

    function highlightNavLink() {
        let current = '';
        const scrollY = window.scrollY;

        // Check sections for Home Page
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Adjustment for header height
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            // Home fallback
            if (scrollY < 100) {
                current = 'home';
            }

            navLinks.forEach(link => {
                link.classList.remove('active');
                // Strict check for hash links on home page
                if (link.getAttribute('href').includes('#' + current)) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Run on scroll
    window.addEventListener('scroll', highlightNavLink);
    // Initial check
    highlightNavLink();

    // Highlights 'Products' or 'Contact' based on current page url (non-scroll spy)
    function highlightPageLink() {
        const path = window.location.pathname;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // If we are on a separate page (e.g. products.html), highlight that specific link
            // Avoid flagging 'index.html#products' when we are actually on 'products.html' unless intended.
            // Simplified: If current path ends with the href (e.g. products.html), highlight it.
            if (href && href !== '#' && !href.startsWith('#') && path.endsWith(href)) {
                link.classList.add('active');
            }
        });
    }
    highlightPageLink();
    // -----------------------------------------------------------

    if (menuBtn) {
        menuBtn.addEventListener('click', openMobileMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', closeMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.cbp-spmenu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // FIXED: Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get current header height
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 90;

                // Calculate position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;

                // SPECIAL FIX FOR HOME SECTION: Scroll to top of page
                if (targetId === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                } else {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Product Card Animation on Hover
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });


});

$(document).ready(function () {
    // Initialize main slider with customized arrows
    $('#sample_slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 300,
        nav: true,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        dots: false,
        navContainer: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });

    // Initialize testimonial slider
    $('#testimonial_slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 300,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            }
        }
    });

    // Add animation classes on scroll
    function checkScroll() {
        $('.fade-in-css').each(function () {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
            }
        });
    }

    $(window).scroll(checkScroll);
    checkScroll();

    // Add hover effects for slider arrows
    $('.product-slider-main .owl-nav button').hover(function () {
        $(this).css('transform', 'scale(1.1)');
    }, function () {
        $(this).css('transform', 'scale(1)');
    });
});
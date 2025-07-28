(() => {
    'use strict';

    /**
     * Typewriter effect for cycling through descriptors beneath the
     * hero heading. The function progressively reveals each string
     * character by character, then erases it before moving onto the
     * next phrase.
     */
    function typeWriter(el, phrases, typingSpeed = 100, erasingSpeed = 50, delayBetween = 2000) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            const visibleText = isDeleting
                ? currentPhrase.substring(0, charIndex--)
                : currentPhrase.substring(0, charIndex++);
            el.textContent = visibleText;
            if (!isDeleting && charIndex === currentPhrase.length + 1) {
                isDeleting = true;
                setTimeout(type, delayBetween);
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                charIndex = 0;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
            }
        }
        type();
    }

    /**
     * Mobile navigation toggler. On small viewports the nav menu
     * collapses into a hamburger button. Clicking the button
     * expands or collapses the menu by toggling a class.
     */
    function setupNavToggle() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        // close menu when clicking a link
        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    /**
     * Highlight the navigation link corresponding to the section
     * currently visible in the viewport. This creates a more
     * intuitive navigation experience, especially on long pages.
     */
    function setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const sectionOffsets = [];

        function updateOffsets() {
            sectionOffsets.length = 0;
            sections.forEach(sec => {
                sectionOffsets.push({
                    id: sec.id,
                    top: sec.getBoundingClientRect().top + window.pageYOffset - 80
                });
            });
        }

        function onScroll() {
            const scrollPosition = window.pageYOffset;
            let currentId = null;
            for (let i = 0; i < sectionOffsets.length; i++) {
                const { id, top } = sectionOffsets[i];
                const nextTop = i < sectionOffsets.length - 1 ? sectionOffsets[i + 1].top : Infinity;
                if (scrollPosition >= top && scrollPosition < nextTop) {
                    currentId = id;
                    break;
                }
            }
            navLinks.forEach(link => {
                if (link.getAttribute('href').slice(1) === currentId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        updateOffsets();
        window.addEventListener('resize', updateOffsets);
        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const typedEl = document.getElementById('typed');
        if (typedEl) {
            typeWriter(typedEl, [
                'AI Researcher',
                'Deep Learning Enthusiast',
                'Data Scientist',
                'Problem Solver'
            ]);
        }
        setupNavToggle();
        setupScrollSpy();
    });
})();
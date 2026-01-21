/**
 * ===============================================
 * MAIN JAVASCRIPT - Muhammad Maulana Portfolio
 * ===============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized for Muhammad Maulana');

// ===============================================
    // 1. Dynamic Year & Footer Initialization
    // ===============================================
    const initFooter = () => {
        const yearElements = document.querySelectorAll('.current-year');
        const targetYear = 2026; 

        yearElements.forEach(el => {
            el.textContent = targetYear;
        });

        const footer = document.querySelector('footer');
        if (footer) {
            // Setup Initial State (Hidden)
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(20px)';
            footer.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            const footerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Tampilkan Footer
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        footerObserver.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px' // Mulai animasi sedikit sebelum footer benar-benar terlihat
            });
            
            footerObserver.observe(footer);
        }
    };

    // ===============================================
    // 2. Intersection Observer for Section Animations
    // ===============================================
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in-section');
            fadeInObserver.observe(section);
        });
    };

    // ===============================================
    // 3. Stagger Animation for Cards & Social Icons
    // ===============================================
        const initStaggerAnimations = () => {
        // Hapus 'footer a' agar tidak konflik dengan klik link
        const items = document.querySelectorAll('.project-card, .card-hover'); 
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('stagger-item');
            
            // PAKSA pointer bisa diklik
            item.style.pointerEvents = 'auto';
        });
    };

    // ===============================================
    // 4. Scroll To Top Button
    // ===============================================
    const createScrollToTop = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;
        // Styling via class Tailwind
        scrollBtn.className = 'fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 opacity-0 pointer-events-none z-40';
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.replace('opacity-0', 'opacity-100');
                scrollBtn.classList.remove('pointer-events-none');
            } else {
                scrollBtn.classList.replace('opacity-100', 'opacity-0');
                scrollBtn.classList.add('pointer-events-none');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // ===============================================
    // 5. Toast Notification System
    // ===============================================
    const showToast = (message, duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-24 right-8 bg-gray-800 border border-cyan-500/50 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in-up';
        toast.innerHTML = `<span class="text-cyan-400 mr-2">✓</span> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };
    window.showToast = showToast; // Make it global

    // ===============================================
    // 6. Skill Bars Animation
    // ===============================================
    const initSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-bar');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => { bar.style.width = width; }, 100);
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    };

    // ===============================================
    // 7. Parallax & Security Features
    // ===============================================
    const initExtras = () => {
        // External links security
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.hasAttribute('rel')) link.setAttribute('rel', 'noopener noreferrer');
        });

        // Console Easter Egg
        console.log('%c🔒 Cybersecurity Portfolio - Muhammad Maulana', 'color: #22d3ee; font-size: 16px; font-weight: bold;');
    };

    // ===============================================
    // 8. Infinite Marquee Initialization (Fixed)
    // ===============================================
    const initBrandSlider = () => {
        const track = document.getElementById('marquee-track');
        
        if (track) {
            // Gandakan isi track agar loop berjalan mulus tanpa jeda kosong
            const originalContent = track.innerHTML;
            track.innerHTML = originalContent + originalContent;
            
            console.log('🚀 Brand Slider (Marquee) initialized successfully!');
        } else {
            console.warn('⚠️ Element #marquee-track tidak ditemukan.');
        }
    };

    // Run all initializations
    initFooter();
    initScrollAnimations();
    initStaggerAnimations();
    createScrollToTop();
    initSkillBars();
    initExtras();
    initBrandSlider(); // Menjalankan slider ikon
});
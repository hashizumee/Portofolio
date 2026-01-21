// ===============================================
// SLIDER FUNCTIONALITY - Hero & Certificate Sliders
// ===============================================

// 1. Hero Slider Configuration
const heroSlides = [
    {
        title: "Junior Cyber Security ",
        description: "Protecting digital assets through advanced security protocols and threat analysis.",
        badge: "Cyber security"
    },
    {
        title: "Junior Network Administrator",
        description: "Designing and implementing secure network infrastructures for optimal performance.",
        badge: "Networking"
    },
    {
        title: "Fullstack Enthuasiast",
        description: "Building seamless user experiences and robust server-side architectures.",
        badge: "Developer"
    },
    {
        title: "Security Analyst",
        description: "Monitoring and responding to security incidents to protect organizational assets.",
        badge: "Analysis"
    }
];

let currentHeroSlide = 0;

/**
 * Update Hero Slider Content
 * Memastikan teks tetap rata kiri dan transisi halus
 */
function updateHeroSlide() {
    const heroContent = document.getElementById('hero-content');
    const indicatorsContainer = document.getElementById('slide-indicators');
    const slide = heroSlides[currentHeroSlide];
    
    if (!heroContent) return;

    // Animasi Fade Out & Geser Sedikit
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        // Update Content: Gunakan struktur yang sama dengan HTML awal agar desain konsisten
        // text-left memastikan tidak miring ke kanan
        heroContent.innerHTML = `
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                ${slide.title.replace(' & ', ' & <br>')}
            </h1>
            <p class="text-lg text-gray-400 max-w-lg leading-relaxed">
                ${slide.description}
            </p>
        `;
        
        // Animasi Fade In
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
    
    // Update Indicators (Titik/Garis di bawah slider)
    if (indicatorsContainer) {
        const indicators = indicatorsContainer.querySelectorAll('span');
        indicators.forEach((indicator, index) => {
            if (index === currentHeroSlide) {
                indicator.className = 'h-2 w-8 bg-cyan-400 rounded-full transition-all duration-300';
            } else {
                indicator.className = 'h-2 w-2 bg-gray-600 rounded-full transition-all duration-300';
            }
        });
    }
}

function nextSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    updateHeroSlide();
    resetHeroInterval();
}

function prevSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide();
    resetHeroInterval();
}

// Auto-advance hero slider every 3 seconds (DIUBAH KE 3000)
let heroSliderInterval = setInterval(nextSlide, 3000);

function resetHeroInterval() {
    clearInterval(heroSliderInterval);
    heroSliderInterval = setInterval(nextSlide, 3000); // DIUBAH KE 3000
}

// ===============================================
// 2. Certificate Slider Configuration
// ===============================================
let currentCert = 0;
const totalCerts = 4;

function updateCertSlider() {
    const track = document.getElementById('cert-track');
    const dots = document.querySelectorAll('.cert-dot');
    
    if (track) {
        const offset = -currentCert * 100;
        track.style.transform = `translateX(${offset}%)`;
    }
    
    dots.forEach((dot, index) => {
        if (index === currentCert) {
            dot.className = 'cert-dot h-2 w-8 bg-cyan-400 rounded-full transition-all duration-300 cursor-pointer';
        } else {
            dot.className = 'cert-dot h-2 w-2 bg-gray-600 rounded-full transition-all duration-300 cursor-pointer';
        }
    });
}

function nextCert() {
    currentCert = (currentCert + 1) % totalCerts;
    updateCertSlider();
    resetCertInterval();
}

function prevCert() {
    currentCert = (currentCert - 1 + totalCerts) % totalCerts;
    updateCertSlider();
    resetCertInterval();
}

let certSliderInterval = setInterval(nextCert, 4000);

function resetCertInterval() {
    clearInterval(certSliderInterval);
    certSliderInterval = setInterval(nextCert, 4000);
}

// ===============================================
// 3. Initialization & Animations
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // A. Setup Transisi CSS untuk Hero Content
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        heroContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    }

    // B. Animasi Muncul Nama (Hi, I'm Muhammad Maulana)
    const sapaan = document.querySelector('.sapaan-nama');
    if (sapaan) {
        // State awal
        sapaan.style.opacity = '0';
        sapaan.style.transform = 'translateX(-30px)';
        sapaan.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Triger animasi setelah delay singkat
        setTimeout(() => {
            sapaan.style.opacity = '1';
            sapaan.style.transform = 'translateX(0)';
        }, 300);
    }

    // C. Jalankan Inisialisasi Slider Pertama Kali
    updateHeroSlide();
    if (document.getElementById('cert-track')) {
        updateCertSlider();
    }
});

// Menangani visibilitas halaman (Pause slider jika tab tidak aktif)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(heroSliderInterval);
        clearInterval(certSliderInterval);
    } else {
        heroSliderInterval = setInterval(nextSlide, 3000); // DIUBAH KE 3000
        certSliderInterval = setInterval(nextCert, 4000);
    }
});

// Export fungsi ke window agar bisa dipanggil via onclick di HTML
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.nextCert = nextCert;
window.prevCert = prevCert;
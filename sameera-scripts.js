// JavaScript Document

/*
Sameera AI Portal - Custom Scripts
*/

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        // Randomly assign orange or blue color
        if (Math.random() > 0.5) {
            particle.style.setProperty('--particle-color', '#00B2FF');
            const before = particle.style.getPropertyValue('--particle-color');
            particle.style.background = '#00B2FF';
        }

        particlesContainer.appendChild(particle);
    }
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (currentNav) {
                navItems.forEach(item => item.classList.remove('active'));
                currentNav.classList.add('active');
            }
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});

// Initial active nav update
if (sections.length > 0) {
    updateActiveNav();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Feature tabs functionality
// Feature tabs functionality
const featureContainers = document.querySelectorAll('.features-container');

featureContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-item');
    const panels = container.querySelectorAll('.content-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            // Remove active class from tabs and panels within this container only
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});

// Initialize particles
createParticles();

// Text rotation with character animation
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;
let isAnimating = false;

function wrapTextInSpans(element) {
    const text = element.textContent;
    element.innerHTML = text.split('').map((char, i) =>
        `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
}

function animateTextIn(textSet) {
    const glitchText = textSet.querySelector('.glitch-text');
    const subtitle = textSet.querySelector('.subtitle');

    // Wrap text in spans for animation
    wrapTextInSpans(glitchText);

    // Update data attribute for glitch effect
    glitchText.setAttribute('data-text', glitchText.textContent);

    // Show subtitle after main text
    setTimeout(() => {
        subtitle.classList.add('visible');
    }, 800);
}

function animateTextOut(textSet) {
    const chars = textSet.querySelectorAll('.char');
    const subtitle = textSet.querySelector('.subtitle');

    // Animate characters out
    chars.forEach((char, i) => {
        char.style.animationDelay = `${i * 0.02}s`;
        char.classList.add('out');
    });

    // Hide subtitle
    subtitle.classList.remove('visible');
}

function rotateText() {
    if (isAnimating) return;
    isAnimating = true;

    const currentSet = textSets[currentIndex];
    const nextIndex = (currentIndex + 1) % textSets.length;
    const nextSet = textSets[nextIndex];

    // Animate out current text
    animateTextOut(currentSet);

    // After out animation, switch sets
    setTimeout(() => {
        currentSet.classList.remove('active');
        nextSet.classList.add('active');
        animateTextIn(nextSet);

        currentIndex = nextIndex;
        isAnimating = false;
    }, 600);
}

// Initialize first text set
if (textSets.length > 0) {
    textSets[0].classList.add('active');
    animateTextIn(textSets[0]);

    // Start rotation after initial display
    setTimeout(() => {
        setInterval(rotateText, 5000); // Change every 5 seconds
    }, 4000);
}

// Add random glitch effect
setInterval(() => {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        if (Math.random() > 0.95) {
            text.style.animation = 'none';
            setTimeout(() => {
                text.style.animation = '';
            }, 200);
        }
    });
}, 3000);

// Back to Top button functionality
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Background Music Logic
const musicBtn = document.getElementById('musicToggle');
let isMusicInitialized = false;
let audio = null;

function initMusic() {
    if (isMusicInitialized && audio) return;

    // Determine root path based on where this script is located
    const scripts = document.getElementsByTagName('script');
    let rootPath = '';
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].getAttribute('src');
        if (src && src.includes('sameera-scripts.js')) {
            rootPath = src.replace('sameera-scripts.js', '');
            break;
        }
    }

    audio = new Audio(rootPath + 'music/bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    // Save playback time periodically
    audio.addEventListener('timeupdate', () => {
        if (audio && !audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    });

    isMusicInitialized = true;
}

function updateMusicUI(isPlaying) {
    const btn = document.getElementById('musicToggle');
    if (!btn) return;

    if (isPlaying) {
        btn.classList.add('playing');
        btn.setAttribute('title', 'Stop Music');
    } else {
        btn.classList.remove('playing');
        btn.setAttribute('title', 'Play Music');
    }
}

function playMusic() {
    if (!audio) initMusic();

    // Attempt to set saved time before playing
    const savedTime = localStorage.getItem('musicTime');
    if (savedTime && audio.currentTime === 0) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.play().then(() => {
        updateMusicUI(true);
        removeInteractionListeners();
    }).catch(() => {
        updateMusicUI(false);
    });
}

function toggleMusic() {
    if (!audio) initMusic();

    if (audio.paused) {
        localStorage.setItem('musicEnabled', 'true');
        playMusic();
    } else {
        audio.pause();
        localStorage.setItem('musicEnabled', 'false');
        updateMusicUI(false);
    }
}

function handleInteraction() {
    if (localStorage.getItem('musicEnabled') === 'true') {
        playMusic();
    }
}

function removeInteractionListeners() {
    ['click', 'keydown', 'scroll', 'mousemove', 'touchstart', 'mousedown'].forEach(evt => {
        window.removeEventListener(evt, handleInteraction);
    });
}

// Global initialization and Back-Forward Cache support
window.addEventListener('pageshow', (event) => {
    // If coming from back/forward cache, ensure UI is synced
    if (event.persisted && audio && !audio.paused) {
        updateMusicUI(true);
    }

    if (localStorage.getItem('musicEnabled') === 'true') {
        // Try playing immediately
        playMusic();

        // If blocked, wait for any interaction
        ['click', 'keydown', 'scroll', 'mousemove', 'touchstart', 'mousedown'].forEach(evt => {
            window.addEventListener(evt, handleInteraction, { once: true, passive: true });
        });
    } else {
        updateMusicUI(false);
    }
});

if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMusic();
    });
}

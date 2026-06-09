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

// ══════════════════════════════════════════════════════════
//  Assignment Data — extracted from actual assignment briefs
// ══════════════════════════════════════════════════════════
var ASSIGNMENT_DATA = null;

// Activity Modal Logic
function initActivityModal() {
  const modal = document.getElementById('activityModal');
  if (!modal) return;
  const backdrop   = modal.querySelector('.act-backdrop');
  const closeBtn   = document.getElementById('closeModal');
  const activityList = document.getElementById('activityList');
  const tmpl       = document.getElementById('activityTemplate');

  function refreshModalActBar(cardId, progress, allSubProg) {
    const data = ASSIGNMENT_DATA[cardId] || { activities: [] };
    let totalSubQs = 0;
    let completedSubQs = 0;

    data.activities.forEach(function(actInfo, i) {
      const subqsCount = actInfo.subqs ? actInfo.subqs.length : 0;
      totalSubQs += subqsCount;
      const subProg = allSubProg[i] || [];
      for (let qi = 0; qi < subqsCount; qi++) {
        if (subProg[qi]) {
          completedSubQs++;
        }
      }
    });

    const pct = totalSubQs > 0 ? (completedSubQs / totalSubQs) * 100 : (progress.filter(Boolean).length / 4) * 100;
    document.getElementById('modalActPct').textContent = Math.round(pct) + '% done';
    document.getElementById('modalActBar').style.width = pct.toFixed(1) + '%';
  }

  function openModal(card) {
    const cardId = card.id;

    // ── Header info ──────────────────────────────────
    const iconEl = card.querySelector('.subject-icon');
    const unitEl = card.querySelector('.subject-code');
    const nameEl = card.querySelector('.subject-name');
    document.getElementById('modalIcon').textContent  = iconEl ? iconEl.textContent : '📋';
    document.getElementById('modalUnit').textContent  = unitEl ? unitEl.textContent : '';
    document.getElementById('modalTitle').textContent = (nameEl ? nameEl.textContent : 'Assignment') + ' — Activities';

    // ── Deadline & time elapsed % ─────────────────────
    const deadline = new Date(card.dataset.deadline);
    const start    = new Date(card.dataset.start);
    const now      = Date.now();
    const totalMs  = deadline.getTime() - start.getTime();
    const elapsed  = now - start.getTime();
    const timePct  = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));
    const daysLeft = Math.max(0, Math.floor((deadline.getTime() - now) / 86400000));
    const dlStr    = deadline.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    document.getElementById('modalDeadline').textContent = dlStr + ' (' + daysLeft + ' days left)';
    document.getElementById('modalTimePct').textContent  = timePct.toFixed(1) + '% of time used';
    document.getElementById('modalTimeBar').style.width  = timePct.toFixed(1) + '%';

    // ── Activity & sub-question progress ─────────────
    const progressKey    = 'progress_'    + cardId;
    const subProgressKey = 'subprogress_' + cardId;
    const progress    = JSON.parse(localStorage.getItem(progressKey))    || [false, false, false, false];
    const allSubProg  = JSON.parse(localStorage.getItem(subProgressKey)) || [];

    refreshModalActBar(cardId, progress, allSubProg);

    // ── Build activity rows ───────────────────────────
    activityList.innerHTML = '';
    const data = ASSIGNMENT_DATA[cardId] || { activities: [] };

    progress.forEach(function(done, i) {
      const actInfo   = data.activities[i] || { title: 'Activity ' + (i + 1), subqs: [] };
      const subProg   = allSubProg[i] || actInfo.subqs.map(function() { return false; });

      const clone     = tmpl.content.cloneNode(true);
      const row       = clone.querySelector('.act-row');
      row.querySelector('.activity-title').textContent = actInfo.title;

      const checkbox  = row.querySelector('.activity-checkbox');
      checkbox.checked = done;
      if (done) row.classList.add('act-done');

      // ── Activity-level checkbox handler ───────────
      checkbox.addEventListener('change', function() {
        progress[i] = checkbox.checked;
        row.classList.toggle('act-done', checkbox.checked);

        // Update all sub-questions to match the checked state of the activity
        subProg.fill(checkbox.checked);
        row.querySelectorAll('.subq-checkbox').forEach(function(cb) {
          cb.checked = checkbox.checked;
          cb.closest('li').classList.toggle('subq-done', checkbox.checked);
        });
        saveSubProgress();

        localStorage.setItem(progressKey, JSON.stringify(progress));
        refreshModalActBar(cardId, progress, allSubProg);
        updateCardProgress(cardId);
      });

      // ── Sub-question list ─────────────────────────
      const toggle = row.querySelector('.subq-toggle');
      const subq   = row.querySelector('.subq-text');

      function saveSubProgress() {
        while (allSubProg.length <= i) allSubProg.push([]);
        allSubProg[i] = subProg.slice();
        localStorage.setItem(subProgressKey, JSON.stringify(allSubProg));
      }

      if (actInfo.subqs && actInfo.subqs.length > 0) {
        var ul = document.createElement('ul');
        ul.className = 'subq-list';

        actInfo.subqs.forEach(function(q, qi) {
          var li  = document.createElement('li');
          if (subProg[qi]) li.classList.add('subq-done');

          var lbl = document.createElement('label');
          lbl.className = 'subq-item-label';

          var cb  = document.createElement('input');
          cb.type      = 'checkbox';
          cb.className = 'subq-checkbox';
          cb.checked   = !!subProg[qi];

          var mark = document.createElement('span');
          mark.className = 'subq-checkmark';

          var txt = document.createElement('span');
          txt.className = 'subq-item-text';
          txt.textContent = q;

          lbl.appendChild(cb);
          lbl.appendChild(mark);
          lbl.appendChild(txt);
          li.appendChild(lbl);
          ul.appendChild(li);

          // Sub-question checkbox handler
          cb.addEventListener('change', function() {
            subProg[qi] = cb.checked;
            li.classList.toggle('subq-done', cb.checked);
            saveSubProgress();

            // If ALL sub-questions done → auto-tick activity
            var allDone = subProg.slice(0, actInfo.subqs.length).every(Boolean);
            if (allDone && !checkbox.checked) {
              checkbox.checked = true;
              progress[i] = true;
              row.classList.add('act-done');
              localStorage.setItem(progressKey, JSON.stringify(progress));
            }
            // If one sub-question unticked → auto-untick activity
            else if (!cb.checked && checkbox.checked) {
              checkbox.checked = false;
              progress[i] = false;
              row.classList.remove('act-done');
              localStorage.setItem(progressKey, JSON.stringify(progress));
            }
            
            // Always refresh modal progress and card progress
            refreshModalActBar(cardId, progress, allSubProg);
            updateCardProgress(cardId);
          });
        });

        subq.innerHTML = '';
        subq.appendChild(ul);
      }

      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = !subq.classList.contains('hidden');
        subq.classList.toggle('hidden', isOpen);
        toggle.textContent = isOpen ? '▼ Details' : '▲ Hide';
      });

      activityList.appendChild(clone);
    });

    modal.classList.remove('hidden');
    modal.classList.add('visible');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('visible');
  }

  document.querySelectorAll('.subject-card').forEach(function(card) {
    card.addEventListener('click', function() { openModal(card); });
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
  });
}

function updateCardProgress(cardId) {
  const progressKey = 'progress_' + cardId;
  const subProgressKey = 'subprogress_' + cardId;
  const progress = JSON.parse(localStorage.getItem(progressKey)) || [false, false, false, false];
  const allSubProg = JSON.parse(localStorage.getItem(subProgressKey)) || [];

  const data = ASSIGNMENT_DATA[cardId] || { activities: [] };
  let totalSubQs = 0;
  let completedSubQs = 0;

  data.activities.forEach(function(actInfo, i) {
    const subqsCount = actInfo.subqs ? actInfo.subqs.length : 0;
    totalSubQs += subqsCount;
    const subProg = allSubProg[i] || [];
    for (let qi = 0; qi < subqsCount; qi++) {
      if (subProg[qi]) {
        completedSubQs++;
      }
    }
  });

  const pct = totalSubQs > 0 ? (completedSubQs / totalSubQs) * 100 : (progress.filter(Boolean).length / 4) * 100;
  const completed = progress.filter(Boolean).length;
  const idx = parseInt(cardId.split('-')[1]);

  // ── Linear bar ──────────────────────────────────────
  const progBar  = document.getElementById('prog-' + idx);
  const progText = document.getElementById('prog-text-' + idx);
  if (progBar)  progBar.style.width = pct.toFixed(1) + '%';
  if (progText) progText.textContent = completed + ' / 4 activities completed';

  // ── Circular SVG ring ─────────────────────────────
  const circumference = 2 * Math.PI * 32; // 201.06
  const offset = circumference * (1 - pct / 100);
  const circRing = document.getElementById('circ-' + idx);
  const circText = document.getElementById('circ-text-' + idx);
  if (circRing) circRing.style.strokeDashoffset = offset.toFixed(2);
  if (circText) circText.textContent = Math.round(pct) + '%';

  // ── Status badge ──────────────────────────────────
  const badge = document.getElementById('badge-' + idx);
  if (badge) {
    badge.textContent = completed === 4 ? '✅ All Done' : completed + ' / 4 done';
    badge.className   = 'status-badge ' + (completed === 4 ? 'status-ok' : 'status-warning');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  if (ASSIGNMENT_DATA) {
    initActivityModal();
    if (document.getElementById('activityModal')) {
      document.querySelectorAll('.subject-card').forEach(function(card) {
        updateCardProgress(card.id);
      });
    }
  }
});

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

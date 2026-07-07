/* ==========================================================
   Pannama Elite - Master Animation Hub
   GSAP ScrollTrigger + HTML5 Canvas + Lenis Smooth Scroll
   ========================================================== */

// Forced scroll to top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 2.2, // Increased for a slower, more luxurious feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

/**
 * Universal Image Scale/Cover Function
 */
function scaleImage(img, ctx) {
    if (!img) return;
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio); // Force cover on all devices for cinematic impact
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

// ----------------------------------------------------------
// STAGE 1: HERO ANIMATION (Elegance)
// ----------------------------------------------------------
const canvas1 = document.getElementById('three-canvas');
const context1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight;

const frameCount1 = 93;
const currentFrame1 = index => `./elegance/download_${index.toString().padStart(3, '0')}.jpg`;

const images1 = [];
const imageSeq1 = { frame: 0 };

for (let i = 0; i < frameCount1; i++) {
    const img = new Image();
    img.src = currentFrame1(i);
    images1.push(img);
}

images1[0].onload = render1;

gsap.to(imageSeq1, {
    frame: frameCount1 - 1,
    ease: "none",
    scrollTrigger: {
        scrub: 3.5,
        trigger: "#video-wrapper",
        start: "top top",
        end: "bottom bottom"
    },
    onUpdate: render1
});

function render1() {
    scaleImage(images1[Math.round(imageSeq1.frame)], context1);
}

// ----------------------------------------------------------
// STAGE 2: AMENITIES / GYM (FINAL ANIMATION)
// ----------------------------------------------------------
const canvas2 = document.getElementById('three-canvas-2');
const context2 = canvas2.getContext('2d');
canvas2.width = window.innerWidth;
canvas2.height = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight;

const frameCount2 = 80;
const currentFrame2 = index => `FINAL ANIMATION/Whisk_etz5mmzxmmy1m2mj1im3edoteznhrtlwgdm20cn_${index.toString().padStart(3, '0')}.jpg`;

const images2 = [];
const imageSeq2 = { frame: 0 };

for (let i = 0; i < frameCount2; i++) {
    const img = new Image();
    img.src = currentFrame2(i);
    images2.push(img);
}

images2[0].onload = render2;

gsap.to(imageSeq2, {
    frame: frameCount2 - 1,
    ease: "none",
    scrollTrigger: {
        scrub: 3.5,
        trigger: "#video-wrapper-2",
        start: "top top",
        end: "bottom bottom"
    },
    onUpdate: render2
});

function render2() {
    scaleImage(images2[Math.round(imageSeq2.frame)], context2);
}

// ----------------------------------------------------------
// STAGE 3: GARDEN / SENIOR PARK (Whisk_gdn)
// ----------------------------------------------------------
const canvas3 = document.getElementById('three-canvas-3');
if (canvas3) {
    const context3 = canvas3.getContext('2d');
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight;

    const frameCount3 = 80;
    const currentFrame3 = index => `Whisk_gdn3etzmhtz3ydnw0somftytqtn1qtlmjmny0cz_000/Whisk_gdn3etzmhtz3ydnw0somftytqtn1qtlmjmny0cz_${index.toString().padStart(3, '0')}.jpg`;

    const images3 = [];
    const imageSeq3 = { frame: 0 };

    for (let i = 0; i < frameCount3; i++) {
        const img = new Image();
        img.src = currentFrame3(i);
        images3.push(img);
    }

    images3[0].onload = render3;

    gsap.to(imageSeq3, {
        frame: frameCount3 - 1,
        ease: "none",
        scrollTrigger: {
            scrub: 3.5,
            trigger: "#video-wrapper-3",
            start: "top top",
            end: "bottom bottom"
        },
        onUpdate: render3
    });

    function render3() {
        scaleImage(images3[Math.round(imageSeq3.frame)], context3);
    }
}

// ----------------------------------------------------------
// Mobile Menu Toggle logic
// ----------------------------------------------------------
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const btn = document.querySelector('.mobile-menu-btn i');
    if(window.innerWidth > 1024) return;
    
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        btn.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        btn.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = 'auto';
    }
}

// ----------------------------------------------------------
// Global Resize & Interaction Listeners
// ----------------------------------------------------------
window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 768;
    const vh = isMobile ? window.innerHeight * 0.5 : window.innerHeight;
    [canvas1, canvas2, canvas3].forEach(c => {
        if (!c) return;
        c.width = window.innerWidth;
        c.height = vh;
    });
    render1(); render2(); if(render3) render3();
});

// Scene Activation (Fades & Reveals)
gsap.utils.toArray('.scene').forEach((scene) => {
    ScrollTrigger.create({
        trigger: scene,
        start: "top 70%",
        end: "bottom 30%",
        toggleClass: "active"
    });
});

// Cursor Interactions: Custom Cursor, Magnetic & Tilt Cards
const follower = document.getElementById('cursor-follower');
const dot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 1024) return; // Optimization: Skip interactions on mobile/tablet
    
    // Custom Cursor Movement
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });

    // Global Spotlight Follow
    const spotlight = document.getElementById('custom-spotlight');
    if(spotlight) {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
    }

    // Interactions
    const target = e.target;
    const isInteractive = target.closest('button, a, .tilt-card, input, textarea');
    document.body.classList.toggle('cursor-active', !!isInteractive);

    // Spotlight for Tilt Cards
    document.querySelectorAll('.tilt-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        
        // Tilt Logic
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -6;
        const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 6;
        if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        } else {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
    });

    // Magnetic Buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (dist < 80) {
            btn.style.transform = `translate(${(e.clientX-centerX)*0.35}px, ${(e.clientY-centerY)*0.35}px) scale(1.05)`;
        } else {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        }
    });
});

// Particles
window.addEventListener('load', () => {
    const hero = document.getElementById('scene-hero');
    if (hero) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `width:2px; height:2px; left:${Math.random()*100}%; top:${Math.random()*100}%;`;
            hero.appendChild(p);
            gsap.to(p, {
                x: (Math.random()-0.5)*300, y: (Math.random()-0.5)*300,
                opacity: Math.random()*0.4, duration: Math.random()*15+10,
                repeat:-1, yoyo:true, ease:"sine.inOut"
            });
        }
    }
    setTimeout(() => hero?.classList.add('active'), 500);
});

// Info Modal Logic (Success / Brochure / Legal)
function showInfoModal(type) {
    const config = {
        'success': { icon: 'fa-circle-check', title: 'REQUEST RECEIVED', msg: 'Thank you for your interest in Pannama Elegance. A luxury advisor will connect with you shortly to schedule your private tour.' },
        'brochure': { icon: 'fa-file-pdf', title: 'BROCHURE SECURED', msg: 'The exclusive Pannama Elegance digital brochure is being optimized and will appear in your downloads shortly.' },
        'legal': { icon: 'fa-scale-balanced', title: 'LEGAL NOTICE', msg: 'All designs, renderings and floor plans shown are for representation purposes only. Final specifications are subject to RERA approvals.' }
    };

    const c = config[type];
    document.getElementById('info-icon').className = 'fas ' + c.icon;
    document.getElementById('info-title').innerText = c.title;
    document.getElementById('info-message').innerText = c.msg;

    const modal = document.getElementById('info-modal');
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 500);
}

// Global Form Interceptor
document.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('connect-form')) {
        e.target.reset();
        showInfoModal('success');
    }
});

// Project Data & Modal
const projectData = {
    'paradise': { title: "PANNAMA PARADISE", location: "Chandkheda, Ahmedabad", image: "pannama_paradise_final.jpg", description: "Zenith of high-rise luxury with automated smart ecosystems.", type: "Ultra-Luxury Residential", status: "Finishing", area: "3.2 Acres" },
    'living66': { title: "PANNAMA 66 LIVING", location: "Corporate Road, Prahladnagar", image: "pannama_66_living.jpg", description: "Boutique collection of 66 bespoke connoisseur residences.", type: "Boutique Residential", status: "Ready", area: "1.5 Acres" },
    'prestige': { title: "PANNAMA PRESTIGE", location: "S.G. Highway, Ahmedabad", image: "pannama_prestige.jpg", description: "Mixed-use architectural achievement with high-performance glass walls.", type: "Corporate / Residential", status: "Construction", area: "5.8 Acres" }
};

function exploreProject(id) {
    const data = projectData[id];
    if (!data) return;
    ['title', 'location', 'description', 'type', 'status', 'area'].forEach(k => {
        document.getElementById(`modal-${k}`).innerText = data[k];
    });
    document.getElementById('modal-img').style.backgroundImage = `url('${data.image}')`;
    const modal = document.getElementById('project-modal');
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }, 10);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 500);
}


const portfolioData = [
    {
        id: 1,
        title: 'NEXES Blue',
        description: 'Written arts section in NEXES Organisation. This is where writters meet share creativeness and build beautiful features in words.',
        image: 'images/NB.jpg',
        tech: ['Poems', 'Stories', 'Expressions']
    },
    {
        id: 2,
        title: 'NEXES Green',
        description: 'Visual arts section in NEXES Organisation. This is where artists express creativity through drawing and painting, shaping imagination into vibrant visuals.',
        image: 'images/NG.jpg',
        tech: ['Drawing', 'Painting', 'Sketching']
    },
    {
        id: 3,
        title: 'NEXES Black',
        description: 'Music section in NEXES Organisation. A vibrant hub for musicians, vocalists, and producers to create, perform, and share sound-driven art.',
        image: 'images/NBL.jpg',
        tech: ['Bands', 'Singers', 'Producers']
    },
    {
        id: 4,
        title: 'NEXES Red',
        description: 'Fashion section in NEXES Organisation. A stylish space for designers, models, and fashion lovers to showcase trends, creativity, and identity through clothing.',
        image: 'images/NR.jpg',
        tech: ['Fashion', 'Design', 'Style']
    },
    {
        id: 5,
        title: 'NEXES Brown',
        description: 'Media section in NEXES Organisation. A visual storytelling space for photographers and content creators to capture moments and share them with the world.',
        image: 'images/NBR.jpg',
        tech: ['Photography', 'Media', 'Visuals']
    }
];



// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Start particles at random vertical positions throughout the section
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay for natural movement
        particle.style.animationDelay = Math.random() * 20 + 's';

        // Random animation duration for variety
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    item.innerHTML = `
                <div class="card">
                    <div class="card-number">0${data.id}</div>
                    <div class="card-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
                    <div class="card-tech">${techBadges}</div>
                    <button class="card-cta" onclick="scrollToSection('skills')">Explore</button>
                </div>
            `;

    return item;
}

function initCarousel() {
    // Create carousel items
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        // Calculate relative position
        let offset = index - currentIndex;

        // Wrap around for continuous rotation
        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        // Reset transform
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        // Adjust spacing based on screen size
        let spacing1 = 400;
        let spacing2 = 600;
        let spacing3 = 750;

        if (isMobile) {
            spacing1 = 280;  // Was 400, now 100px closer
            spacing2 = 420;  // Was 600, now 180px closer
            spacing3 = 550;  // Was 750, now 200px closer
        } else if (isTablet) {
            spacing1 = 340;
            spacing2 = 520;
            spacing3 = 650;
        }

        if (absOffset === 0) {
            // Center item
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            // Side items
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            // Further side items
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            // Even further items
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            // Hidden items (behind)
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Define your skills data
const skillsData = [
  {
    name: 'A beautiful misfortune',
    title:'A poem',
    icon: 'images/arare spirit.jpg',
    type: 'text',
    description: `In the middle of terrible darkness
I stood full of hardness
Trying to imagine
but all that came was to destroy
closing my eyes
I appeared under huge trees

In the jungle full of chaos
the sky stormed louder
and the dust was in panic as in a stamped
I cried out to God
Let me talk to thee
and make these oak tree
fall on me

My voice was louder than the storm
as if I was the queen 
that was my fear
the queen of tears
suddenly, I felt light in me
I felt my tears dry
and I smiled

I heard the trees whisper
all they were doing was prosper
the sudden feeling made the chaos
disappear in cries

Then I smiled and thought 
for arts sake
they only say it's fake
but I feel released
at the same time relieved

It's rare
but always there.`,
    level: 'Moira Kenza',
    category: 'NB'
  },
  {
    name: '86 Collection',
    title:'A collection capsule',
    icon: 'images/MDCCCLXXXVI.jpg',
    type: 'gallery',
    level: '1886',
    category: 'NR',
    images: [
        'images/86-1.jpg',
        'images/86-2.jpg',
        'images/86-3.jpg',
        'images/86-4.jpg'

    ],
},


  {
    name: 'Karahanyuze',
    title:'Album',
    icon: 'images/karahanyuze.jpg',
    type: 'image',
    level: 'Yeast band',
    category: 'NBL'
  },
  {
    name: 'Inyambo',
    title:'Painting',
    icon: 'images/Inyambo.jpg',
    type: 'image',
    level: 'Manzi Collins',
    category: 'NG'
  },
  {
    name: 'Bridge Kicukiro',
    title:'A photograph',
    icon: 'images/Bridge kicukiro.jpg',
    type: 'image',
    level: 'Rwigenza Dorcy',
    category: 'NBR'
  },
  {
    name: 'You are the reason',
    title:'Music',
    icon: 'images/you are the reason.jpg',
    type: 'image',
    level: 'Morant-G',
    category: 'NBL'
  },
  {
    name: 'Pardon me parking boy',
    title:'A poem',
    icon: 'images/pardon me.jpg',
    type: 'image',
    level: 'Desange',
    category: 'NB'
  },
  {
    name: 'Home sweet home',
    title:'A photograph',
    icon: 'images/home sweet home.jpg',
    type: 'image',
    level: 'Rwigenza Dorcy',
    category: 'NBR'
  }
];

// Overlay element references
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const overlayIcon = document.getElementById('overlay-icon');
const overlayGallery = document.getElementById('overlay-gallery');
const downloadBtn = document.getElementById('download-btn');
const closeBtn = document.querySelector('.close-btn');
const skillsGrid = document.getElementById('skillsGrid');
const overlayFooterText = document.getElementById('overlay-footer-text');

// Function to display skills
function displaySkills(category = 'all') {
  if (!skillsGrid) {
    console.error("skillsGrid not found in HTML");
    return;
  }

  skillsGrid.innerHTML = "";

  const filteredSkills = category === "all"
    ? skillsData
    : skillsData.filter(skill => skill.category === category);

  filteredSkills.forEach((skill, index) => {
    const hexagon = document.createElement("div");
    hexagon.className = "skill-hexagon";
    hexagon.style.animationDelay = `${index * 0.1}s`;

    hexagon.innerHTML = `
      <div class="hexagon-inner">
        <div class="hexagon-content">
          <img src="${skill.icon}" alt="${skill.name}" class="skill-image" />
          <div class="skill-name-hex">${skill.name}</div>
          <div class="skill-percentage-hex">${skill.level}</div>
        </div>
      </div>
    `;

    // Overlay logic inside click handler
    hexagon.addEventListener("click", () => {
      overlayTitle.textContent = skill.title;
      if (overlayFooterText) {
        overlayFooterText.textContent = `${skill.name} by ${skill.level}`;
      }
      overlayIcon.style.display = "none";
      overlayText.innerHTML = "";
      overlayGallery.innerHTML = "";
      downloadBtn.style.display = "none";

      if (skill.type === "image") {
        overlayIcon.src = skill.icon;
        overlayIcon.alt = skill.name;
        overlayIcon.style.display = "block";
        downloadBtn.style.display = "block";
      } else if (skill.type === "text") {
        overlayText.innerText = skill.description || skill.level;
        downloadBtn.style.display = "block";
      } else if (skill.type === "gallery") {
        if (Array.isArray(skill.images) && skill.images.length > 0) {
          skill.images.forEach(imgUrl => {
            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = skill.name;
            overlayGallery.appendChild(img);
          });
          downloadBtn.style.display = "block";
        } else {
          overlayText.textContent = "No images available for this gallery.";
        }
      }

      overlay.classList.add('show');
      const skillsSection = document.getElementById('skills');
      if (skillsSection) skillsSection.classList.add('blur');
      document.body.classList.add('noscroll');
    });

    skillsGrid.appendChild(hexagon);
  });
}

// Initialize grid
function initSkillsGrid() {
  const categoryTabs = document.querySelectorAll('.category-tab');

  displaySkills('all');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      displaySkills(tab.dataset.category);
    });
  });
}
// Handle download button click
downloadBtn.addEventListener('click', () => {
  // Simple alert message
  alert("Download is not available now. keep an eye on our socials, you will be informed when available .");
});

// Close overlay
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('show');
  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsSection.classList.remove('blur');
  document.body.classList.remove('noscroll');
});

// Run init
document.addEventListener('DOMContentLoaded', initSkillsGrid);


// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Auto-rotate carousel
setInterval(nextSlide, 5000);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Initialize on load
initCarousel();
initSkillsGrid();
initParticles();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Update active navigation on scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                if (!number.classList.contains('animated')) {
                    number.classList.add('animated');
                    animateCounter(number);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message
    alert(`Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`);

    // Reset form
    contactForm.reset();
});

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

});


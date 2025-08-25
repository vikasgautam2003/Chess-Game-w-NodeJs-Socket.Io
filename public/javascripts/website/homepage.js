window.onload = () => {

  

  // --- 1. Handle Preloader ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Start the fade-out transition
    preloader.style.opacity = '0';
    
    // After the fade-out, hide it completely so it can't be interacted with
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500); // This should match the transition duration
  }

  // --- 2. Initialize All Page Logic AFTER the page is loaded ---
  // All the code that was previously in DOMContentLoaded now runs here.
  
  // Element Selectors
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const authModal = document.getElementById('authModal');
  const body = document.body;
  const header = document.getElementById('main-header');
  let lastScrollY = window.scrollY;

  // Mobile Sidebar Logic
  const toggleSidebar = (isOpen) => {
    if (mobileSidebar && sidebarOverlay && body) {
      mobileSidebar.classList.toggle('-translate-x-full', !isOpen);
      sidebarOverlay.classList.toggle('hidden', !isOpen);
      body.classList.toggle('menu-open', isOpen);
    }
  };

  if (mobileMenuButton) mobileMenuButton.addEventListener('click', () => toggleSidebar(true));
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleSidebar(false));
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

  // Auth Modal Logic
  window.toggleModal = (isOpen) => {
    if (authModal) {
      authModal.classList.toggle('hidden', !isOpen);
      authModal.classList.toggle('flex', isOpen);
    }
  };

  // Smooth Scrolling for Anchor Links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  for (const link of scrollLinks) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (mobileSidebar && !mobileSidebar.classList.contains('-translate-x-full')) {
          toggleSidebar(false);
        }
      }
    });
  }

  // Auto-Hiding Navbar on Scroll Logic
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.innerWidth < 1024) {
        if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
          header.classList.add('-translate-y-full');
        } else {
          header.classList.remove('-translate-y-full');
        }
        lastScrollY = window.scrollY;
      } else {
        header.classList.remove('-translate-y-full');
      }
    });
  }
  
  // --- 3. Initialize GSAP Animations LAST ---
  // This ensures the animations only start on a fully visible and ready page.
  const heroText = document.getElementById('hero-text');
  if (heroText && typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
    
    const myText = new SplitType('#hero-text', { types: 'words, chars' });
    const chars = myText.chars;

    const gradientChars = document.querySelectorAll('.gradient-text .char');
    gradientChars.forEach(char => {
        char.classList.add('bg-gradient-to-r', 'from-violet-500', 'to-blue-500', 'text-transparent', 'bg-clip-text');
    });

    gsap.from(chars, {
        filter: 'blur(10px)',
        stagger: 0.03,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    const mouseRadius = 60;
    const distance = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);

    const setupChars = () => {
        chars.forEach(char => {
            const bounds = char.getBoundingClientRect();
            char.x = bounds.left + (bounds.width / 2);
            char.y = bounds.top + (bounds.height / 2);
            char.quickX = gsap.quickTo(char, "x", { duration: 0.5, ease: "power3" });
            char.quickY = gsap.quickTo(char, "y", { duration: 0.5, ease: "power3" });
            char.quickRot = gsap.quickTo(char, "rotation", { duration: 0.5, ease: "power3" });
        });
    };

    setupChars();
    window.addEventListener('resize', setupChars);

    window.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        chars.forEach(char => {
            const dist = distance(clientX, clientY, char.x, char.y);
            if (dist < mouseRadius) {
                const angle = Math.atan2(clientY - char.y, clientX - char.x);
                const force = 1 - (dist / mouseRadius);
                const pushX = -Math.cos(angle) * force * 35;
                const pushY = -Math.sin(angle) * force * 35;
                const rot = -force * 20;

                char.quickX(pushX);
                char.quickY(pushY);
                char.quickRot(rot);
            } else {
                char.quickX(0);
                char.quickY(0);
                char.quickRot(0);
            }
        });
    });
  }
};


document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-8");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
});
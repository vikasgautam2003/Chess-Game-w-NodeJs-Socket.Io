// // document.addEventListener('DOMContentLoaded', () => {
// //   const mobileMenuButton = document.getElementById('mobileMenuButton');
// //   const mobileMenuClose = document.getElementById('mobileMenuClose');
// //   const mobileSidebar = document.getElementById('mobileSidebar');
// //   const sidebarOverlay = document.getElementById('sidebarOverlay');
// //   const authModal = document.getElementById('authModal');
// //   const body = document.body;
// //   const header = document.getElementById('main-header');
// //   let lastScrollY = window.scrollY;

// //   // --- Mobile Sidebar Logic ---
// //   const toggleSidebar = (isOpen) => {
// //     mobileSidebar.classList.toggle('-translate-x-full', !isOpen);
// //     sidebarOverlay.classList.toggle('hidden', !isOpen);
// //     body.classList.toggle('menu-open', isOpen);
// //   };

// //   if(mobileMenuButton) mobileMenuButton.addEventListener('click', () => toggleSidebar(true));
// //   if(mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleSidebar(false));
// //   if(sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
  
// //   // --- Auth Modal Logic ---
// //   window.toggleModal = (isOpen) => {
// //     authModal.classList.toggle('hidden', !isOpen);
// //     authModal.classList.toggle('flex', isOpen);
// //   };
  
// //   // --- Auto-Hiding Navbar on Scroll Logic ---
// //   window.addEventListener('scroll', () => {
// //     // We only want this behavior on smaller screens (less than 768px)
// //     if (window.innerWidth < 768) {
// //       if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
// //         // Scrolling Down
// //         header.classList.add('-translate-y-full');
// //       } else {
// //         // Scrolling Up
// //         header.classList.remove('-translate-y-full');
// //       }
// //       lastScrollY = window.scrollY;
// //     } else {
// //       // On larger screens, always ensure the header is visible
// //       header.classList.remove('-translate-y-full');
// //     }
// //   });
// // });


// document.addEventListener('DOMContentLoaded', () => {
//   const mobileMenuButton = document.getElementById('mobileMenuButton');
//   const mobileMenuClose = document.getElementById('mobileMenuClose');
//   const mobileSidebar = document.getElementById('mobileSidebar');
//   const sidebarOverlay = document.getElementById('sidebarOverlay');
//   const authModal = document.getElementById('authModal');
//   const body = document.body;
//   const header = document.getElementById('main-header');
//   let lastScrollY = window.scrollY;

//   // --- Mobile Sidebar Logic ---
//   const toggleSidebar = (isOpen) => {
//     mobileSidebar.classList.toggle('-translate-x-full', !isOpen);
//     sidebarOverlay.classList.toggle('hidden', !isOpen);
//     body.classList.toggle('menu-open', isOpen);
//   };

//   if (mobileMenuButton) mobileMenuButton.addEventListener('click', () => toggleSidebar(true));
//   if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleSidebar(false));
//   if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

//   // --- Auth Modal Logic ---
//   window.toggleModal = (isOpen) => {
//     authModal.classList.toggle('hidden', !isOpen);
//     authModal.classList.toggle('flex', isOpen);
//   };

//   // --- Smooth Scrolling for Anchor Links (INTEGRATED) ---
//   const scrollLinks = document.querySelectorAll('a[href^="#"]');

//   for (const link of scrollLinks) {
//     link.addEventListener('click', function(e) {
//       // Prevent the default instant jump
//       e.preventDefault();

//       const targetId = this.getAttribute('href');
//       const targetElement = document.querySelector(targetId);

//       if (targetElement) {
//         // Smoothly scroll to the target element
//         targetElement.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start'
//         });

//         // If on mobile, close the sidebar after clicking a link
//         if (!mobileSidebar.classList.contains('-translate-x-full')) {
//           toggleSidebar(false);
//         }
//       }
//     });
//   }

//   // --- Auto-Hiding Navbar on Scroll Logic ---
//   window.addEventListener('scroll', () => {
//     // We only want this behavior on smaller screens (less than 1024px to match the CSS)
//     if (window.innerWidth < 1024) {
//       if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
//         // Scrolling Down
//         header.classList.add('-translate-y-full');
//       } else {
//         // Scrolling Up
//         header.classList.remove('-translate-y-full');
//       }
//       lastScrollY = window.scrollY;
//     } else {
//       // On larger screens, always ensure the header is visible
//       header.classList.remove('-translate-y-full');
//     }
//   });
// });


document.addEventListener('DOMContentLoaded', () => {

  // --- Element Selectors ---
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const authModal = document.getElementById('authModal');
  const body = document.body;
  const header = document.getElementById('main-header');
  let lastScrollY = window.scrollY;

  // --- Mobile Sidebar Logic ---
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

  // --- Auth Modal Logic ---
  window.toggleModal = (isOpen) => {
    if (authModal) {
      authModal.classList.toggle('hidden', !isOpen);
      authModal.classList.toggle('flex', isOpen);
    }
  };

  // --- Smooth Scrolling for Anchor Links ---
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
        // Close mobile sidebar after clicking a link
        if (mobileSidebar && !mobileSidebar.classList.contains('-translate-x-full')) {
          toggleSidebar(false);
        }
      }
    });
  }

  // --- Auto-Hiding Navbar on Scroll Logic ---
  if (header) {
    window.addEventListener('scroll', () => {
      // Use 1024px to match Tailwind's 'lg' breakpoint
      if (window.innerWidth < 1024) {
        if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
          header.classList.add('-translate-y-full'); // Scroll Down
        } else {
          header.classList.remove('-translate-y-full'); // Scroll Up
        }
        lastScrollY = window.scrollY;
      } else {
        header.classList.remove('-translate-y-full'); // Always visible on large screens
      }
    });
  }
  
  // --- GSAP Hero Text Animation ---
  const heroText = document.getElementById('hero-text');
  if (heroText && typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
    
    // 1. Split the text into characters
    const myText = new SplitType('#hero-text', { types: 'words, chars' });
    const chars = myText.chars;

    // 2. Fix Gradient Text Issue
    // Apply Tailwind gradient classes to each character inside the .gradient-text span
    const gradientChars = document.querySelectorAll('.gradient-text .char');
    gradientChars.forEach(char => {
        char.classList.add(
            'bg-gradient-to-r',
            'from-violet-500',
            'to-blue-500',
            'text-transparent',
            'bg-clip-text'
        );
    });

    // 3. Initial Reveal Animation
    gsap.from(chars, {
        filter: 'blur(10px)',
        stagger: 0.09,
        opacity: 0,
        duration: 3,
        ease: 'power2.out'
    });

    // 4. Interactive Force Field Effect
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
});

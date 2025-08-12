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

//   if(mobileMenuButton) mobileMenuButton.addEventListener('click', () => toggleSidebar(true));
//   if(mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleSidebar(false));
//   if(sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
  
//   // --- Auth Modal Logic ---
//   window.toggleModal = (isOpen) => {
//     authModal.classList.toggle('hidden', !isOpen);
//     authModal.classList.toggle('flex', isOpen);
//   };
  
//   // --- Auto-Hiding Navbar on Scroll Logic ---
//   window.addEventListener('scroll', () => {
//     // We only want this behavior on smaller screens (less than 768px)
//     if (window.innerWidth < 768) {
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
    mobileSidebar.classList.toggle('-translate-x-full', !isOpen);
    sidebarOverlay.classList.toggle('hidden', !isOpen);
    body.classList.toggle('menu-open', isOpen);
  };

  if (mobileMenuButton) mobileMenuButton.addEventListener('click', () => toggleSidebar(true));
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleSidebar(false));
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

  // --- Auth Modal Logic ---
  window.toggleModal = (isOpen) => {
    authModal.classList.toggle('hidden', !isOpen);
    authModal.classList.toggle('flex', isOpen);
  };

  // --- Smooth Scrolling for Anchor Links (INTEGRATED) ---
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  for (const link of scrollLinks) {
    link.addEventListener('click', function(e) {
      // Prevent the default instant jump
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Smoothly scroll to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // If on mobile, close the sidebar after clicking a link
        if (!mobileSidebar.classList.contains('-translate-x-full')) {
          toggleSidebar(false);
        }
      }
    });
  }

  // --- Auto-Hiding Navbar on Scroll Logic ---
  window.addEventListener('scroll', () => {
    // We only want this behavior on smaller screens (less than 1024px to match the CSS)
    if (window.innerWidth < 1024) {
      if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
        // Scrolling Down
        header.classList.add('-translate-y-full');
      } else {
        // Scrolling Up
        header.classList.remove('-translate-y-full');
      }
      lastScrollY = window.scrollY;
    } else {
      // On larger screens, always ensure the header is visible
      header.classList.remove('-translate-y-full');
    }
  });
});
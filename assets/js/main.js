(function () {
  "use strict";

  /**
   * Scroll toggle class
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn?.addEventListener('click', mobileNavToogle);

  /**
   * Hide nav on same-page hash click
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle dropdowns in mobile nav
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * AOS init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Skills progress bar animation
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * PureCounter
   */
  new PureCounter();

  /**
   * Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * GLightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
    openEffect: 'zoom',
    closeButton: true,
    loop: true,
    touchNavigation: true,
    zoomable: true
  });

  /**
   * Isotope layout
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  /**
   * Dynamic portfolio rendering
   */
  const portfolioContainer = document.querySelector('#portfolioContainer');
  if (portfolioContainer) {
   const portfolioData = [
  { title: "Poster Design 1", category: "poster", image: "assets/img/posters/poster (1).jpg", description: "Bold and creative visual communication.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 2", category: "poster", image: "assets/img/posters/poster (2).png", description: "Modern layout for an upcoming event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 3", category: "poster", image: "assets/img/posters/poster (3).png", description: "Eye-catching promotional artwork.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 4", category: "poster", image: "assets/img/posters/poster (4).png", description: "Minimal and effective event poster.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 5", category: "poster", image: "assets/img/posters/poster (5).png", description: "Striking design with bold colors.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 6", category: "poster", image: "assets/img/posters/poster (6).png", description: "Vintage aesthetic with modern typography.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 7", category: "poster", image: "assets/img/posters/poster (7).png", description: "Elegant style for a brand launch.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 8", category: "poster", image: "assets/img/posters/poster (8).png", description: "Dynamic layout for social media promotion.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 9", category: "poster", image: "assets/img/posters/poster (9).png", description: "Bold fonts with an energetic vibe.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 10", category: "poster", image: "assets/img/posters/poster (10).png", description: "Event invitation with elegant visuals.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 11", category: "poster", image: "assets/img/posters/poster (11).png", description: "Abstract art merged with clean layout.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 12", category: "poster", image: "assets/img/posters/poster (12).png", description: "Bold poster for a music event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 13", category: "poster", image: "assets/img/posters/poster (13).png", description: "Illustrated concept for a campaign.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 14", category: "poster", image: "assets/img/posters/poster (14).png", description: "Geometric patterns for a clean look.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 15", category: "poster", image: "assets/img/posters/poster (15).png", description: "Futuristic style for tech-themed events.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 16", category: "poster", image: "assets/img/posters/poster (16).png", description: "Fashion brand teaser poster.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 17", category: "poster", image: "assets/img/posters/poster (17).png", description: "Festival theme with traditional elements.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 18", category: "poster", image: "assets/img/posters/poster (18).png", description: "Luxury design with elegant serif typography.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 19", category: "poster", image: "assets/img/posters/poster (19).png", description: "Promotional flyer with urban design.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 20", category: "poster", image: "assets/img/posters/poster (20).png", description: "Illustrated characters with playful layout.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 21", category: "poster", image: "assets/img/posters/poster (21).png", description: "Minimalistic design for art exhibition.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 22", category: "poster", image: "assets/img/posters/poster (22).png", description: "High-contrast layout for bold messaging.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 23", category: "poster", image: "assets/img/posters/poster (23).jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { 
  title: "Thumbnail Design 1", 
  category: "thumbnail", 
  image: "assets/img/thumbnails/thumb (1).jpg", 
  description: "Eye-catching thumbnail design with bold typography.", 
  detailsPage: "portfolio-details.html" 
},
{ 
  title: "Thumbnail Design 2", 
  category: "thumbnail", 
  image: "assets/img/thumbnails/thumb (2).jpg", 
  description: "Clean layout crafted for YouTube content preview.", 
  detailsPage: "portfolio-details.html" 
},
{ 
  title: "Thumbnail Design 3", 
  category: "thumbnail", 
  image: "assets/img/thumbnails/thumb (3).jpg", 
  description: "High-contrast design to grab user attention instantly.", 
  detailsPage: "portfolio-details.html" 
},
  { title: "Carousel Slide 1", category: "carousels", image: "assets/img/carousels/carousel (1).png", description: "Instagram carousel for promotions.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 2", category: "carousels", image: "assets/img/carousels/carousel (2).png", description: "Engaging carousel for product showcase.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 3", category: "carousels", image: "assets/img/carousels/carousel (3).png", description: "Swipe-friendly design for mobile audiences.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 4", category: "carousels", image: "assets/img/carousels/carousel (4).png", description: "Informative slide layout for services.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 5", category: "carousels", image: "assets/img/carousels/carousel (5).png", description: "Designed for storytelling on social platforms.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 6", category: "carousels", image: "assets/img/carousels/carousel (6).png", description: "Interactive and modern carousel for events.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 7", category: "carousels", image: "assets/img/carousels/carousel (7).png", description: "Minimalist design with smooth transitions.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 8", category: "carousels", image: "assets/img/carousels/carousel (8).png", description: "Designed for user engagement and retention.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 9", category: "carousels", image: "assets/img/carousels/carousel (9).png", description: "Clean and attractive carousel layout.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 10", category: "carousels", image: "assets/img/carousels/carousel (10).png", description: "Bold text and visuals for quick scanning.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 11", category: "carousels", image: "assets/img/carousels/carousel (11).png", description: "Professional layout for portfolio highlights.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 12", category: "carousels", image: "assets/img/carousels/carousel (12).png", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 13", category: "carousels", image: "assets/img/carousels/carousel (13).png", description: "Animated-style design for eye-catching visuals.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 14", category: "carousels", image: "assets/img/carousels/carousel (14).png", description: "Structured layout ideal for business promos.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 1", category: "logos", image: "assets/img/logos/logo (1).png", description: "Minimalist branding logo.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 2", category: "logos", image: "assets/img/logos/logo (2).png", description: "Modern logo with abstract elements.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 3", category: "logos", image: "assets/img/logos/logo (3).png", description: "Flat design logo for startups.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 4", category: "logos", image: "assets/img/logos/logo (4).png", description: "Typography-based logo with strong identity.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 5", category: "logos", image: "assets/img/logos/logo (5).png", description: "Professional logo for tech brands.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 6", category: "logos", image: "assets/img/logos/logo (6).png", description: "Creative emblem logo design.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 7", category: "logos", image: "assets/img/logos/logo (7).png", description: "Clean and timeless logo style.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 8", category: "logos", image: "assets/img/logos/logo (8).png", description: "Bold design suitable for apps.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 9", category: "logos", image: "assets/img/logos/logo (9).png", description: "Geometric shapes and symmetry.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 10", category: "logos", image: "assets/img/logos/logo (10).png", description: "Luxury-style branding mark.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 11", category: "logos", image: "assets/img/logos/logo (11).png", description: "Youthful and vibrant logo identity.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 12", category: "logos", image: "assets/img/logos/logo (12).jpg", description: "Versatile logo for both print and digital.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 1", category: "package", image: "assets/img/packages/package (1).png", description: "Modern product packaging mockup.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 2", category: "package", image: "assets/img/packages/package (2).png", description: "Clean and elegant box design.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 3", category: "package", image: "assets/img/packages/package (3).png", description: "Creative label and branding package.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 4", category: "package", image: "assets/img/packages/package (4).jpg", description: "Eco-friendly packaging concept.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 5", category: "package", image: "assets/img/packages/package (5).jpg", description: "Premium product box layout.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 1", category: "pamplet", image: "assets/img/pamplets/pamplet (1).jpg", description: "Informative layout for product promotion.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 2", category: "pamplet", image: "assets/img/pamplets/pamplet (2).jpg", description: "Clean and minimal business pamplet.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 3", category: "pamplet", image: "assets/img/pamplets/pamplet (3).png", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 1", category: "invitation", image: "assets/img/pamplets/pamplet (4).png", description: "Corporate-themed layout with icons.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 2", category: "invitation", image: "assets/img/pamplets/pamplet (5).png", description: "Eye-catching real estate pamplet.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 3", category: "invitation", image: "assets/img/pamplets/pamplet (6).png", description: "Bold typography with elegant visuals.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 1", category: "cards", image: "assets/img/cards/card (1).png", description: "Elegant business card with modern layout.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 2", category: "cards", image: "assets/img/cards/card (3).png", description: "Minimalist black and white card.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 3", category: "cards", image: "assets/img/cards/card (2).png", description: "Creative design suitable for freelancers.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 4", category: "cards", image: "assets/img/cards/card (4).png", description: "Vibrant card with colorful branding.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 5", category: "cards", image: "assets/img/cards/card (5).jpg", description: "Professional card for corporate identity.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 6", category: "cards", image: "assets/img/cards/card (6).jpg", description: "Unique vertical layout for standout impression.", detailsPage: "portfolio-details.html" }
];


portfolioData.forEach(item => {
  const isLogo = item.category === 'logos';
  const styles = [
    isLogo ? 'background-color: #04273d' : '',
  ].filter(Boolean).join('; ');

  const html = `
    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}">
      <img src="${item.image}" class="img-fluid" alt="${item.title}" style="${styles}">
      <div class="portfolio-info">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <a href="${item.image}" title="${item.title}" data-gallery="portfolio-gallery" class="glightbox preview-link">
          <i class="bi bi-zoom-in"></i>
        </a>
      </div>
    </div>`;
    
  portfolioContainer.insertAdjacentHTML('beforeend', html);
});


    // Init Isotope after images load
    imagesLoaded(portfolioContainer, function () {
      const iso = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry'
      });

      document.querySelectorAll('.portfolio-filters li').forEach(btn => {
        btn.addEventListener('click', function () {
          document.querySelector('.portfolio-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({ filter: this.getAttribute('data-filter') });
          aosInit();
        });
      });
    });

    GLightbox({ selector: '.glightbox' });
  }

})();

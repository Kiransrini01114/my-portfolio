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
  { title: "Poster Design 1", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759501/poster_1_qx5frz.jpg", description: "Bold and creative visual communication.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 2", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759505/poster_2_ogfj48.png", description: "Modern layout for an upcoming event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 3", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759507/poster_3_mqxqku.png", description: "Eye-catching promotional artwork.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 4", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759510/poster_4_cw1rj0.png", description: "Minimal and effective event poster.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 5", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759514/poster_5_gdznji.png", description: "Striking design with bold colors.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 6", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759516/poster_6_kmqdxf.png", description: "Vintage aesthetic with modern typography.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 7", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759519/poster_7_qz6epk.png", description: "Elegant style for a brand launch.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 8", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759522/poster_8_jayj1y.png", description: "Dynamic layout for social media promotion.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 9", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759526/poster_9_pg8akt.png", description: "Bold fonts with an energetic vibe.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 10", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759529/poster_10_ckgb1q.png", description: "Event invitation with elegant visuals.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 11", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759532/poster_11_hdgmzj.png", description: "Abstract art merged with clean layout.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 12", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759535/poster_12_ly5kos.png", description: "Bold poster for a music event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 13", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759538/poster_13_v3iewq.png", description: "Illustrated concept for a campaign.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 14", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759541/poster_14_muiu33.png", description: "Geometric patterns for a clean look.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 15", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759545/poster_15_hcnz1c.png", description: "Futuristic style for tech-themed events.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 16", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759548/poster_16_n8zifr.png", description: "Fashion brand teaser poster.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 17", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759551/poster_17_osiqsj.png", description: "Festival theme with traditional elements.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 18", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759554/poster_18_i8rjgs.png", description: "Luxury design with elegant serif typography.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 19", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759557/poster_19_qnzgs2.png", description: "Promotional flyer with urban design.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 20", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759560/poster_20_g2ursx.png", description: "Illustrated characters with playful layout.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 21", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759563/poster_21_hn1tof.png", description: "Minimalistic design for art exhibition.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 22", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759566/poster_22_lmrfdj.png", description: "High-contrast layout for bold messaging.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 23", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759569/poster_23_wnxfet.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { 
  title: "Thumbnail Design 1", 
  category: "thumbnail", 
  image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759398/thumb_1_sv89nu.jpg", 
  description: "Eye-catching thumbnail design with bold typography.", 
  detailsPage: "portfolio-details.html" 
},
{ 
  title: "Thumbnail Design 2", 
  category: "thumbnail", 
  image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759399/thumb_2_cvveuo.jpg", 
  description: "Clean layout crafted for YouTube content preview.", 
  detailsPage: "portfolio-details.html" 
},
{ 
  title: "Thumbnail Design 3", 
  category: "thumbnail", 
  image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759399/thumb_3_zafeor.jpg", 
  description: "High-contrast design to grab user attention instantly.", 
  detailsPage: "portfolio-details.html" 
},
  { title: "Carousel Slide 1", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758596/carousel_10_jv9hnd.png", description: "Instagram carousel for promotions.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 2", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758597/carousel_11_dfq4rn.png", description: "Engaging carousel for product showcase.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 3", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758599/carousel_12_hosx0b.png", description: "Swipe-friendly design for mobile audiences.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 4", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758601/carousel_13_djltmm.png", description: "Informative slide layout for services.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 5", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758594/carousel_9_olnekd.png", description: "Designed for storytelling on social platforms.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 6", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758593/carousel_8_uxvxrg.png", description: "Interactive and modern carousel for events.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 7", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758582/carousel_2_o9mogj.png", description: "Minimalist design with smooth transitions.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 8", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758584/carousel_3_g3fu2v.png", description: "Designed for user engagement and retention.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 9", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758585/carousel_4_bgtosj.png", description: "Clean and attractive carousel layout.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 10", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758587/carousel_5_vz8xuw.png", description: "Bold text and visuals for quick scanning.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 11", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758589/carousel_6_lmqtm2.png", description: "Professional layout for portfolio highlights.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 12", category: "carousels", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758590/carousel_7_xpov6p.png", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 1", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751041/logo_6_t25z2h.png", description: "Minimalist branding logo.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 2", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751040/logo_4_lidkdx.png", description: "Modern logo with abstract elements.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 3", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751040/logo_5_ghdomz.png", description: "Flat design logo for startups.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 4", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751038/logo_2_vt320n.png", description: "Typography-based logo with strong identity.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 5", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751038/logo_1_cuy5kr.png", description: "Professional logo for tech brands.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 6", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751047/logo_11_it7wbg.png", description: "Creative emblem logo design.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 7", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751046/logo_12_bxx1mz.jpg", description: "Clean and timeless logo style.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 8", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751045/logo_10_tmlmdn.png", description: "Bold design suitable for apps.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 9", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751043/logo_9_uytak8.png", description: "Geometric shapes and symmetry.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 10", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751042/logo_8_m0aita.png", description: "Luxury-style branding mark.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 1", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758960/package_1_h83zw2.png", description: "Modern product packaging mockup.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 2", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758960/package_2_zbpgwg.jpg", description: "Clean and elegant box design.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 3", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758963/package_3_paytvi.png", description: "Creative label and branding package.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 4", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758962/package_4_yv95sm.jpg", description: "Eco-friendly packaging concept.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 5", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758964/package_5_gxariv.jpg", description: "Premium product box layout.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 1", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759139/pamplet_1_p4owgi.jpg", description: "Informative layout for product promotion.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 2", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759141/pamplet_2_xhfbg5.jpg", description: "Clean and minimal business pamplet.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 3", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759144/pamplet_3_s0m5zz.png", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 1", category: "invitation", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759249/pamplet_4_ww383w.png", description: "Corporate-themed layout with icons.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 2", category: "invitation", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759251/pamplet_5_vx4us2.png", description: "Eye-catching real estate pamplet.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 3", category: "invitation", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759254/pamplet_6_j0tklc.png", description: "Bold typography with elegant visuals.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 1", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750912/card_1_zq02uj.png", description: "Elegant business card with modern layout.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 2", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758426/card_3_dago9v.png", description: "Minimalist black and white card.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 3", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750911/card_2_md6ckp.png", description: "Creative design suitable for freelancers.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 4", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750912/card_4_jxpchh.png", description: "Vibrant card with colorful branding.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 5", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750908/card_5_tudr7m.jpg", description: "Professional card for corporate identity.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 6", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750908/card_6_xzphzs.jpg", description: "Unique vertical layout for standout impression.", detailsPage: "portfolio-details.html" }
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

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
   * Portfolio with infinite scroll
   */
  const portfolioContainer = document.querySelector('#portfolioContainer');
  const itemsPerPage = 5;
  let currentCategory = 'poster';
  let currentPage = 1;

  // Your portfolioData (as defined in your original code)
  const portfolioData = [
 
  { title: "Poster Design 15", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759563/poster_21_hn1tof.png", description: "Futuristic style for tech-themed events.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 15", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759566/poster_22_lmrfdj.png", description: "Futuristic style for tech-themed events.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 6", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759516/poster_6_kmqdxf.png", description: "Vintage aesthetic with modern typography.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 15", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759545/poster_15_hcnz1c.png", description: "Futuristic style for tech-themed events.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 3", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759507/poster_3_mqxqku.png", description: "Eye-catching promotional artwork.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 15", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759519/poster_7_qz6epk.png", description: "Futuristic style for tech-themed events.", detailsPage: "portfolio-details.html" },
 
  { title: "Poster Design 25", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170572/WhatsApp_Image_2025-12-31_at_10.43.52_gbnffe.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 26", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170571/WhatsApp_Image_2025-12-31_at_10.43.51_oormwy.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 27", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170571/WhatsApp_Image_2025-12-31_at_10.43.52_1_jfhdh3.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  

   
  { title: "Poster Design 4", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759510/poster_4_cw1rj0.png", description: "Minimal and effective event poster.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 8", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759522/poster_8_jayj1y.png", description: "Dynamic layout for social media promotion.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 29", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767176924/WhatsApp_Image_2025-12-31_at_15.53.02_cror1t.jpg", description: "Dynamic layout for social media promotion.", detailsPage: "portfolio-details.html" },

  { title: "Poster Design 1", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759501/poster_1_qx5frz.jpg", description: "Bold and creative visual communication.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 23", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759569/poster_23_wnxfet.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 28", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767176837/WhatsApp_Image_2025-12-31_at_15.52.01_1_mxbnns.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  
 
  
  { title: "Poster Design 11", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759532/poster_11_hdgmzj.png", description: "Abstract art merged with clean layout.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 18", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759554/poster_18_i8rjgs.png", description: "Luxury design with elegant serif typography.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 19", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759557/poster_19_qnzgs2.png", description: "Promotional flyer with urban design.", detailsPage: "portfolio-details.html" },

  { title: "Poster Design 24", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759551/poster_17_osiqsj.png", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 24", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170572/WhatsApp_Image_2025-12-31_at_10.40.28_xh9yrm.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 24", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767177754/WhatsApp_Image_2025-12-31_at_16.10.22_wb63bl.jpg", description: "Elegant visuals for a corporate event.", detailsPage: "portfolio-details.html" },

  

  { title: "Poster Design 2", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759505/poster_2_ogfj48.png", description: "Modern layout for an upcoming event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 5", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759514/poster_5_gdznji.png", description: "Striking design with bold colors.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 20", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759560/poster_20_g2ursx.png", description: "Illustrated characters with playful layout.", detailsPage: "portfolio-details.html" },
  
  
  
  { title: "Poster Design 12", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759535/poster_12_ly5kos.png", description: "Bold poster for a music event.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 14", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759541/poster_14_muiu33.png", description: "Geometric patterns for a clean look.", detailsPage: "portfolio-details.html" },
  { title: "Poster Design 16", category: "poster", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759548/poster_16_n8zifr.png", description: "Fashion brand teaser poster.", detailsPage: "portfolio-details.html" },
  
  
  
  { title: "Carousel Slide 1", category: "carousels", subCategory:"1", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758596/carousel_10_jv9hnd.png", description: "Instagram carousel for promotions.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 2", category: "carousels", subCategory:"1", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758597/carousel_11_dfq4rn.png", description: "Engaging carousel for product showcase.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 3", category: "carousels", subCategory:"1", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758599/carousel_12_hosx0b.png", description: "Swipe-friendly design for mobile audiences.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 4", category: "carousels", subCategory:"1", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758601/carousel_13_djltmm.png", description: "Informative slide layout for services.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 5", category: "carousels", subCategory:"1", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758594/carousel_9_olnekd.png", description: "Designed for storytelling on social platforms.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 6", category: "carousels", subCategory:"2", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758593/carousel_8_uxvxrg.png", description: "Interactive and modern carousel for events.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 7", category: "carousels", subCategory:"2",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758582/carousel_2_o9mogj.png", description: "Minimalist design with smooth transitions.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 8", category: "carousels", subCategory:"2",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758584/carousel_3_g3fu2v.png", description: "Designed for user engagement and retention.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 9", category: "carousels", subCategory:"2",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758585/carousel_4_bgtosj.png", description: "Clean and attractive carousel layout.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 10", category: "carousels", subCategory:"2",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758587/carousel_5_vz8xuw.png", description: "Bold text and visuals for quick scanning.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 11", category: "carousels", subCategory:"2",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758589/carousel_6_lmqtm2.png", description: "Professional layout for portfolio highlights.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 12", category: "carousels", subCategory:"2",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758590/carousel_7_xpov6p.png", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 13", category: "carousels", subCategory:"3",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767171726/WhatsApp_Image_2025-12-31_at_11.17.40_lavusg.jpg", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 14", category: "carousels", subCategory:"3",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767171723/WhatsApp_Image_2025-12-31_at_11.17.40_1_hnqx9s.jpg", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 15", category: "carousels", subCategory:"3",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767171722/WhatsApp_Image_2025-12-31_at_11.17.40_2_cg7zbz.jpg", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  { title: "Carousel Slide 16", category: "carousels", subCategory:"3",image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767171721/WhatsApp_Image_2025-12-31_at_11.17.40_3_nzqcto.jpg", description: "Perfect for educational or tutorial posts.", detailsPage: "portfolio-details.html" },
  
  
  { title: "Logo Design 8", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751045/logo_10_tmlmdn.png", description: "Bold design suitable for apps.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 2", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751040/logo_4_lidkdx.png", description: "Modern logo with abstract elements.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 1", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767180199/WhatsApp_Image_2025-12-31_at_16.52.42_nxlii7.jpg", description: "Minimalist branding logo.", detailsPage: "portfolio-details.html" },
  
  { title: "Logo Design 1", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751041/logo_6_t25z2h.png", description: "Minimalist branding logo.", detailsPage: "portfolio-details.html" },
 
  { title: "Logo Design 3", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751040/logo_5_ghdomz.png", description: "Flat design logo for startups.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 4", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751038/logo_2_vt320n.png", description: "Typography-based logo with strong identity.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 5", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751038/logo_1_cuy5kr.png", description: "Professional logo for tech brands.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 6", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751047/logo_11_it7wbg.png", description: "Creative emblem logo design.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 7", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751046/logo_12_bxx1mz.jpg", description: "Clean and timeless logo style.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 9", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751043/logo_9_uytak8.png", description: "Geometric shapes and symmetry.", detailsPage: "portfolio-details.html" },
  { title: "Logo Design 10", category: "logos", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756751042/logo_8_m0aita.png", description: "Luxury-style branding mark.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 1", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758960/package_1_h83zw2.png", description: "Modern product packaging mockup.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 2", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758960/package_2_zbpgwg.jpg", description: "Clean and elegant box design.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 3", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758963/package_3_paytvi.png", description: "Creative label and branding package.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 4", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758962/package_4_yv95sm.jpg", description: "Eco-friendly packaging concept.", detailsPage: "portfolio-details.html" },
  { title: "Package Design 5", category: "package", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758964/package_5_gxariv.jpg", description: "Premium product box layout.", detailsPage: "portfolio-details.html" },
  
  { title: "Pamplet Design 7", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169940/WhatsApp_Image_2025-12-31_at_11.23.02_i9qlpa.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 6", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169941/WhatsApp_Image_2025-12-31_at_11.23.02_1_eljyxk.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 5", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169941/WhatsApp_Image_2025-12-31_at_11.05.36_ey4clq.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 1", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759144/pamplet_3_s0m5zz.png", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 2", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169942/WhatsApp_Image_2025-12-31_at_11.04.19_m4gwv6.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 4", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169941/WhatsApp_Image_2025-12-31_at_11.04.41_zfu5qz.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 8", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767178930/WhatsApp_Image_2025-12-31_at_11.15.27_g2fsec.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 8", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169941/WhatsApp_Image_2025-12-31_at_11.21.37_jxhsfb.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 3", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170479/WhatsApp_Image_2025-12-31_at_10.40.07_pqrejx.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Pamplet Design 3", category: "pamplet", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767169941/WhatsApp_Image_2025-12-31_at_11.05.17_pbdffc.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },



  
  { title: "Brouchre Design 1", category: "brouchre", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170914/WhatsApp_Image_2025-12-31_at_11.23.33_ldz9nn.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Brouchre Design 2", category: "brouchre", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170913/WhatsApp_Image_2025-12-31_at_11.23.33_1_sswnch.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Brouchre Design 3", category: "brouchre", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170916/WhatsApp_Image_2025-12-31_at_11.23.33_2_uvzfzz.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  
  { title: "Brouchre Design 5", category: "brouchre", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170804/WhatsApp_Image_2025-12-31_at_11.15.48_1_vqcdtk.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
  { title: "Brouchre Design 6", category: "brouchre", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1767170799/WhatsApp_Image_2025-12-31_at_11.15.48_ob9ufm.jpg", description: "Vibrant pamplet for marketing campaigns.", detailsPage: "portfolio-details.html" },
 
  { title: "Invitation Design 1", category: "invitation", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759249/pamplet_4_ww383w.png", description: "Corporate-themed layout with icons.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 2", category: "invitation", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759251/pamplet_5_vx4us2.png", description: "Eye-catching real estate pamplet.", detailsPage: "portfolio-details.html" },
  { title: "Invitation Design 3", category: "invitation", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756759254/pamplet_6_j0tklc.png", description: "Bold typography with elegant visuals.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 1", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750912/card_1_zq02uj.png", description: "Elegant business card with modern layout.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 2", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756758426/card_3_dago9v.png", description: "Minimalist black and white card.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 3", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750911/card_2_md6ckp.png", description: "Creative design suitable for freelancers.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 4", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750912/card_4_jxpchh.png", description: "Vibrant card with colorful branding.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 5", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750908/card_5_tudr7m.jpg", description: "Professional card for corporate identity.", detailsPage: "portfolio-details.html" },
  { title: "Card Design 6", category: "cards", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756750908/card_6_xzphzs.jpg", description: "Unique vertical layout for standout impression.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 1", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767238/data_sz_opfxkp.webp", description: "Elegant business card with modern layout.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 2", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767234/google_board_ubgrxq.webp", description: "Minimalist black and white card.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 3", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767231/aws_m6krpb.webp", description: "Creative design suitable for freelancers.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 4", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767227/DATA_SCIENCE_hwz7gl.webp", description: "Vibrant card with colorful branding.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 5", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767223/ai_2_d0qg8r.webp", description: "Professional card for corporate identity.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 6", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767219/AWSSSS_pldz6d.webp", description: "Unique vertical layout for standout impression.", detailsPage: "portfolio-details.html" },
  { title: "Banner Design 7", category: "banners", image: "https://res.cloudinary.com/dojy6fceq/image/upload/v1756767218/chat_gpt_qr0vx9.webp", description: "Unique vertical layout for standout impression.", detailsPage: "portfolio-details.html" },
  { title: "video 1", category: "videos", image: "https://res.cloudinary.com/dojy6fceq/video/upload/v1756765852/Softlogic_aupxas.mp4", description: "Video related social media content", detailsPage: "portfolio-details.html" },
  { title: "video 2", category: "videos", image: "https://res.cloudinary.com/dojy6fceq/video/upload/v1756765856/Behind_every_successful_student_there_s_a_dedicated_trainer_SLAInstitute_Support_StudentExperience_Education_SuccessJourney_bestinstitute_softlogicsystems_slainstitute_softlogicchennai_slatraining_java_qysfsb.mp4", description: "Video related social media content", detailsPage: "portfolio-details.html" },
  { title: "video 3", category: "videos", image: "https://res.cloudinary.com/dojy6fceq/video/upload/v1756765850/Spelling_mistakes_on_a_resume_can_have_detrimental_effects_on_your_job_prospects._It_is_important_to_acknowledge_the_negative_impact_they_can_have_and_take_necessary_steps_to_avoid_them.Firstly_spelling_mistakes_c_pr7bnm.mp4", description: "Video related social media content", detailsPage: "portfolio-details.html" },
  { title: "video 4", category: "videos", image: "https://res.cloudinary.com/dojy6fceq/video/upload/v1756765847/Y_Abhasa_1_nw4k6l.mp4", description: "Video related social media content", detailsPage: "portfolio-details.html" },
];
 function renderPortfolio(category = '*', page = 1) {
  if (page === 1) portfolioContainer.innerHTML = '';

  let filteredData = category === '*' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === category);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

let logoIndex = 0; 

paginatedData.forEach(item => {
  // Skip carousel items
  if (item.category === 'carousels') return;

  const isVideo = item.category === 'videos';
  const isLogo = item.category === 'logos';

  let styles = '';

  if (isLogo) {
    const bgColor = logoIndex % 2 === 0 ? '#202020' : '#d8d8d8';
    styles = `background-color: ${bgColor};`;
    logoIndex++; // ✅ increment ONLY for logos
  }

  let mediaElement = isVideo
    ? `<video class="img-fluid" style="${styles}" controls muted>
         <source src="${item.image}" type="video/mp4">
         Your browser does not support the video tag.
       </video>`
    : `<img loading="lazy" src="${item.image}" class="img-fluid" alt="${item.title}" style="${styles}">`;

  const html = `
    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}">
      ${mediaElement}
      <div class="portfolio-info">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <a href="${item.image}" 
           title="${item.title}" 
           data-gallery="portfolio-gallery" 
           class="glightbox preview-link" 
           ${isVideo ? 'data-type="video"' : ''}>
          <i class="bi bi-zoom-in"></i>
        </a>
      </div>
    </div>
  `;

  portfolioContainer.insertAdjacentHTML('beforeend', html);
});


  // Re-init Isotope & GLightbox
  imagesLoaded(portfolioContainer, function () {
    const iso = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'masonry'
    });
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true, autoplayVideos: true });
  });
}


  // Initial load
  renderPortfolio(currentCategory, currentPage);

  // Category filter click
  document.querySelectorAll('.portfolio-filters li').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelector('.portfolio-filters .filter-active')?.classList.remove('filter-active');
      this.classList.add('filter-active');
      currentCategory = this.getAttribute('data-filter') === '*' ? '*' : this.getAttribute('data-filter').replace('.filter-', '');
      currentPage = 1;
      renderPortfolio(currentCategory, currentPage);
      renderCarouselItems(currentCategory);
    });
  });

  // Infinite scroll: load next set automatically
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition + 100 >= pageHeight) {
      const filteredData = currentCategory === '*' ? portfolioData : portfolioData.filter(item => item.category === currentCategory);
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      if (currentPage < totalPages) {
        currentPage++;
        renderPortfolio(currentCategory, currentPage);
      }
    }
  });

  /**
   * Render carousel items grouped by subCategory
   */
/**
 * Render carousel items grouped by subCategory
 */
function renderCarouselItems(currentCategory) {
  // Only render if the active category is 'carousels'
  console.log("Current Category",currentCategory)
  if (currentCategory !== 'carousels') {
    const existingSection = document.querySelector('.carousel-section');
    if (existingSection) {
      existingSection.style.display = 'none'; // hide if exists
    }
    return;
  }

  // Filter carousel items
  const carouselData = portfolioData.filter(item => item.category === 'carousels');

  // Find or create the carousel section
  let carouselSection = document.querySelector('.carousel-section');
  if (!carouselSection) {
    carouselSection = document.createElement('section');
    carouselSection.classList.add('carousel-section', 'my-5');
    document.body.appendChild(carouselSection);
  }

  if (carouselData.length === 0) {
    carouselSection.style.display = 'none';
    carouselSection.innerHTML = '';
    return;
  }

  // Show section if there are carousel items
  carouselSection.style.display = '';
  carouselSection.innerHTML = ''; // Clear previous content

  // Group items by subCategory
  const grouped = {};
  carouselData.forEach(item => {
    if (!grouped[item.subCategory]) grouped[item.subCategory] = [];
    grouped[item.subCategory].push(item);
  });

  // Render each subCategory as a separate carousel
  Object.keys(grouped).forEach(subCat => {
   const slides = grouped[subCat].map(item => `
  <div class="swiper-slide">
    <a 
      href="${item.image}" 
      class="glightbox preview-link" 
      data-gallery="carousel-gallery-${subCat}"
      title="${item.title}"
    >
      <img 
        loading="lazy" 
        src="${item.image}" 
        class="img-fluid" 
        alt="${item.title}"
      >
    </a>
  </div>
`).join('');


    const carouselHTML = `
      <div class="swiper init-swiper-carousel-${subCat}">
        <div class="swiper-wrapper">
          ${slides}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
    `;

    carouselSection.insertAdjacentHTML('beforeend', carouselHTML);

    // Initialize Swiper
    new Swiper(`.init-swiper-carousel-${subCat}`, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: `.init-swiper-carousel-${subCat} .swiper-button-next`,
        prevEl: `.init-swiper-carousel-${subCat} .swiper-button-prev`,
      },
      pagination: {
        el: `.init-swiper-carousel-${subCat} .swiper-pagination`,
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });
}


// Call the function after portfolioData is loaded
renderCarouselItems(currentCategory);


})();

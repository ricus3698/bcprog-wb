const swiperConfigs = {
    slider1: {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      effect: 'slide',
      pagination: {
        clickable: true
      }
    },
    /*
    slider2: {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      effect: 'fade',
      pagination: {
        clickable: true
      }
    }
      */
  };

  const swipers = {};

  document.querySelectorAll('[data-swiper-id]').forEach((container) => {
    const swiperId = container.dataset.swiperId;
    const swiperEl = container.querySelector('.swiper');
    const paginationEl = swiperEl.querySelector('.swiper-pagination');
    const toggleBtn = paginationEl.querySelector('.autoplay-toggle-btn');
    const icon = toggleBtn.querySelector('i');

    const config = swiperConfigs[swiperId] || {};
    config.keyboard = { enabled: true, onlyInViewport: true };
    config.pagination = {
      ...config.pagination,
      el: paginationEl
    };

    const swiper = new Swiper(swiperEl, config);
    swipers[swiperId] = swiper;

    toggleBtn.addEventListener('click', () => {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        toggleBtn.setAttribute('aria-label', '슬라이드 재생');
        toggleBtn.setAttribute('aria-pressed', 'false');
        icon.classList.replace('xi-pause', 'xi-play');
      } else {
        swiper.autoplay.start();
        toggleBtn.setAttribute('aria-label', '슬라이드 정지');
        toggleBtn.setAttribute('aria-pressed', 'true');
        icon.classList.replace('xi-play', 'xi-pause');
      }
    });

    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBtn.click();
      }
    });
  });

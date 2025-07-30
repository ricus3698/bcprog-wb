// ✅ 모듈화된 접근성 대응 Swiper 클래스
class AccessibleSwiper {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.paginationEl = this.container.querySelector('.main-custom-pagination');
    this.playPauseButton = null;
    this.isPaused = false;

    this.swiper = new Swiper(selector, {
      loop: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: this.paginationEl,
        clickable: true,
        type: 'custom',
        renderCustom: (swiper, current, total) => {
          let bulletsHtml = '';
          for (let i = 0; i < total; i++) {
            const activeClass = i === swiper.realIndex ? 'swiper-pagination-bullet-active' : '';
            bulletsHtml += `<span class="swiper-pagination-bullet ${activeClass}" 
                                 tabindex="0" 
                                 role="button" 
                                 aria-label="${i + 1}번째 슬라이드로 이동"></span>`;
          }
          return `<div class="swiper-pagination-bullets" role="tablist">
                    ${bulletsHtml}
                  </div>
                  <button class="swiper-button-play-pause" aria-live="polite" aria-label="슬라이드쇼 정지">정지</button>`;
        }
      },

      on: {
        init: swiper => {
          this.initAccessibility(swiper);
        },
        slideChange: swiper => {
          this.updateSlideAria(swiper);
        }
      }
    });

    // 외부 focus 접근 시 자동 정지 및 슬라이드 focus 이동
    this.container.addEventListener('focusin', (e) => {
      if (this.swiper.autoplay.running) {
        this.toggleAutoplay(false);
        const currentSlide = this.swiper.slides[this.swiper.realIndex];
        if (!currentSlide.contains(e.relatedTarget)) {
          currentSlide.focus();
        }
      }
    });

    // 이벤트 바인딩은 init 이후 DOM이 완성된 다음 실행해야 함
    setTimeout(() => this.bindUIEvents(), 0);
  }

  bindUIEvents() {
    if (!this.paginationEl) return;

    this.playPauseButton = this.paginationEl.querySelector('.swiper-button-play-pause');
    if (this.playPauseButton) {
      this.playPauseButton.addEventListener('click', () => {
        this.toggleAutoplay(this.isPaused);
      });
    }

    this.paginationEl.addEventListener('click', e => {
      if (e.target.classList.contains('swiper-pagination-bullet')) {
        e.target.focus();
      }
    });

    this.paginationEl.addEventListener('keydown', e => {
      if (e.target.classList.contains('swiper-pagination-bullet') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const index = Array.from(e.target.parentNode.children).indexOf(e.target);
        this.swiper.slideToLoop(index);
      }
    });

    this.container.addEventListener('keydown', e => {
      if (e.target.classList.contains('swiper-slide')) {
        if (e.key === 'ArrowRight') {
          this.swiper.slideNext();
          e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
          this.swiper.slidePrev();
          e.preventDefault();
        }
        this.swiper.slides[this.swiper.realIndex].focus();
      }
    });
  }

  toggleAutoplay(shouldStart) {
    if (shouldStart) {
      this.swiper.autoplay.start();
      this.isPaused = false;
      if (this.playPauseButton) {
        this.playPauseButton.textContent = '정지';
        this.playPauseButton.setAttribute('aria-label', '슬라이드쇼 정지');
      }
    } else {
      this.swiper.autoplay.stop();
      this.isPaused = true;
      if (this.playPauseButton) {
        this.playPauseButton.textContent = '재생';
        this.playPauseButton.setAttribute('aria-label', '슬라이드쇼 재생');
      }
    }
  }

  initAccessibility(swiper) {
    swiper.slides.forEach((slide, index) => {
      slide.setAttribute('tabindex', '0');
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${swiper.slides.length}`);
    });
    this.updateSlideAria(swiper);
  }

  updateSlideAria(swiper) {
    swiper.slides.forEach((slide, index) => {
      if (index === swiper.realIndex) {
        slide.setAttribute('aria-current', 'true');
      } else {
        slide.removeAttribute('aria-current');
      }
    });
  }
}


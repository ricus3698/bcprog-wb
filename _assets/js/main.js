
const swiper = new Swiper('.mySwiper', {
    loop: true,
    pagination: {
        el: '.main-custom-pagination',
        clickable: true,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
        let bulletsHtml = '';
        for (let i = 0; i < total; i++) {
            const activeClass = i === swiper.realIndex ? 'swiper-pagination-bullet-active' : '';
            
            bulletsHtml += `<span class="swiper-pagination-bullet ${activeClass}" 
                                    tabindex="0" 
                                    role="button" 
                                    aria-label="Go to slide ${i + 1}"></span>`;
        }
        return `<div class="swiper-pagination-bullets" role="tablist">
                    ${bulletsHtml}
                </div>
                <div class="swiper-pagination-fraction" role="status" aria-live="polite">
                    <span class="swiper-pagination-current">${current}</span> / <span class="swiper-pagination-total">${total}</span>
                </div>
                
                <button class="swiper-button-play-pause" aria-live="polite" aria-label="슬라이드쇼 재생 또는 정지">정지</button>`;
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    
    on: {
        init: function () {
        this.slides.forEach((slide, index) => {
            slide.setAttribute('tabindex', '0');
            slide.setAttribute('role', 'group'); 
            slide.setAttribute('aria-roledescription', 'slide'); 
            slide.setAttribute('aria-label', `${index + 1} of ${this.slides.length}`); // 스크린 리더용 레이블
        });
        },
        
        slideChange: function () {
        this.slides.forEach((slide, index) => {
            const isActive = this.realIndex === index;
            
            if (isActive) {
            slide.setAttribute('aria-current', 'true');
            } else {
            slide.removeAttribute('aria-current');
            }
        });
        
        }
    }
    });

    
    let isAutoplayPaused = false;
    document.querySelector('.main-custom-pagination').addEventListener('click', function(e) {
    if (e.target.classList.contains('swiper-button-play-pause')) {
        const playPauseButton = e.target;
        if (isAutoplayPaused) {
        swiper.autoplay.start();
        playPauseButton.textContent = '정지';
        playPauseButton.setAttribute('aria-label', '슬라이드쇼 정지');
        isAutoplayPaused = false;
        } else {
        swiper.autoplay.stop();
        playPauseButton.textContent = '재생';
        playPauseButton.setAttribute('aria-label', '슬라이드쇼 재생');
        isAutoplayPaused = true;
        }
    } else if (e.target.classList.contains('swiper-pagination-bullet')) {
        
        e.target.focus();
    }
    });

    // 키보드로 불릿 접근 시 (Enter/Spacebar) 슬라이드 이동
    document.querySelector('.main-custom-pagination').addEventListener('keydown', function(e) {
    if (e.target.classList.contains('swiper-pagination-bullet') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault(); 
        e.target.click();
    }
    });

    
    document.querySelector('.mySwiper').addEventListener('keydown', function(e) {
    if (e.target.classList.contains('swiper-slide')) {
        if (e.key === 'ArrowRight') {
        swiper.slideNext();
        e.preventDefault(); 
        } else if (e.key === 'ArrowLeft') {
        swiper.slidePrev();
        e.preventDefault(); 
        }
        
        swiper.slides[swiper.realIndex].focus();
    }
});


const movieSlide = new Swiper(".movie-slide-wrap .swiper", {
    slidesPerView: 1.9,
    spaceBetween: 0,

    loop: true,

    navigation: {
        prevEl: ".movie-slide-wrap .movie-prev-btn",
        nextEl: ".movie-slide-wrap .movie-next-btn",
    },

    pagination: {
        el: ".movie-slide-wrap .movie-btn",
        clickable: true,
    },
    });


    document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const movieSlideWrap = document.querySelector('.movie-slide-wrap');
    const movieSchArea = document.querySelector('.movie_sch_area');
    const tabItems = document.querySelectorAll('.tab-item');

    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
        // 탭 활성화 표시
        tabItems.forEach(item => item.classList.remove('on'));
        tabItems[index].classList.add('on');

        // 콘텐츠 표시 전환
        if (index === 0) {
            movieSlideWrap.style.display = 'block';
            movieSchArea.style.display = 'none';
        } else {
            movieSlideWrap.style.display = 'none';
            movieSchArea.style.display = 'block';
        }
        });
    });

    // 초기 상태 설정
    movieSlideWrap.style.display = 'block';
    movieSchArea.style.display = 'none';
    });
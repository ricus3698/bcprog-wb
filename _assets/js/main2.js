document.addEventListener('DOMContentLoaded', function () {

    // 1. 첫 번째 Swiper (.mv-swiper) 초기화
    const swiper = new Swiper('.mv-swiper', {
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
                    slide.setAttribute('aria-label', `${index + 1} of ${this.slides.length}`);
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

    // 1-1. 첫 번째 Swiper 재생/정지 및 접근성 관련 이벤트 핸들러
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

    document.querySelector('.main-custom-pagination').addEventListener('keydown', function(e) {
        if (e.target.classList.contains('swiper-pagination-bullet') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            const index = Array.from(e.target.parentNode.children).indexOf(e.target);
            swiper.slideToLoop(index); // loop 모드일 경우 slideToLoop 사용
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

    // ---

    // 2. 두 번째 Swiper (.movie-slide-wrap) 초기화
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
        touchStartPreventDefault: false, // ← 추가
        touchReleaseOnEdges: true,       // ← 추가
    });

    // ---

    // 3. 탭 메뉴 기능 구현
    const tabButtons = document.querySelectorAll('.tab-btn');
    const movieSlideWrap = document.querySelector('.movie-slide-wrap');
    const movieSchArea = document.querySelector('.movie_sch_area');
    const tabItems = document.querySelectorAll('.tab-item');

    // 초기 상태 설정
    if (movieSlideWrap) movieSlideWrap.style.display = 'block';
    if (movieSchArea) movieSchArea.style.display = 'none';

    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // 탭 활성화 표시
            tabItems.forEach(item => item.classList.remove('on'));
            tabItems[index].classList.add('on');

            // 콘텐츠 표시 전환
            if (index === 0) {
                if (movieSlideWrap) movieSlideWrap.style.display = 'block';
                if (movieSchArea) movieSchArea.style.display = 'none';
            } else {
                if (movieSlideWrap) movieSlideWrap.style.display = 'none';
                if (movieSchArea) movieSchArea.style.display = 'block';
            }
        });
    });


    const lecSlideSwiper = new Swiper(".lec-swiper", { // lec-slide-wrap .swiper 대신 .lec-swiper로 변경했습니다.
        slidesPerView: 1.1,
        spaceBetween: 0,
        loop: false,
        navigation: {
            prevEl: ".lec-slide-wrap .lec-prev-btn", 
            nextEl: ".lec-slide-wrap .lec-next-btn", 
        },
    });

    const tabLinks = document.querySelectorAll('.main-lecture .tab-list a');
    const lecSlides = document.querySelectorAll('.lec-swiper .lec-slide');

    function hideAllSlides() {
        lecSlides.forEach(slide => {
            slide.style.display = 'none';
        });
    }

    // 특정 상태의 슬라이드를 보여주는 함수
    function showSlidesByStatus(status) {
        hideAllSlides(); 
        if (status === 'all') {
            lecSlides.forEach(slide => {
                slide.style.display = 'block';
            });
        } else {
            const targetSlides = document.querySelectorAll(`.lec-swiper .lec-slide.status-${status}`);
            targetSlides.forEach(slide => {
                slide.style.display = 'block';
            });
        }
        lecSlideSwiper.update();
        lecSlideSwiper.slideTo(0);
    }

    // 탭 클릭 이벤트 리스너 추가
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            tabLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            const tabStatus = this.dataset.tab; // 클릭한 탭의 data-tab 값 가져오기
            showSlidesByStatus(tabStatus); // 해당 상태의 슬라이드 보여주기
        });
    });

    // 페이지 로드 시 '전체' 탭이 기본으로 선택되고 모든 슬라이드가 보이도록 설정
    document.addEventListener('DOMContentLoaded', () => {
        const allTab = document.querySelector('.main-lecture .tab-list a[data-tab="all"]');
        if (allTab) {
            allTab.parentElement.classList.add('active');
        }
        showSlidesByStatus('all');
    });

});
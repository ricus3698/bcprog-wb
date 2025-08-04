document.addEventListener('DOMContentLoaded', function () {

    // 1. 첫 번째 Swiper (.mv-swiper) 초기화
    const swiper = new Swiper('.mv-swiper', {
        loop: false,
        pagination: {
            el: '.main-custom-pagination',
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                let bulletsHtml = '';
                for (let i = 0; i < total; i++) {
                    const activeClass = i === swiper.realIndex ? 'swiper-pagination-bullet-active' : '';
                    bulletsHtml += `<button class="swiper-pagination-bullet ${activeClass}" 
                                          tabindex="0" 
                                          role="button" 
                                          aria-label="Go to slide ${i + 1}"></button>`;
                }
                return `<div class="swiper-pagination-bullets" role="tablist">
                            ${bulletsHtml}
                        </div>
                        <button class="swiper-button-play-pause" aria-live="polite" aria-label="슬라이드쇼 재생 또는 정지"><i class="xi-pause"></i></button>`;
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
        const playPauseButton = e.target.closest('.swiper-button-play-pause'); // 부모 중에 버튼이 있는지 확인
        if (playPauseButton) {
            if (isAutoplayPaused) {
                swiper.autoplay.start();
                playPauseButton.innerHTML = '<i class="xi-pause"></i>';
                playPauseButton.setAttribute('aria-label', '슬라이드쇼 정지');
                isAutoplayPaused = false;
            } else {
                swiper.autoplay.stop();
                playPauseButton.innerHTML = '<i class="xi-play"></i>';
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
    /*
    const movieSlide = new Swiper(".movie-slide-wrap .swiper", {
        slidesPerView: 5,
        spaceBetween: 0,
        loop: false,
        centeredSlides:true,
        navigation: {
            prevEl: ".movie-slide-wrap .movie-prev-btn",
            nextEl: ".movie-slide-wrap .movie-next-btn",
        },
        touchStartPreventDefault: false, // ← 추가
        touchReleaseOnEdges: true,       // ← 추가
    });
    */
    const movieSlide = new Swiper(".movie-slide-wrap .swiper", {
        loop: false,
        initialSlide: 0,
        spaceBetween: 20,
        navigation: {
            prevEl: ".movie-slide-wrap .movie-prev-btn",
            nextEl: ".movie-slide-wrap .movie-next-btn",
        },
        touchStartPreventDefault: false,
        touchReleaseOnEdges: true,
        breakpoints: {
            0: {
                slidesPerView: 1.4,
                centeredSlides: true,
            },
            560: {
                slidesPerView: 2,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 30,
            },
            1280: {
                slidesPerView: 6,
            }
        },
        on: {
            resize: function () {
                this.slideTo(0, 0); // 리사이즈 시 항상 첫 슬라이드로 초기화
            }
        }
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


     const tabLinks = document.querySelectorAll('.tab-list a');
    const swiperWrapper = document.querySelector('.lec-swiper .swiper-wrapper');
    const allSlidesHTML = swiperWrapper.innerHTML; // 1. 초기 모든 슬라이드 HTML 저장
    let lecSlideSwiper = null; // Swiper 인스턴스를 담을 변수

    // Swiper를 초기화하는 함수
    function initSwiper() {
        lecSlideSwiper = new Swiper(".lec-swiper", {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: false,
            navigation: {
                prevEl: ".lec-slide-wrap .lec-prev-btn",
                nextEl: ".lec-slide-wrap .lec-next-btn",
            },
            // 슬라이드가 없을 때 네비게이션 버튼 비활성화
            watchOverflow: true, 
        });
    }

    // 특정 상태의 슬라이드를 필터링하여 보여주는 함수
    function showSlidesByStatus(status) {
        // 2. 기존 Swiper 인스턴스가 있다면 파괴
        if (lecSlideSwiper) {
            lecSlideSwiper.destroy(true, true);
        }

        // 3. 필터링을 위해 모든 슬라이드를 다시 채움
        swiperWrapper.innerHTML = allSlidesHTML;

        if (status !== 'all') {
            const allSlides = swiperWrapper.querySelectorAll('.lec-slide');
            allSlides.forEach(slide => {
                if (!slide.classList.contains(`status-${status}`)) {
                    slide.remove();
                }
            });
        }
        
        // 4. 필터링된 슬라이드로 Swiper 새로 초기화
        initSwiper();
    }

    // 탭 클릭 이벤트 리스너
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            tabLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            const tabStatus = this.dataset.tab;
            showSlidesByStatus(tabStatus);
        });
    });

    // 페이지 로드 시 '전체' 탭 기본 활성화 및 Swiper 초기화
    const allTab = document.querySelector('.tab-list a[data-tab="all"]');
    if (allTab) {
        allTab.parentElement.classList.add('active');
    }
    initSwiper(); // 처음 페이지 로드 시 Swiper 초기화


    

    // 1. 필요한 DOM 요소들을 선택합니다.
    const dateList = document.querySelector('.date-selector'); // 탭 버튼들을 감싸는 ul
    const dateButtons = document.querySelectorAll('.date-selector button[role="tab"]');
    const datePanels = document.querySelectorAll('.showtime-content div[role="tabpanel"]');

    /**
     * @param {HTMLElement} targetTab - 활성화할 탭 버튼 요소
     */
    const switchTab = (targetTab) => {
        // 현재 활성화된 탭을 찾아 인덱스 저장
        const currentActiveTab = document.querySelector('.date-selector button.active');
        if (currentActiveTab === targetTab) return; // 이미 활성화된 탭이면 아무것도 안 함

        // 모든 탭 버튼과 패널을 비활성화 상태로 초기화
        dateButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });
        datePanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // 클릭/포커스된 탭 버튼을 활성화
        targetTab.classList.add('active');
        targetTab.setAttribute('aria-selected', 'true');

        // 해당 탭과 연결된 패널을 찾아 활성화
        const targetPanelId = targetTab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetPanelId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    };

    // 2. 각 탭 버튼에 이벤트 리스너를 추가합니다.
    dateButtons.forEach(button => {
        // 마우스 클릭 시 탭 전환
        button.addEventListener('click', (e) => {
            switchTab(e.currentTarget);
        });

        // 키보드 포커스 이동 시 탭 전환
        button.addEventListener('focus', (e) => {
            switchTab(e.currentTarget);
        });
    });

    $('.ft-site-btn').on('click', function(e) {
        // a 태그의 기본 동작(페이지 이동) 방지
        e.preventDefault();
        
        // 부모 .ft-site-box에 'on' 클래스를 추가/제거
        $(this).closest('.ft-site-box').toggleClass('on');
    });

});
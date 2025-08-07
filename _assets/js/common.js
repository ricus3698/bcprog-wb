// common.js
function includeHTML(callback) {
  const elements = document.querySelectorAll('[data-include]');
  let loaded = 0;
  elements.forEach((el) => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        loaded++;
        if (loaded === elements.length && typeof callback === 'function') {
          callback();
        }
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
});

$(document).ready(function() {
    $('.ft-site-btn').on('click', function(e) {
        e.preventDefault();
        $(this).next('.ft-site-list').slideToggle();
        $(this).toggleClass('active');
    });

    $('.mobile-nav > li > a').on("click", function(e){
        e.preventDefault();
        if (window.innerWidth < 1280) {
            $(this).parent('li').siblings('li').removeClass('is-open');
            $(this).parent('li').addClass('is-open');
        }
    });

    //GNB Start
    $('.header nav, .header .gnb-bg').on("mouseenter", function(e){
        e.preventDefault();
        if (window.innerWidth > 1280) {
            $('.header').addClass('is-active');
            $('.header').addClass('gnb-active');
            $('.header').removeClass('search-active');
            $('.total-area .search-wrap').stop().slideUp(250);
            $('.overlay').show();
        }
    });
    $('.header nav, .header .gnb-bg').on("mouseleave", function(e){
        if (window.innerWidth > 1280) {
            $('.header').removeClass('is-active');
            $('.header').removeClass('gnb-active');
            $('.overlay').hide();
        }
    });

    // GNB 접근성
    $('.header .gnb > li > a').bind('focus', function () {
        if (window.innerWidth > 1280) {
            $('.header').addClass('gnb-active');
        }
    });
    $('.header .search-btn').bind('focus', function () {
        if (window.innerWidth > 1280) {
            $('.header').removeClass('gnb-active');
        }
    });

    // GNB 2depth 하위메뉴 존재할 때
    $('.header .depth2 > li > a').each(function(){
        var $a     =  $(this),
            $li    =  $a.closest('li');
    
        if( $li.find(' > .depth3').length > 0 ) {
            $a.addClass('no_link');
        }
    });
});

// 사이트맵, 모바일 메뉴 열기
function siteMgnbOpen() {
    if (window.innerWidth > 1280) {
        $('.site-modal').fadeIn();
        $('body').addClass('ov-hidden');
    } else {
        $('.mobile-menu').show();
        $('.mobile-menu .mobile-global').css("right","-60%").animate({"right": "0"}, 200);
        $('body').css('overflow','hidden');
    }
    $(document.activeElement).addClass('focus-in');
    if ($(document.activeElement).is('.policy-list a')) {
        $('.site-modal .menu-list > li > a').first().focus();
    }
}
// 사이트맵, 모바일 메뉴 닫기
function siteMgnbClose() {
    if (window.innerWidth > 1280) {
        $('.site-modal').fadeOut();
        $('body').removeClass('ov-hidden');
    } else {
        $('.mobile-menu .mobile-global').animate({"right": "-60%"}, 300, function(){$('.mobile-menu').hide();});
        $('body').css('overflow','');
    }
    $('.focus-in').focus();
    $('.all-btn').removeClass('focus-in');
    $('.policy-list > li > a').removeClass('focus-in');
}

// 통합검색 열기
function searchOpen() {
    $('.total-area .search-wrap').stop().slideDown();
    $('.header').addClass('is-active');
    $('.header').addClass('search-active');
    $('.overlay').show();
}
//통합검색 닫기
function searchClose() {
    $('.total-area .search-wrap').stop().slideUp();
    $('.header').removeClass('is-active');
    $('.header').removeClass('search-active');
    $('.overlay').hide();
    $('.header .search-btn').focus();
}

//공유하기
$('.share-toggle').click(function(e){
    e.preventDefault();
    const $sharebtn = $(this);
    const $shareBlind = $(this).find('span.blind');
    const $snsShareList = $('.share-wrap');

    $snsShareList.stop().slideToggle(200, function(e) {
        var snsShareOpen = $snsShareList.is(':visible');
        // aria-expanded 속성 및 텍스트 변경
        $sharebtn.attr('aria-expanded', snsShareOpen ? 'true' : 'false');
        $shareBlind.text(snsShareOpen ? 'sns 공유하기 닫기' : 'sns 공유하기 열기');
    });
})

// 서브메뉴 드롭다운
$(function() {

    $('.mobile-dropdown-toggle').on('click', function(event) {
        event.stopPropagation();
        
        $('.sub-nav').toggleClass('is-open');
    });

    $(document).on('click', function() {
        $('.sub-nav').removeClass('is-open');
    });

});


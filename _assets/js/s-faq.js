function bbsFaqFold () {
    var bbsFaqButton = $('.bbs-faq-button');
    var bbsFaqDescription = $('.bbs-faq-description');

    bbsFaqButton.prop('title', '내용 펼치기')

    bbsFaqButton.on('click', function (event) {
        event.preventDefault();

        var t = $(this);
        var idx = bbsFaqButton.index(t);

        if (t.hasClass('is-selected')) {
            t.removeClass('is-selected').prop('title', '내용 숨겨짐');
            bbsFaqDescription.eq(idx).stop().slideUp('700', 'easeOutExpo', function () {
                $(this).removeAttr('style');
            });
            return;
        }

        t.addClass('is-selected').prop('title', '내용 펼쳐짐');
        bbsFaqDescription.eq(idx).stop().slideDown('700', 'easeOutExpo');
    });
}

$(function () {
    bbsFaqFold();
});
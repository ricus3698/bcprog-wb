$(document).ready(function() {
    $('.ft-site-btn').on('click', function(e) {
        e.preventDefault();
        $(this).next('.ft-site-list').slideToggle();
        $(this).toggleClass('active');
    });
});
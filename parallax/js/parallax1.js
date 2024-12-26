$(document).ready(function () {
    const $parallax = $('#parallax');
    const $parallaxContent = $('#parallaxContent');

    $(window).on('scroll', function () {
        const scrollY = $(this).scrollTop() * 0.5;
        const parallaxHeight = $parallax.outerHeight();

        $parallax.css('background-position-y', `${-scrollY}px`);

        const translateY = Math.min(parallaxHeight / 2, scrollY * 0.2);
        $parallaxContent.css('transform', `translateY(${translateY}px)`);
    });
});

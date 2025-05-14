$(function () {
    // スムーススクロール
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const target = $($(this).attr('href'));

        if (target.length) {
            // nav の現在の position を取得
            const nav = $("#nav");
            const navHeight = nav.outerHeight();
            const isFixed = nav.css('position') === 'fixed';

            // fixed なら nav の高さを引く、static なら 96px 引く
            const offset = isFixed ? navHeight : 96;

            const position = target.offset().top - offset;

            $('html, body').animate({ scrollTop: position }, 500);
        }
    });


    // スクロール固定
    const nav = $("#nav");
    const navPos = nav.offset().top;

    $(window).scroll(function () {
        if ($(window).scrollTop() > navPos) {
            nav.css("position", "fixed");
        } else {
            nav.css("position", "static");
        }
    });
});

$(function () {
    const $menuLink = $('.menu a[href^="#"]');
    const $navMenus = $(".menu");

    // ホバーでサブメニュー表示・非表示
    $navMenus.hover(
        function () {
            $(this).children("ul").stop(true, true).slideDown(200);
        },
        function () {
            $(this).children("ul").stop(true, true).slideUp(200);
        }
    );
    $navMenus.on('click', function () {
        $(this).children("ul").stop(true, true).slideUp(200);
    });

    // スムーススクロール
    $menuLink.on('click', function (e) {
        e.preventDefault();
        const anchor = this.getAttribute('href');
        if (anchor) {
            const targetOffset = $(anchor).offset().top;
            $('html, body').stop().animate({
                scrollTop: targetOffset
            }, 500);
        }
    });
});
$(function () {
    var headerHeight = 0;
    const $menuLink = $('#nav a[href^="#"]');

    // ホバーでサブメニュー
    $("#nav li").hover(
        function () {
            $(this).find("ul").stop().slideDown(200);
        },
        function () {
            $(this).find("ul").stop().slideUp(200);
        }
    );
    $("#nav li").on('click', function () {
        $(this).find("ul").stop().slideUp(200);
    });

    // スクロール固定
    const navPos = $("#nav").offset().top;
    $(window).scroll(function () {
        if ($(window).scrollTop() > navPos) {
            $("#nav").css("position", "fixed");
        } else {
            $("#nav").css("position", "static");
        }
    });

});
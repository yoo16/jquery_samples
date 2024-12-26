$(function () {
    const $menuButton = $('#menu-button');
    const $menuLink = $('#slide-menu a[href^="#"]');
    const $slideMenu = $('#slide-menu');
    const headerHeight = $('#header-menu').outerHeight() + 10;

    $menuButton.on('click', function () {
        slideMenu();
    });

    function initMenu() {
        $slideMenu.css({
            transform: 'translateX(-100%)',
        });
    }

    function slideMenu() {
        var x = '0px';
        $slideMenu.toggleClass('on');
        if ($slideMenu.hasClass('on')) {
            x = $slideMenu.width() + 'px';
        }
        $slideMenu.animate({ marginLeft: x }, 300);
    }

    // スムーススクロール
    $menuLink.on('click', function (e) {
        e.preventDefault();
        slideMenu();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            const targetOffset = target.offset().top - headerHeight;
            $('html, body').stop().animate({
                scrollTop: targetOffset
            }, 500);
        }
    });

    initMenu();
});

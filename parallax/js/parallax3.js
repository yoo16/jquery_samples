$(document).ready(function () {
    const offset = 500; // オフセット調整値

    const $copy = $('#copy');
    let copyText = 'Welcome to Parallax World';
    const typingSpeed = 100;
    let typingIndex = 0;

    const fadeElements = $('.fade-in');
    const slideElements = $('.slide-in');
    const parallaxElements = $('.parallax-bg');
    const $menuLink = $('#nav a[href^="#"]');
    const headerHeight = $('#nav').outerHeight();

    // スクロール割合を計算
    function getProgress(target, scrollY) {
        const elementTop = target.offset().top;
        const progress = Math.min(1, Math.max(0, (scrollY - elementTop + offset) / $(window).height()));
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        return progress;
    }

    function fadeIn(target, scrollY) {
        const progress = getProgress(target, scrollY)
        // スクロールの割合に基づいてopacityを設定（0〜1の範囲にクランプ）
        if (progress > 0 && progress <= 1) {
            target.css({ opacity: progress });
        }
    }

    function slideIn(target, scrollY) {
        const progress = getProgress(target, scrollY)
        if (progress > 0 && progress <= 1) {
            const translateX = (1 - progress) * offset;
            target.css({
                opacity: progress,
                transform: `translateX(${translateX}px)`,
            });
        }
    }

    function typeWriter() {
        if (typingIndex < copyText.length) {
            const currentText = $copy.text();
            $copy.text(currentText + copyText[typingIndex]);
            typingIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }


    // スクロールイベントハンドラ
    const handleScroll = () => {
        const scrollY = $(window).scrollTop() + offset;

        fadeElements.each(function () {
            fadeIn($(this), scrollY);
        });

        slideElements.each(function () {
            slideIn($(this), scrollY);
        });

        parallaxElements.each(function () {
            const speed = $(this).data('parallax-speed') || 0.5;
            const offset = scrollY * speed;
            $(this).css('background-position', `center ${offset}px`);
        });
    };

    // スムーススクロール
    $menuLink.on('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            const targetOffset = target.offset().top - headerHeight;
            $('html, body').stop().animate({
                scrollTop: targetOffset
            }, 500);
        }
    });

    // スクロールイベントリスナー
    $(window).on('scroll', handleScroll);

    // 初期実行
    handleScroll();
    $copy.text('');
    typeWriter();
});

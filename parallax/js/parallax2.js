
$(document).ready(function () {
    const windowHeight = $(window).height();
    const offset = windowHeight / 3;

    const targets = [
        { selector: "#section1 h2", callback: fadeIn },
        { selector: "#section2 img", callback: slideIn },
        { selector: "#section2 h2", callback: fadeIn },
        { selector: "#section3 h2", callback: fadeIn },
        { selector: "#section4", callback: slideLeft },
    ];

    $(window).on("scroll", function () {
        targets.forEach(({ selector, callback }) => {
            console.log(selector)
            scrollAnimation(selector, callback);
        });
    });

    function scrollAnimation(selector, callback) {
        const scrollTop = $(window).scrollTop();
        const top = $(selector).offset().top;
        if (scrollTop + windowHeight > top + offset && $(selector).hasClass('invisible')) {
            $(selector).removeClass('invisible');
            if (callback) callback($(selector))
        }
    }

    function fadeIn(selector) {
        $(selector).css({ opacity: 0 })
            .animate({ opacity: 1 }, 1000)
    }

    function slideIn(selector) {
        $(selector).css({ opacity: 0, width: 0, })
            .animate({ opacity: 1, width: '100%' }, 1000);
    }

    function slideLeft(selector) {
        // 開始位置
        const start = $(window).width() * 0.5;
        // 終了位置
        const end = $(selector).position().left || 0;
        $(selector).css({ opacity: 0, position: 'relative', left: start + 'px' })
            .animate({ opacity: 1, left: end + 'px' }, 800);
    }

});
$(document).ready(function () {
    const elementsToShow = [
        { selector: "#section1 h2", callback: fadeIn },
        { selector: "#section2 img", callback: slideIn },
        { selector: "#section2 h2", callback: fadeIn },
        { selector: "#section3 h2", callback: slideLeft },
        { selector: "#section4 img", callback: fadeIn },
    ];

    const windowHeight = $(window).height();
    const offset = windowHeight / 3;

    $(window).on("scroll", function () {
        elementsToShow.forEach(({ selector, callback }) => {
            showContents(selector, callback);
        });
    });

    function showContents(selector, callback) {
        const scrollTop = $(window).scrollTop();
        const target = $(selector);

        if (target.length === 0) return;

        const top = target.offset().top;

        if (scrollTop + windowHeight > top + offset && target.hasClass('opacity-0')) {
            target.removeClass('opacity-0');
            if (callback) callback(target)
        }
    }

    function fadeIn(target) {
        target.css({ opacity: 0 })
            .animate({ opacity: 1 }, 1000)
    }

    function slideIn(target) {
        target.css({ width: 0 })
            .animate({ opacity: 1, width: '100%' }, 1000)
    }

    function slideLeft(target) {
        const start = $(window).width() * 0.5;
        const end = target.css('left');
        console.log(start, end)
        target.css({ opacity: 0, left: start })
            .animate({ opacity: 1, left: end }, 800);
    }

    function slideRight(target) {
        const start = -$(window).width() * 0.5;
        const end = target.css('left');
        target.css({ opacity: 0, left: start })
            .animate({ opacity: 1, left: end }, 800);
    }
});
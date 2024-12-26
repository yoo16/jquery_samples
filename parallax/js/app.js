$(document).ready(function () {
    const elementsToShow = [
        { selector: "#section1 h2", callback: fadeIn },
        { selector: "#section2 img", callback: slideIn },
        { selector: "#section2 h2", callback: fadeIn },
        { selector: "#section3 h2", callback: fadeIn },
        { selector: "#section4 img", callback: slideLeft },
        { selector: "#section5 h2", callback: fadeIn },
        { selector: "#section6 img", callback: slideRight },
    ];

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
        const windowHeight = $(window).height();

        if (scrollTop + windowHeight > top + (windowHeight / 2) && target.hasClass('opacity-0')) {
            target.removeClass('opacity-0');
            if (callback) callback(target)
        }
    }

    function fadeIn(target) {
        target.css({ opacity: 0 })
            .animate({ opacity: 1 }, 1000)
    }

    function slideIn(target) {
        const width = target.width();
        target.css({ width: 0 })
            .animate({ opacity: 1, width: width }, 1000)
    }

    function slideLeft(target) {
        const start = $(window).width() * 0.5;
        const end = target.css('left');
        console.log(start, end)
        target.css({ opacity: 0, left: start })
            .animate({ opacity: 1, left: end }, 500);
    }

    function slideRight(target) {
        const start = $(window).width() * 0.5;
        const end = target.css('left');
        target.css({ opacity: 0, left: -start })
            .animate({ opacity: 1, left: end }, 500);
    }
});
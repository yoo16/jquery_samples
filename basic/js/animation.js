$(function () {
    var panel = $("#panel");
    var box1 = $("#box1");
    var box2 = $("#box2");

    $("#showBtn").on("click", function () {
        panel.show(500);
    });

    $("#hideBtn").on("click", function () {
        panel.hide(500);
    });

    $("#toggleBtn").on("click", function () {
        panel.toggle(500);
    });

    $("#fadeInBtn").on("click", function () {
        panel.fadeIn(500);
    });

    $("#fadeOutBtn").on("click", function () {
        panel.fadeOut(500);
    });

    $("#fadeToggleBtn").on("click", function () {
        panel.fadeToggle(500);
    });

    $("#slideDownBtn").on("click", function () {
        panel.slideDown(500);
    });

    $("#slideUpBtn").on("click", function () {
        panel.slideUp(500);
    });

    $("#slideToggleBtn").on("click", function () {
        panel.slideToggle(500);
    });

    $("#easingBtn").on("click", function () {
        initBox();
        box1.animate({ width: "300px" }, 1500, "linear");
        box2.animate({ width: "300px" }, 1500, "swing");
    })

    $("#animateBtn").on("click", function () {
        box1.animate({ width: "300px", height: "50px", opacity: 0.1 }, 1000)
            .animate({ width: "100px", height: "100px", opacity: 1 }, 1000)

        box2.animate({ width: "0px", opacity: 0.1 }, 500)
            .animate({ width: "200px", opacity: 1 }, 500)
            .delay(1000)
            .animate({ width: "100px", opacity: 1 }, 1000)
    });

    $("#queueBtn").on("click", function () {
        const items = $('.item');
        items.addClass('hidden');

        const delayTime = 300;

        items.each(function (i) {
            $(this).delay((i + 1) * delayTime).queue(() => {
                $(this).removeClass('hidden').dequeue();
            });
        });
    });

    function initBox() {
        box1.removeClass("bg-green-400").addClass("bg-blue-400");
        box1.css({
            width: "100px",
            height: "100px"
        });
        box2.removeClass("bg-blue-400").addClass("bg-green-400");
        box2.css({
            width: "100px",
            height: "100px"
        });
    }

    initBox();
});
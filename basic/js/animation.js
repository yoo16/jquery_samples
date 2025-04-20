$(function () {
    var character_1 = $("#character_1");
    var character_2 = $("#character_2");
    var character_3 = $("#character_3");
    var character_4 = $("#character_4");
    var box1 = $("#box1");
    var box2 = $("#box2");

    $("#showBtn").on("click", function () {
        character_1.show(500);
    });

    $("#hideBtn").on("click", function () {
        character_1.hide(500);
    });

    $("#toggleBtn").on("click", function () {
        character_1.toggle(500);
    });

    $("#fadeInBtn").on("click", function () {
        character_2.fadeIn(500);
    });

    $("#fadeOutBtn").on("click", function () {
        character_2.fadeOut(500);
    });

    $("#fadeToggleBtn").on("click", function () {
        character_2.fadeToggle(500);
    });

    $("#slideDownBtn").on("click", function () {
        character_3.slideDown(500);
    });

    $("#slideUpBtn").on("click", function () {
        character_3.slideUp(500);
    });

    $("#slideToggleBtn").on("click", function () {
        character_3.slideToggle(500);
    });

    $("#shakeBtn").on("click", function () {
        let distance = 10; // 揺れ幅
        let times = 4;     // 揺れる回数

        function shake(element, count) {
            if (count > 0) {
                console.log(element);
                element.animate({ left: -distance }, 50)
                    .animate({ left: distance }, 50, function () {
                        shake(element, count - 1);
                    });
            } else {
                element.animate({ left: 0 }, 50); // 最後に元の位置へ
            }
        }
        shake(character_4, times);
    });

    $("#easingBtn").on("click", function () {
        box1.animate({ width: "300px" }, 1000, "linear");
        box2.animate({ width: "300px" }, 1000, "swing");
    });

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
            $(this).delay(i * delayTime).queue(() => {
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
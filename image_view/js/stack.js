// jQuery animate()
$(document).ready(function () {
    $('#next-button1').on('click', function () {
        stackAnimation1();
    });


});

// CSS animate
$(document).ready(function () {
    $('#next-button2').on('click', function () {
        stackAnimation2();
    });

});

function stackAnimation1() {
    const $images = $('#image-container').children('.stacked-item');
    const $topImage = $images.last();

    // 現在の要素を取得して移動
    $topImage
        .css('z-index', 10)
        .animate({ opacity: 0.8, left: '100%', top: '-10x' }, 500,
            // 移動終了後の処理
            function () {
                // 重ね順を auto
                $(this).css('z-index', 'auto');
                // 要素を先頭に移動し、フェードイン
                $(this).prependTo('#image-container')
                    .animate({ opacity: 1, left: 0, top: 0 }, 500);
            });
}

function stackAnimation2() {
    const $images = $('#image-container').children('.stacked-item');
    const $topImage = $images.last();

    // フェードアウト
    $topImage.addClass('animate-out');

    // 移動終了後の処理
    $topImage.one('transitionend', function () {
        // 要素を先頭に移動
        $(this).prependTo('#image-container');

        setTimeout(() => {
            // フェードイン
            $(this).addClass('animate-in');

            // `transitionend` を使わずに一定時間後にアニメーションリセット
            setTimeout(() => {
                $(this).removeClass('animate-out');
                $(this).removeClass('animate-in');
            }, 500);
        }, 10);
    });
}
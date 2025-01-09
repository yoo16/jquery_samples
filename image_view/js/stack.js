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

    // スライドアニメーション
    $topImage
        .animate({
            opacity: 0.8,
            left: '100%',
            marginTop: '-50px',
        }, 500, resetPosition);

    // 位置を元に戻す
    function resetPosition() {
        // 重ね順を auto
        $topImage.css('z-index', 'auto');
        // 要素を先頭に移動し、フェードイン
        $topImage.prependTo('#image-container')
            .animate({ opacity: 0.5, }, 200)
            .animate({
                opacity: 1,
                left: 0,
                marginTop: 0,
            }, 500);
    }
}

function stackAnimation2() {
    const $images = $('#image-container').children('.stacked-item');
    const $topImage = $images.last();

    // フェードアウト
    $topImage.addClass('swipe-out');

    // 移動終了後の処理
    $topImage.one('transitionend', function () {
        // 要素を先頭に移動
        $topImage.prependTo('#image-container');

        setTimeout(() => {
            // スワイプアウト削除
            $topImage.removeClass('swipe-out');
        }, 100);
    });
}
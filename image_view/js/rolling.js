$(document).ready(function () {
    $('#next-button1').on('click', function () {
        const $images = $('#image-container').children('.stacked-item');
        const $topImage = $images.last();

        $topImage
            .css('z-index', 100)
            .animate({ opacity: 0.8, left: '100%', top: '-10x' }, 500,
                function () {
                    $(this).css('z-index', 'auto');
                    $(this).prependTo('#image-container')
                        .animate({ opacity: 1, left: 0, top: 0 }, 500);
                });
    });
});


$(document).ready(function () {
    $('#next-button2').on('click', function () {
        const $images = $('#image-container').children('.stacked-item');
        const $topImage = $images.last();

        // フェードアウト
        $topImage.addClass('animate-out');

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
    });
});

$(function () {
    // サムネールクリック
    $("a").on('click', function () {
        // data-image から 画像パスを取得
        const src = $(this).attr("data-image");
        // 現在の img をフェードアウト
        $("#item img").fadeOut(300, function () {
            // 画像パスを変更してフェードイン
            $("#item img").attr("src", src).fadeIn(300);
        });
    });
});

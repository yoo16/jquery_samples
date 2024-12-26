$(function () {
    // サムネイルクリック
    $(".thumbnail").on('click', function () {
        // img から 画像パス src を取得
        const src = $(this).attr("src");
        // メイン画像の img をフェードアウト
        $("#main-image").fadeOut(300, function () {
            // コールバックで、メイン画像の img にパスを設定してフェードイン
            $("#main-image").attr("src", src).fadeIn(300);
        });
    });
});


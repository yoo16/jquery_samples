$(() => {
    var photo = $('#photo');
    // 画像を隠す
    photo.hide()
    // 画像ファイル一覧
    var images = ['tokyo_station.jpg', 'ez.jpg']
    // 画像インデックス
    var index = 0

    const loadImage = () => {
        // 画像パス設定
        var path = './images/' + images[index]
        // imgに設定
        $('#photo > img').attr('src', path)
        // 次のインデックス
        index++
        // 最後のインデックスチェック
        if (index >= images.length) index = 0
    }
    const open = () => {
        loadImage()
        photo.fadeIn(2000, "swing", () => {
            setTimeout(close, 3000)
        })
    }
    const close = () => {
        photo.fadeOut(2000, "swing", () => {
            setTimeout(open, 1000)
        })
    }
    open()
})
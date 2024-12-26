$(function () {
    const $imageList = $("#image-list");

    // 画像リストを動的に生成
    function loadImages() {
        items.forEach(data => {
            const listItem = `
            <li class="item relative group">
                <div class="loading absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div class="loader border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                </div>
                <img src="${data.image}" class="item w-full h-auto rounded-lg shadow-md hidden">
                <div class="caption hidden absolute inset-0 bg-teal-600 rounded-lg p-3 bg-opacity-85 flex items-center justify-center text-white">
                    <div class="name p-4">${data.name}</div>
                    <div class="caption p-4">${data.caption}</div>
                </div>
            </li>`;
            $imageList.append(listItem);
        });

        // 画像が読み込まれたらローディングを非表示にして画像を表示
        $('.item').on('load', function () {
            $(this).siblings('.loading').fadeOut(200, function () {
                $(this).remove();
            });
            $(this).fadeIn(200);
        });
    }


    // マウスオーバーイベントの設定
    $imageList.on({
        mouseenter: function () {
            // マウスオーバー時に説明文のdivを表示
            $(this).find('.caption').stop().fadeIn(200);
        },
        mouseleave: function () {
            // マウスアウト時に説明文のdivを非表示
            $(this).find('.caption').stop().fadeOut(200);
        }
    }, 'li');

    loadImages();
});

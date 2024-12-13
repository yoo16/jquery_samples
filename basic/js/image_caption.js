$(function () {
    const $imageList = $("#image-list");

    // 画像リストを動的に生成
    items.forEach(data => {
        const listItem = `
            <li class="relative group">
                <img src="${data.image}" class="w-full h-auto rounded-lg shadow-md">
                <div
                    class="item hidden absolute inset-0 bg-teal-600 rounded-lg p-3 bg-opacity-70 flex items-center justify-center text-white">
                    <p class="caption p-4">${data.name}</p>
                    <p class="caption p-4">${data.caption}</p>
                </div>
            </li>
        `;
        $imageList.append(listItem);
    });

    // マウスオーバーイベントの設定
    $imageList.on({
        mouseenter: function () {
            // マウスオーバー時に説明文のdivを表示
            $(this).find('.item').stop().fadeIn(200);
        },
        mouseleave: function () {
            // マウスアウト時に説明文のdivを非表示
            $(this).find('.item').stop().fadeOut(200);
        }
    }, 'li');
});

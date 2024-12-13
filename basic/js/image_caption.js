$(function () {
    const $imageList = $("#image-list");

    // 画像リストを動的に生成
    items.forEach(data => {
        const listItem = `
            <li class="relative group">
                <img src="${data.image}" class="w-full h-auto rounded-lg shadow-md">
                <div class="caption hidden absolute inset-0 bg-teal-600 rounded-lg p-3 bg-opacity-85 flex items-center justify-center text-white">
                    <div class="name p-4">${data.name}</div>
                    <div class="caption p-4">${data.caption}</div>
                </div>
            </li>
        `;
        $imageList.append(listItem);
    });

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
});

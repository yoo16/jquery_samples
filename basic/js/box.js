$(function () {
    const box1 = $("#box1");

    // 各種情報の取得
    const width = box1.width();
    const height = box1.height();
    const offset = box1.offset();
    const id = box1.attr("id");

    // text() を使って値を設定
    $("#id-info span").text(id);
    $("#width-info span").text(`${width}px`);
    $("#height-info span").text(`${height}px`);
    $("#offset-info span").text(`Top: ${offset.top}px, Left: ${offset.left}px`);

    const box2 = $("#box2");
    box2.width(150)
    box2.height(50)
    box2.offset({ top: 300, left: 50 });

    $("html, body").height(2500);
    $("html, body").scrollTop(500);
});
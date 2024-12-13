$(function () {
    // id=nav をホバー
    $("#nav > li").hover(
        function () {
            $(this).find("ul").stop().slideDown(200);
        },
        function () {
            $(this).find("ul").stop().slideUp(200);
        }
    );
});
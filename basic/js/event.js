// バニラJS
// document.getElementById('click-button').addEventListener("click", function () { 
//     $("#result-event").text('クリックしました')
//  })

$("#click-button").on("click", function () {
    $("#result-event").text('クリックしました')
});

$("#select-list").on("change", function () {
    // const selected = $(this).val();
    const selected = $(this).find("option:selected").text();
    const message = selected + "が選択されました";
    $("#result-event").text(message);
});

$('#input-text').on({
    input: function () {
        const inputText = $(this).val()
        $("#result-event").text(inputText)
    },
    focus: function () {
        $(this).addClass('bg-blue-100')
    },
    blur: function () {
        $(this).removeClass('bg-blue-100')
    }
});

$('#item-list').on('click', 'li', function () {
    const message = $(this).text() + "が選択されました"
    $("#result-event").text(message)

    $('#item-list li').removeClass('bg-orange-100')
    $(this).addClass('bg-orange-100')
});

const mouseOverHandler = function (event) {
    $(this).text('マウスオーバー')
}

const mouseOutHandler = function (event) {
    $(this).text('')
}

$('#box').on('mouseover', mouseOverHandler)
$('#box').on('mouseout', mouseOutHandler)

$('#event-off-button').on('click', function () {
    $('#box').off('mouseover', mouseOverHandler)
    $('#box').off('mouseout', mouseOutHandler)
});
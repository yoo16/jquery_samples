// バニラJS
// document.getElementById('click-button').addEventListener("click", function () { 
//     $("#result-event").text('クリックしました')
//  })

$("#click-button").on("click", function () {
    var userName = $('#input-text').val();
    if (userName) {
        var message = userName + "さん、ようこそ！";
        $("#result-event").text(message)
    }
});

$("#item-list").on("change", function () {
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

$('#size-list').on('click', 'li', function () {
    const message = $(this).text() + "サイズが選択されました"
    $("#result-event").text(message)

    $('#size-list li').removeClass('bg-orange-100')
    $(this).addClass('bg-orange-100')
});

const mouseOverHandler = function (event) {
    $(this).addClass('bg-blue-100')
}

const mouseOutHandler = function (event) {
    $(this).removeClass('bg-blue-100')
}

$('#box').on('mouseover', mouseOverHandler)
$('#box').on('mouseout', mouseOutHandler)

$('#event-off-button').on('click', function () {
    $('#box').off('mouseover', mouseOverHandler)
    $('#box').off('mouseout', mouseOutHandler)
});
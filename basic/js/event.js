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


// change イベント
$('#character-select').on('change', function () {
    const charId = $(this).val();
    const imagePath = `images/character_${charId}.png`;
    $('#character-image').attr('src', imagePath);
});

// click イベント
$('#character-list li').on('click', function () {
    const charId = $(this).data('character'); // 1, 2, 3...
    const imagePath = `images/character_${charId}.png`;
    $('#character-image').attr('src', imagePath);
});

// mouseイベントハンドラー
const mouseOverHandler = function (event) {
    $(this).attr('src', 'images/character_5.png');
}

const mouseOutHandler = function (event) {
    $(this).attr('src', 'images/character_4.png');
}

// mouseイベント
$('#hoverBox')
    .on('mouseover', mouseOverHandler)
    .on('mouseout', mouseOutHandler);

// mouseイベント削除
$('#event-off-button').on('click', function () {
    $('#hoverBox').off('mouseover', mouseOverHandler)
    $('#hoverBox').off('mouseout', mouseOutHandler)
});
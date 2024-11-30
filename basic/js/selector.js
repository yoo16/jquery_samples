$(() => {
    var element = $('#jp-title')
    console.log(element)

    var elements = $('.city')
    console.log(elements)

    var title = $('#jp-title').html()
    console.log(title)

    $('#jp-title').html('日本の都市')

    //親要素・子要素
    var elements = $('div > input')
    console.log(elements)

    //値の設定
    $('div > input').val(0)

    //値の取得
    var results = $('div > input').val()
    console.log(results)

    //親要素・子孫要素
    $('div input').val(1)

    //name=price
    $('input[name=price]').val(0)

    //input:hidden
    $('input[type=hidden]').val('3')

    //コンテンツフィルタ
    $('article:has(h3)').css({
        'border': 'solid 1px #f0f0f0',
        'padding': '5px',
    })

    //最初のliのinput
    $('#price_list > li:first input').val(70)

    //liの最初のinput
    $('li:first-child input').val(300)

    //２番目のinput
    $('li:nth-child(2) input').val(800)

    //3番目のinput
    $('li:nth-child(3) input').val(250)
    $('li:eq(2) input').val(50);

    //最後のinput
    $('li:last input').val(180);
})
$(() => {
    // id=title
    var titleElement = $('#title')
    console.log(titleElement)

    // class=city
    var cityElements = $('.city')
    console.log(cityElements)

    // id=jp-city の class=city
    var jpCityList = $('#jp-city > .city')
    console.log(jpCityList)

    // id=us-city の class=city
    var usCityList = $('#us-city > .city')
    console.log(usCityList)

    // html()
    var title = titleElement.html()
    console.log(title)

    titleElement.html("Japan City")


    // addClass()
    $('.city').addClass("bg-gray-300")

    // removeClass()
    $('.city').removeClass("bg-gray-300")

    // get: 指定インデックスで取得(バニラJS)
    var selectedCity = $('.city').get(0)
    console.log(selectedCity)

    // eq(): 指定インデックスで取得(jQueryオブジェクト)
    var selectedCity = $('.city').eq(0)
    console.log(selectedCity)

    // eq(): .city の最初を取得し、class=bg-red-500 を追加
    $('.city').eq(1).addClass("bg-red-500")

    // eq(): .city の最初を取得し、class=bg-red-500 を追加
    $('.city').eq(1).removeClass("bg-red-500")

    // first(): .city の最初を取得し、class=bg-red-500 を追加
    $('.city').first().addClass('bg-red-500')

    // .city の最後を取得し、class=bg-red-500 を追加
    $('.city').last().addClass('bg-red-500')

    // .city をすべて取得し、class=bg-red-300 を削除
    $('.city').removeClass('bg-red-300')


    // filter(): 指定した条件に一致した要素を選択
    // .city をすべて取得し、奇数に class=bg-gray-200 を追加
    $('.city').filter(':odd').addClass("bg-gray-200")

    // not(): 指定した条件に一致しない要素を選択
    // 奇数以外（偶数）の要素に class=bg-blue-300 を追加 
    $('.city').not(':odd').addClass("bg-blue-200")

    // find(): 子孫要素を取得
    $('#jp-city').find(".city").removeClass(["bg-blue-200", "bg-gray-200"])

    // slice(): 選択した要素を部分的に取得
    // 2番目から3番目の要素を取得し、class=bg-orange-500 を追加
    $('#us-city').find(".city").slice(1, 3).addClass("bg-orange-500")

    // nth-child()
    // id=us-city の class=city のインデックス「2」を選択
    var selectedCity = $('#us-city .city:nth-child(2)')
    // text() でコンテンツ表示
    $('#selected-city').html(selectedCity.text())
})
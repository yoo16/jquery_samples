$(function () {
  // ボタンクリックイベント
  $('#btnClick').on('click', function () {
    $('#clickResult').text('ボタンがクリックされました！');
  });

  // ホバーイベント
  $('#hoverBox')
    .on('mouseover', function () {
      $(this).text('マウスが乗ったよ！');
    })
    .on('mouseout', function () {
      $(this).text('マウスをのせて');
    });

  // フォーム送信イベント
  $('#sampleForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#nameInput').val();
    $('#formResult').text(`こんにちは、${name}さん！`);
  });
});

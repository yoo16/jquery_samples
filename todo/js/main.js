$(function () {

	var $input = $('#todo-input');
	var $list = $('#todo-list');
	var storage = window.localStorage;

	/*
	 * Todoを追加する関数
	 */
	function addTodo(text, isComplete) {
		// リストアイテムをつくる
		var $text = $('<span>').addClass('text px-3').text(text);
		var $checkbox = $('<input type="checkbox">');
		var $remove = $('<span>').text('削除').addClass('p-2 text-xs bg-red-500 text-white rounded');

		var $li = $('<li>');
		// チェックボックス、テキスト、削除ボンタン追加
		$li.addClass('cursor-pointer').append($checkbox).append($text).append($remove);

		// 完了済みの場合
		if (isComplete) {
			// 完了フラグ
			$li.addClass('complete');
			// 訂正線
			$li.children('.text').addClass('line-through');
			// チェックボックスON
			$checkbox.attr('checked', true);
		}

		/**
		 * チェックボックスクリックイベント
		 */
		$checkbox.on('click', function () {
			if ($(this).is(':checked')) {
				$li.addClass('complete');
				$li.children('.text').addClass('line-through');
			} else {
				$li.removeClass('complete');
				$li.children('.text').removeClass('line-through');
			}
			updateData();
		});

		/**
		 * テキストクリックイベント
		 */
		$text.on('click', function () {
			$checkbox.trigger('click');
		});

		/*
		* 削除イベント
		*/
		$remove.on('click', function () {
			if (window.confirm('削除してよろしいですか？')) {
				//  フェードアウトして削除
				$li.fadeOut(function () {
					$li.remove();
					updateData();
				});
			}
		});

		// リストに追加
		$list.append($li);
	}

	/*
	 * LocalStorageに更新
	 */
	function updateData() {
		var list = [];
		// 現在のリスト情報を全て取得する
		$list.find('li').each(function () {
			var $item = $(this);
			// テキストと完了かどうかを保存する
			list.push({
				text: $item.find('.text').text(),
				complete: $item.hasClass('complete')
			});
		});
		// 文字列にしてストレージに保存
		storage['todo.list'] = JSON.stringify(list);
	}

	/*
	 * TODO: サーバサイドで保存
	 * フォームを送信したときの処理
	 */
	$('.todoForm').bind('submit', function (event) {
		// フォームのデフォルトの動作を止める
		event.preventDefault();
		// テキストボックスに入っている文字列を取得
		var text = $input.val();
		// テキストを追加
		addTodo(text);
		// テキストボックスを空にする
		$input.val('');

		// ストレージの更新
		updateData();
	});

	/*
	 * TODO: サーバーサイドから読み込み
	 * LocalStroageからデータを復元
	 */
	function loadData() {
		var storageList = storage['todo.list'];
		if (storageList) {
			JSON.parse(storageList).forEach(function (item) {
				addTodo(item.text, item.complete);
			});
		}
	}

	loadData();
});

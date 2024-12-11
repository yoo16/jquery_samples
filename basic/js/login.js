const result = $('#registration-result');
const emailError = $('#email-error');
const passwordError = $('#password-error');

// 登録ボタンがクリックされたときの処理
function auth() {
    // フォーム入力値を取得
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    // バリデーションフラグ
    var isValid = true;

    // Email入力チェック
    if (email == "") {
        emailError.removeClass('hidden');
        isValid = false;
    } else {
        emailError.addClass('hidden');
    }

    // パスワードチェック（6文字以上）
    if (password.length < 6) {
        passwordError.removeClass('hidden');
        isValid = false;
    } else {
        passwordError.addClass('hidden');
    }

    // バリデーション成功時
    if (isValid) {
        result.html(`
                <strong>Email:</strong> ${email}<br>
                <strong>Password:</strong> ${password}
            `);
    } else {
        // エラーメッセージクリア
        result.html('');
    }
}
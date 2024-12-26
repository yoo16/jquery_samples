$(document).ready(function () {
    var isValid = true;
    const inValidClass = 'bg-red-100';

    $("#inputForm").on("submit", function (event) {
        event.preventDefault();

        validateName();
        validateEmail();
        validatePassword();

        if (isValid) {
            // フォーム送信などの処理
            alert("フォームが正常に送信されました！");
        }
    });

    // 名前のバリデーション
    function validateName() {
        const nameInput = $("#name");
        const nameError = $("#nameError");

        const name = nameInput.val().trim();
        if (name === "") {
            nameError.text("名前を入力してください。");
            isValid = false;
            nameInput.addClass(inValidClass);
        } else {
            nameError.text("");
            nameInput.removeClass(inValidClass);
        }
    }

    // Emailのバリデーション
    function validateEmail() {
        const emailInput = $("#email");
        const emailError = $("#emailError");

        const email = emailInput.val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.text("正しいメールアドレスを入力してください。");
            isValid = false;
            emailInput.addClass(inValidClass);
        } else {
            emailError.text("");
            emailInput.addClass(inValidClass);
        }
    }

    // パスワードのバリデーション
    function validatePassword() {
        const passwordInput = $("#password");
        const passwordError = $("#passwordError");

        const password = passwordInput.val();
        if (password.length < 6) {
            passwordError.text("パスワードは6文字以上で入力してください。");
            isValid = false;
            passwordInput.addClass(inValidClass);
        } else {
            passwordError.text("");
            passwordInput.removeClass(inValidClass);
        }

        // 確認用パスワード
        const confirmPasswordInput = $("#confirmPassword");
        const confirmPasswordError = $("#confirmPasswordError");

        const confirmPassword = confirmPasswordInput.val();
        if (confirmPassword !== password) {
            confirmPasswordError.text("パスワードが一致しません。");
            isValid = false;
            confirmPasswordInput.addClass(inValidClass);
        } else {
            confirmPasswordError.text("");
            confirmPasswordInput.removeClass(inValidClass);
        }
    }
});
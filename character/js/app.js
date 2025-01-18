$(function () {
    const stage = $('#stage')
    const items = [];

    // 画像固定
    const isFixed = true;
    const backgroundSize = 0;

    // レイアウト関連定数
    // アイテム数 16 = 4 x 4, 8 x 2
    const maxCol = 4;
    const maxRow = 4;

    // セルの大きさ
    const cellRate = 0.6

    // ホイールスピード
    const wheelSpeed = 0.7;
    // 加速レート
    const vRate = 0.95;

    // 変数
    // ポインターダウン判別
    let pointerDown = false;

    // ウィンドウ幅・高さ
    let H = 0, W = 0
    // ウィンドウサイズレート
    let R = 0;
    // ウィンドウ座標
    let X = 0, Y = 0;
    // スクロール座標
    let scrollX = 0, scrollY = 0;
    // 画像オフセット
    let offsetX = 0, offsetY = -20;
    // 目標位置
    let targetX = 0, targetY = 0;
    // 最終位置
    let lastX = 0, lastY = 0;
    // 速度
    let vx = 0, vy = 0

    // アイテムリスト作成
    worksData.forEach((data, index) => {
        // アイテム作成
        const workElement = createWorkElement(data);

        // ステージにアイテム追加
        stage.append(workElement[0]);

        // 列番号
        data.col = index % maxCol;
        // 行番号
        data.row = Math.floor(index / maxCol);

        // items にデータ追加
        items.push({
            data: data,
            element: workElement[0],
            image: workElement.find(".image")[0],
            position: { x: data.col, y: data.row, r: data.r }
        });
    });

    // アイテム作成
    function createWorkElement(data) {
        // 画像領域
        const work = $("<div>").addClass("work")
        // アイテムクリックイベント
        work.on('click', function () {
            // リンク
            location.href = data?.href;
        });

        // 画像
        const image = $("<div>").addClass("image")
            .css("background-image", `url('${data.image}')`)
        if (backgroundSize) {
            image.css('background-size', backgroundSize);
        }

        // 図形
        if (data.mask) image.addClass(data.mask);

        // タイトル
        const title = $("<h2>").text(data.title).addClass("work-title");
        work.append(image);
        work.append(title);
        return work;
    }

    // マウスホイールの移動量で速度計算
    function onWheel(event) {
        vx = event.deltaX * wheelSpeed;
        vy = event.deltaY * wheelSpeed;
        event.preventDefault();
    }

    // ポインターダウン
    function onPointerDown(event) {
        pointerDown = true;
        lastX = event.pageX;
        lastY = event.pageY;
        vx = 0;
        vy = 0;
    }

    // ポインター移動
    function onPointerMove(event) {
        if (pointerDown) {
            // マウスポインタの現在位置を取得
            const pageX = event.pageX;
            const pageY = event.pageY;

            // 移動速度を計算
            vx = -(pageX - lastX);
            vy = -(pageY - lastY);

            // 目標位置の更新
            lastX = pageX;
            lastY = pageY;

            event.preventDefault();
        }
    }

    function onPointerUp() {
        pointerDown = false;
    }

    // リサイズ
    function onResize() {
        const lastR = R;
        const ratio = R / lastR;
        targetX *= ratio;
        targetY *= ratio;
        X *= ratio;
        Y *= ratio;
    }

    // リセット
    function reset() {
        // 初期動作用
        vx = 0.01;
        vy = 0.01;

        // ウィンドウの幅、高さ
        W = window.innerWidth;
        H = window.innerHeight;

        // アイテムの位置やサイズの基準となる値
        // 各セルの幅と高さを計算
        R = Math.min(W * cellRate, H * cellRate);

        // アイテムの位置を設定
        items.forEach(item => {
            let x = item.data.col * R + item.data.x;
            item.element.style.left = `${x}px`;

            // 行の位置
            let y = item.data.row * R + item.data.y;
            item.element.style.top = `${y}px`;
        });

        // スクロール範囲の計算
        scrollX = maxCol * R;
        scrollY = maxRow * R;

        // 画像位置調整
        items.forEach(item => {
            const holeR = item.position.r * R;
            $(item.image).css({
                width: `${holeR}px`,
                height: `${holeR}px`
            });
        });
    }

    // 更新処理
    function update() {
        // 現在のX軸とY軸の速度を減速
        vx *= vRate;
        vy *= vRate;

        // 目標位置を更新
        targetX -= vx;
        targetY -= vy;

        if (targetX !== X || targetY !== Y) {
            // 現在の位置を目標位置に近づける
            X += (targetX - X);
            Y += (targetY - Y);

            // ステージ全体の位置を更新
            stage.css("transform", `translate(${X}px, ${Y}px)`);

            // アイテムごとの位置を更新
            items.forEach((item) => {
                // アイテムのフレーム位置を計算
                let frameX = item.position.x * R + item.data.x + X;
                let frameY = item.position.y * R + item.data.y + Y;

                // フレームサイズを計算
                let frameSize = item.position.r * R;

                // X軸の再配置条件
                if (frameX + frameSize < 0 || frameX + frameSize > scrollX) {
                    item.position.x += (frameX + frameSize < 0 ? scrollX / R : -scrollX / R);
                    $(item.element).css("left", `${item.position.x * R + item.data.x}px`);
                    frameX = item.position.x * R + item.data.x + X;
                }

                // Y軸の再配置条件
                if (frameY + frameSize < 0 || frameY + frameSize > scrollY) {
                    item.position.y += (frameY + frameSize < 0 ? scrollY / R : -scrollY / R);
                    $(item.element).css("top", `${item.position.y * R + item.data.y}px`);
                    frameY = item.position.y * R + item.data.y + Y;
                }
                // 背景位置の更新
                let backgroundX = offsetX - frameX + item.data.image_x;
                let backgroundY = offsetY - frameY + item.data.image_y;
                if (!isFixed) {
                    const progressX = X / targetX * 0.5;
                    const progressY = Y / targetY * 0.5;
                    backgroundX += (X * progressX)
                    backgroundY += (Y * progressY)
                }
                $(item.image).css("background-position", `${backgroundX}px ${backgroundY}px`);
            });
        }

        // 再描画のリクエスト（アニメーション継続）
        window.requestAnimationFrame(update);
    }


    // イベントリスナー
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove, { passive: false });
    document.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);

    // 初期処理
    reset();
    update();
});
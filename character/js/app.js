$(function () {
    const stage = $('#stage')
    const items = [];

    // レイアウト関連定数
    const maxCol = 4;
    const maxRow = 2;
    const wheelSpeed = 0.5;
    const vRate = 0.95;
    // ランダムサイズフラグ
    const isRandomSize = false;

    // ポインターダウン判別
    let pointerDown = false;

    let H = 0, W = 0, R = 0;
    let X = 0, Y = 0;
    let scrollX = 0, scrollY = 0;
    let offsetX = 0, offsetY = 0;
    let targetX = 0, targetY = 0;
    let lastX = 0, lastY = 0;
    let vx = 0, vy = 0

    worksData.forEach(data => {
        // アイテム作成
        const workEl = createWorkElement(data);

        // ステージにアイテム追加
        stage.append(workEl);

        // itemsにデータ追加
        items.push({
            work: workEl[0],
            image: workEl.find(".image")[0],
            position: { x: data.x, y: data.y, r: data.r }
        });
    });

    function onWheel(event) {
        // マウスホイールの移動量で速度計算
        vx = event.deltaX * wheelSpeed;
        vy = event.deltaY * wheelSpeed;
        event.preventDefault();
    }

    function onPointerDown(event) {
        pointerDown = true;
        lastX = event.pageX;
        lastY = event.pageY;
        vx = 0;
        vy = 0;
    }

    function onPointerMove(event) {
        if (pointerDown) {
            // マウスポインタの現在位置を取得
            const pageX = event.pageX;
            const pageY = event.pageY;

            // 移動速度（vx, vy）を計算
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

    function onResize() {
        const lastR = R;
        const ratio = R / lastR;
        targetX *= ratio;
        targetY *= ratio;
        X *= ratio;
        Y *= ratio;
        reset();
    }

    function reset() {
        // 初期動作用
        vx = 0.01;
        vy = 0.01;

        // ウィンドウの幅、高さ
        W = window.innerWidth;
        H = window.innerHeight;

        // 表示領域の中央を基準にしたオフセット値(offsetX, offsetY)
        offsetX = -W * 0.5;
        offsetY = -H * 0.5;

        // アイテムの位置やサイズの基準となる値
        R = Math.min(W * 0.5, H * 0.5);

        // アイテムの位置を設定
        items.forEach(item => {
            item.work.style.left = (item.position.x * R) + "px";
            item.work.style.top = (item.position.y * R) + "px";
        });

        // スクロール範囲の計算
        scrollX = maxCol * R;
        scrollY = maxRow * R;

        // ウィンドウ比率による調整
        // 横方向: wRate 
        // 縦方向: hRate 
        const wRate = W / (H * (maxCol - 1));
        const hRate = H / (W * (maxRow - 1));

        // 横方向または縦方向の比率が1を超える場合、アイテム座標調整&スクロール範囲拡大
        if (wRate > 1) {
            // 横方向
            items.forEach(item => item.position.x *= wRate);
            scrollX *= wRate;
        } else if (hRate > 1) {
            // 縦方向
            items.forEach(item => item.position.y *= hRate);
            scrollY *= hRate;
        }

        // 画像位置調整
        items.forEach(item => {
            // ランダムサイズ
            if (isRandomSize) {
                item.position.r = 0.6 + Math.random() * 0.4;
            }

            const holeR = item.position.r * R;
            $(item.image).css({
                width: `${holeR}px`,
                height: `${holeR}px`,
                backgroundPosition: `${offsetX}px ${offsetY}px`
            });
        });
    }

    function update() {
        // 現在のX軸とY軸の速度
        vx *= vRate;
        vy *= vRate;

        // 目標位置
        targetX -= vx;
        targetY -= vy;

        if (targetX !== X || targetY !== Y) {
            // 現在の位置を目標位置に近づける
            X += (targetX - X) * 0.5;
            Y += (targetY - Y) * 0.5;

            // ステージ全体の位置を更新
            stage.css("transform", `translate(${X}px, ${Y}px)`);

            // アイテムごとの位置を更新
            items.forEach(item => {
                let frameX = X + item.position.x * R;
                let frameY = Y + item.position.y * R;
                let frameSize = item.position.r * R * 0.5;

                // アイテムが一定範囲を超えた場合に再配置（X軸）
                if (Math.round((frameX + frameSize) / scrollX) !== 0) {
                    item.position.x -= (Math.round((frameX + frameSize)) > 0) ? scrollX / R : -scrollX / R;
                    $(item.work).css("left", `${item.position.x * R}px`);
                    frameX = X + item.position.x * R;
                }

                // アイテムが一定範囲を超えた場合に再配置（Y軸）
                if (Math.round((frameY + frameSize) / scrollY) !== 0) {
                    item.position.y -= (Math.round((frameY + frameSize)) > 0) ? scrollY / R : -scrollY / R;
                    $(item.work).css("top", `${item.position.y * R}px`);
                    frameY = Y + item.position.y * R;
                }
                // 背景位置の更新
                $(item.image).css("background-position", `${offsetX - frameX}px ${offsetY - frameY}px`);
            });
        }

        // 再描画のリクエスト（アニメーション継続）
        window.requestAnimationFrame(update);
    }

    function createWorkElement(data) {
        // 画像領域
        const work = $("<div>")
            .addClass("work")
            .attr("data-pos", { x: data.x, y: data.y, r: data.r });

        // 画像
        const image = $("<div>")
            .addClass("image")
            .css("background-image", `url('${data.image}')`)
            .on({
                mouseover: function () {
                    $(this).animate({ opacity: 0.8 }, 300);
                },
                mouseout: function () {
                    $(this).animate({ opacity: 1.0 }, 300);
                },
                click: function () {
                    // クリック時にモーダルウィンドウでフル表示
                    if (data.href) {
                        location.href = data.href;
                    } else {
                        showModal(data.image);
                    }
                }
            });

        work.append(image);

        return work;
    }

    function showModal(imageUrl) {
        // モーダル背景
        const modalOverlay = $("<div>")
            .addClass("modal-overlay")

        // モーダルウィンドウ
        const modalContent = $("<div>")
            .addClass("modal-content")
            .on("click", function () {
                modalOverlay.fadeOut(300, function () {
                    $(this).remove();
                });
                modalContent.fadeOut(300, function () {
                    $(this).remove();
                });
            });

        // フルサイズ画像
        const fullImage = $("<img>")
            .addClass("full-image")
            .attr('src', imageUrl)

        // モーダル構造を組み立て
        modalContent.append(fullImage);
        $("body").append(modalOverlay).append(modalContent);

        // モーダル表示
        modalOverlay.fadeIn(300);
        modalContent.fadeIn(300);
    }

    // イベントリスナー
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove, { passive: false });
    document.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);

    reset();
    update();
});
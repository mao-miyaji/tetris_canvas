//////////////////////////////////////////
//
// キャンバス1
// ブロック落下画面
//
//////////////////////////////////////////
var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

// draws the board and the moving shape
function render() {
    ctx.clearRect( 0, 0, W, H );

    ctx.strokeStyle = 'silver';
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( board[ y ][ x ] ) {
                ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                drawBlock( x, y );
            }
        }
    }

    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                drawBlock( currentX + x, currentY + y );
            }
        }
    }

    //loseがtrueになったとき
    if (lose) {
        gameOverDisplay();
    }

    //pauseFlgがtrueになったとき
    if (pauseFlg) {
        pauseDisplay();
    }

    //backTopがtrueになったとき
    if (backTop) {
        startDisplay();
    }

}

/**
 * スタートイベント
 */
document.addEventListener("keydown", startGame);
function startGame(e) {
    if (e.keyCode == 13) {
        //Enterが押されたら新規ゲーム開始
        newGame();
        scoreDisplay(0);
        // 一定の遅延間隔を置いて関数を繰り返し呼び出す
        setInterval( render, 30 );
    }
}

/**
 * スタート画面
 */
function startDisplay() {
    ctx.clearRect(0, 0, 300, 600);
    ctx.textAlign = "center";
    ctx.font = "24px 'GAME START'";
    ctx.fillStyle = "white";
    ctx.fillText("GAME START", 150, 280);
    ctx.font = "18px 'PUSH ENTER'";
    ctx.fillText("PUSH ENTER", 150, 320);
}
startDisplay();

/**
 * ゲームーオーバー画面
 */
function gameOverDisplay() {
    ctx.textAlign = "center";
    ctx.font = "30px 'GAME OVER'";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("GAME OVER", 150, 280);
    ctx.font = "18px 'RESTART PUSH ENTER'";
    ctx.fillText("RESTART PUSH ENTER", 150, 320);
}

/**
 * ポーズ画面
 */
function pauseDisplay() {
    ctx.textAlign = "center";
    ctx.font = "30px 'Pause'";
    ctx.fillStyle = "white";
    ctx.fillText("Pause", 150, 280);
    ctx.font = "18px 'RESTART PUSH P'";
    ctx.fillText("RESTART PUSH P", 150, 320);
}


//////////////////////////////////////////
//
// キャンバス2
// スコア画面
//
//////////////////////////////////////////
var canvas2 = document.getElementsByTagName( 'canvas' )[ 1 ];
var ctx2 = canvas2.getContext( '2d' );
/**
 * レベル表示
 * @param {number} level
 */
function levelDisplay(level) {
    ctx2.clearRect(0, 0, 300, 60);
    ctx2.textAlign = "center";
    ctx2.font = "14px 'level'";
    ctx2.fillStyle = "white";
    ctx2.fillText(level, 150, 60);
}
levelDisplay(1);


/**
 * スコア表示
 * @param {number} totalScore
 */
function scoreDisplay(totalScore) {
    ctx2.clearRect(0, 60, 300, 70);
    ctx2.textAlign = "center";
    ctx2.font = "14px 'Score'";
    ctx2.fillText(totalScore, 150, 115);
}
scoreDisplay(0);

/**
 * ハイスコア表示
 * @param {number} highScore
 */
function highScoreDisplay(highScore) {
    ctx2.clearRect(0, 130, 300, 70);
    ctx2.textAlign = "center";
    ctx2.font = "14px 'High Score'";
    ctx2.fillText(highScore, 150, 175);
}
highScoreDisplay(0);


//////////////////////////////////////////
//
// キャンバス3
// ネクストブロック画面
//
//////////////////////////////////////////
var canvas3 = document.getElementsByTagName( 'canvas' )[ 2 ];
var ctx3 = canvas3.getContext( '2d' );

/**
 * 次のブロック描画
 * @param {number[]} nextShape
 * @param {number} nextId
 */
function nextBlockRender(nextShape, nextId) {
    ctx3.clearRect(0, 0, 300, 150);
    ctx3.strokeStyle = 'silver';
    ctx3.fillStyle = colors[nextId];

    for (var i = 0; i < nextShape.length; i++) {
        if (i < 4) {
            if (nextShape[i] === 1) {
                ctx3.fillRect(120+20*i, 20, 20, 20);
                ctx3.strokeRect(120+20*i, 20, 20, 20);
            }
        } else {
            if (nextShape[i] === 1) {
                ctx3.fillRect(120+20*(i-4), 40, 20, 20);
                ctx3.strokeRect(120+20*(i-4), 40, 20, 20);
            }
        }
    }
}

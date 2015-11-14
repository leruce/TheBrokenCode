var board = [
    2, 0, 2, 0, 2, 0, 2, 0,
    0, 2, 0, 2, 0, 2, 0, 2,
    2, 0, 2, 0, 2, 0, 2, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1
];

var selection = -1;

var turn = 1;

var redCheckers = 12;
var blackCheckers = 12;

var chain = false;

var checkersGameOver = false;

var drawBoard = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            if ((x + y) % 2 == 1) {
                ctx.fillStyle = "#990000";
            }
            else ctx.fillStyle = "white";
            ctx.fillRect(x*64,y*64,64,64);
        }
    }
}

var drawPieces = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "grey";
    for (y = 0; y < 8; y++) {
        for (x = 0; x < 8; x++) {
            var temp = board[y * 8 + x];
            if (temp > 0) {
                if (temp % 2 == 1) {
                    ctx.fillStyle = "red";
                }
                else ctx.fillStyle = "black";

                ctx.beginPath();
                ctx.arc((64 * x) + 32, (64 * y) + 32, 30, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.stroke();
                if (temp > 2) {
                    ctx.beginPath();
                    ctx.moveTo((64 * x) + 20, (64 * y) + 24);
                    ctx.lineTo((64 * x) + 26, (64 * y) + 32);
                    ctx.lineTo((64 * x) + 32, (64 * y) + 24);
                    ctx.lineTo((64 * x) + 38, (64 * y) + 32);
                    ctx.lineTo((64 * x) + 44, (64 * y) + 24);
                    ctx.lineTo((64 * x) + 44, (64 * y) + 40);
                    ctx.lineTo((64 * x) + 20, (64 * y) + 40);
                    ctx.fillStyle = "#FFB40D";
                    ctx.fill();
                }
            }
        }
    }
};

var drawInterface = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    if (selection > -1) {
        ctx.strokeStyle = "#FFB40D";
        ctx.lineWidth = 4;
        ctx.strokeRect((selection % 8) * 64 + 2, Math.floor(selection / 8) * 64 + 2, 60, 60);
    }
    if (turn % 2 == 0) {
        ctx.fillStyle = "black";
    }
    else ctx.fillStyle = "red";

    ctx.fillRect(0, 512, 512, 30);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.strokeRect(-5, 517, 522, 30);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 3;
    ctx.font = "bold 16pt Calibri";

    if (turn % 2 == 0) {
        ctx.fillStyle = "white";
        ctx.fillText("Black's Turn", 255, 531);
    }
    else {
        ctx.fillStyle = "black";
        ctx.fillText("Red's Turn", 255, 531);
    }
    ctx.fillText("Red: " + redCheckers, 55, 531);
    ctx.fillText("Black: " + blackCheckers, 452, 531);
};

var refresh = function () {
    drawBoard();
    drawPieces();
    drawInterface();
    if (redCheckers == 0 || blackCheckers == 0) {
        checkersDisplayWinner();
    }
};

var initCheckers = function () {
    board = [
    2, 0, 2, 0, 2, 0, 2, 0,
    0, 2, 0, 2, 0, 2, 0, 2,
    2, 0, 2, 0, 2, 0, 2, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1
    ];

    selection = -1;

    turn = 1;

    checkersGameOver = false;

    chain = false;

    refresh();
};
var getTile = function (x, y) {
    return y * 8 + x;
};
var getCoords = function (hindsight) {
    return [hindsight % 8, Math.floor(hindsight / 8)];
};

var checkersMouseHandler = function (x, y) {
    if(checkersGameOver){
        return;
    }

    var destX = Math.max(0, Math.min(7, Math.floor((x - 10) / 64)));
    var destY = Math.max(0, Math.min(7, Math.floor((y - 10) / 64)));

    if (selection < 0 || board[selection] == 0) {
        selection = destY * 8 + destX;
        refresh();
        return;
    }
    else if (board[getTile(destX, destY)] == 0) {
        var source = getCoords(selection);
        if (board[selection] % 2 == turn % 2) {
            if (Math.abs(source[0] - destX) == Math.abs(source[1] - destY)) {
                if (Math.abs(source[0] - destX) == 1) {
                    if (chain) {
                        chain = false;
                        turn++;
                        selection = -1;
                        refresh();
                        return;
                    }
                    if ((destY < source[1] && board[selection] != 2) || (destY > source[1] && board[selection] != 1)) {
                        turn++;
                        if ((board[selection] < 3) && (destY == 0 || destY == 7)) {
                            board[selection] += 2;
                        }
                        board[getTile(destX, destY)] = board[selection];
                        board[selection] = 0;
                        
                    }
                }
                else if (Math.abs(source[0] - destX) == 2) {
                    if ((destY < source[1] && board[selection] != 2) || (destY > source[1] && board[selection] != 1)) {
                        var midpoint = [(source[0] + destX)/2, (source[1] + destY) / 2];
                        if (board[selection] % 2 != board[getTile(midpoint[0], midpoint[1])] % 2) {
                            if ((destY == 0 || destY == 7) && board[selection] < 3) {
                                board[selection] += 2;
                            }
                            board[getTile(midpoint[0], midpoint[1])] = 0;
                            board[getTile(destX, destY)] = board[selection];
                            if (board[selection] % 2 == 0) {
                                redCheckers--;
                            }
                            else blackCheckers--;
      
                            board[selection] = 0;
                            selection = getTile(destX, destY);
                            
                            refresh();
                            chain = true;
                            return;
                        }
                    }
                }
            }
        }
    }
    if (chain) {
        turn++;
        chain = false;
    }
    selection = -1;
    refresh();
};

var checkersDisplayWinner = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.lineWidth = 3;
    ctx.font = "bold 80pt Calibri";
    ctx.fillStyle = "#FFB40D";
    ctx.strokeStyle = "black";
    if (blackCheckers == 0) {
        ctx.fillText("Red Wins!", 255, 255);
        ctx.strokeText("Red Wins!", 255, 255);
    }
    else {
        ctx.fillText("Black Wins!", 255, 255);
        ctx.strokeText("Black Wins!", 255, 255);
    }

    checkersGameOver = false;
};
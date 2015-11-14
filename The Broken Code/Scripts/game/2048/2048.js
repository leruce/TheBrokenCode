//initialize global variables, and set them to defaults
var rows = [0, 0, 0, 0];
var cols = [0, 0, 0, 0];

var emptySpaces = 16;

var anythingMoved = false;

var victory = false;

//reset all variables to default and begin new game
var init2048 = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#595959";
    ctx.fillRect(0, 0, 510, 510);

    rows = [0, 0, 0, 0];
    cols = [0, 0, 0, 0];

    emptySpaces = 16;

    rowsToCols();
    colsToRows();

    victory = false;

    view();
};

var swipeDown = function () {
    for (x = 0; x < cols.length; x++) {
        cols[x] = bitSwipeRight(cols[x]);
    }
    if (anythingMoved) {
        colsToRows();
        anythingMoved = false;
    }
    return emptySpaces;
};

var swipeUp = function () {
    for (x = 0; x < cols.length; x++) {
        cols[x] = bitSwipeLeft(cols[x], rows.length);
    }
    if (anythingMoved) {
        colsToRows();
        anythingMoved = false;
    }
    return emptySpaces;
};

var swipeLeft = function () {
    for (y = 0; y < rows.length; y++) {
        rows[y] = bitSwipeRight(rows[y]);
    }
    if (anythingMoved) {
        rowsToCols();
        anythingMoved = false;
    }
    return emptySpaces;
};

var swipeRight = function () {
    for (y = 0; y < rows.length; y++) {
        rows[y] = bitSwipeLeft(rows[y], cols.length);
    }
    if (anythingMoved) {
        rowsToCols();
        anythingMoved = false;
    }
    return emptySpaces;
};

var bitSwipeRight = function (rowCol) {
    var input = rowCol;
    var index = 0;
    var check = 0;
    var result = 0;
    
    while (input != 0) {
        if ((input & 15) == 0) {
            input >>= 4;
            anythingMoved = true;
        }
        else if ((input & 15) == check) {
            result += (1 << ((index - 1) * 4));
            input >>= 4;
            check = 0;
            emptySpaces++;
            anythingMoved = true;
        }
        else {
            result += (input & 15) << (index * 4);
            check = input & 15;
            index++;
            input >>= 4;
        }
    }
    return result;
};

var bitSwipeLeft = function (rowCol, length) {
    var input = rowCol;
    var index = length - 1;
    var check = 0;
    var result = 0;

    var scopeLimit = (Math.pow(2, 16) - 1);

    while (input != 0) {
        if ((getValueAtIndex(input, length - 1)) == 0) {
            input <<= 4;
            input &= scopeLimit;
            anythingMoved = true;
        }
        else if ((getValueAtIndex(input, length - 1)) == check) {
            result += (1 << ((index + 1) * 4));
            input <<= 4;
            input &= scopeLimit;
            check = 0;
            emptySpaces++;
            anythingMoved = true;
        }
        else {
            result += (getValueAtIndex(input, length - 1)) << (index * 4);
            check = getValueAtIndex(result, index);
            index--;
            input <<= 4;
            input &= scopeLimit;
        }
    }
    return result;
};

var getValueAtIndex = function (row, index) {
    return ((row >> (index * 4)) & 15);
};

//returns random value between min(inclusive) and max(inclusive)
var randomRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var rowsToCols = function () {
    var num = 1;
    if (randomRange(0, 4) == 4) {
        num = 2;
    }
    var location = randomRange(0, emptySpaces - 1);
    for (x = 0; x < cols.length; x++) {
        for (y = 0; y < rows.length; y++) {
            if (location >= 0 && getTilebyRow(x, y) == 0) {
                if (location == 0) {
                    rows[y] = setTile(rows[y], x, num);
                    emptySpaces--;
                    location--;
                }
                else location--;
            }

            cols[x] = setTile(cols[x], y, getTilebyRow(x, y));
        }
    }
};
var colsToRows = function () {
    var num = 1;
    if (randomRange(0, 4) == 4) {
        num = 2;
    }
    var location = randomRange(0, emptySpaces - 1);
    for (x = 0; x < cols.length; x++) {
        for (y = 0; y < rows.length; y++) {
            if (location >= 0 && getTilebyCol(x, y) == 0) {
                if (location == 0) {
                    cols[x] = setTile(cols[x], y, num);
                    location--;
                    emptySpaces--;
                }
                else location--;
            }
            rows[y] = setTile(rows[y], x, getTilebyCol(x, y));

        }
    }
};

var getTilebyRow = function (x, y) {
    return ((rows[y] >> (x * 4)) & 15);
};

var getTilebyCol = function (x, y) {
    return ((cols[x] >> (y * 4)) & 15);
};

var setTile = function (rowCol, index, value) {
    var check = 15 << (4 * index);
    var result = rowCol - (rowCol & check);
    result += value << (4 * index);
    return result;
};

//Graphics functions
var createTile = function (num, fontSize, fontColor, color) {
    var tile = document.createElement("canvas");
    tile.height = 150;
    tile.width = 150;
    var drawTile = tile.getContext("2d");
    drawTile.scale(1.1, 1.1);
    drawTile.fillStyle = color;
    drawTile.fillRect(0, 0, 100, 100);
    drawTile.fillStyle = fontColor;
    drawTile.font = fontSize + "pt Calibri";
    drawTile.textBaseline = "middle";
    drawTile.textAlign = "center";
    drawTile.fillText(num, 50, 50);
    drawTile.strokeStyle = '#000000';
    drawTile.lineWidth = 4;
    drawTile.strokeRect(2, 2, 96, 96);
    return tile;
};

var isDead = function(){
    if (emptySpaces == 0) {
        for(x = 0; x < cols.length; x++){
            for(y = 0; y < rows.length; y++){
                if (x < (cols.length - 1) && (getTilebyRow(x, y) == getTilebyRow(x + 1, y)))
                    return false;
                if (y < (rows.length - 1) && (getTilebyRow(x, y) == getTilebyRow(x, y + 1)))
                    return false;
            }
        }
        return true;
    }
    else return false;
}

//Canvas of each individual tile
var tiles = [
	createTile('', '', '#000000', '#C3C3C3'),
	createTile('2', '50', '#000000', '#EEE4DA'),
	createTile('4', '50', '#000000', '#EDE0C8'),
	createTile('8', '50', '#000000', '#F2B179'),
	createTile('16', '45', '#000000', '#F59563'),
	createTile('32', '45', '#000000', '#F67C5F'),
	createTile('64', '45', '#000000', '#F65E3B'),
	createTile('128', '40', '#000000', '#EDCF72'),
	createTile('256', '40', '#000000', '#EDCC61'),
	createTile('512', '40', '#000000', '#EDC850'),
	createTile('1024', '30', '#000000', '#EDC53F'),
	createTile('2048', '30', '#000000', '#EDC22E')
];

var view = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    for (k = 0; k < 4; k++) {
        for (q = 0; q < 4; q++) {
            var tileNum = getTilebyRow(k, q);
            if (tileNum > 10) {
                victory = true;
            }
            ctx.drawImage(tiles[tileNum], 20 * (k + 1) + 100 * (k), 20 * (q + 1) + 100 * (q));
        }
    }
};

var inputHandler = function (code) {
    if (victory) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#EDC22E";
        ctx.lineWidth = 1;
        ctx.font = "bold 64pt Calibri";
        ctx.fillText("YOU WIN", 255, 255);
        ctx.strokeText("YOU WIN", 255, 255);
        return;
    }
     else if (isDead()) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.lineWidth = 1;
        ctx.font = "bold 64pt Calibri";
        ctx.fillText("GAME OVER", 255, 255);
        ctx.strokeText("GAME OVER", 255, 255);
        return;
    }
    switch (code) {
        case 0:
            swipeDown();
            break;
        case 1:
            swipeUp();
            break;
        case 2:
            swipeLeft();
            break;
        case 3:
            swipeRight();
            break;
        case 4:
            init2048();
            break;
        default:

            break;
    }
    view();
};
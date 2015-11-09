//initialize global variables, and set them to defaults
var rows = [0, 0, 0, 0];
var cols = [0, 0, 0, 0];

var emptySpaces = 16;

var anythingMoved = false;

//reset all variables to default and begin new game
var initialize = function (dimensions) {
    rows = [0, 0, 0, 0];
    cols = [0, 0, 0, 0];

    rowcheck = Math.pow(2, 32) - 1;
    rowcheck = rowcheck >> (31 - (dimensions * 4));
    colcheck = rowcheck;

    emptySpaces = dimensions * dimensions;

    rowsToCols();
    colsToRows();
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
    for(x = 0; x < cols.length; x++){
        cols[x] = bitSwipeRight(cols[x]);
    }
    if (anythingMoved) {
        colsToRows();
        anythingMoved = false;
    }
    return emptySpaces;
}

var swipeLeft = function () {
    for (y = 0; y < rows.length; y++) {
        rows[y] = bitSwipeRight(rows[y]);
    }
    if (anythingMoved) {
        rowsToCols();
        anythingMoved = false;
    }
    return emptySpaces;
}

var swipeRight = function () {
    for (y = 0; y < rows.length; y++) {
        rows[y] = bitSwipeLeft(rows[y], cols.Length);
    }
    if (anythingMoved) {
        rowsToCols();
        anythingMoved = false;
    }
    return emptySpaces;
}

var bitSwipeRight = function (rowCol) {
    var input = rowCol;
    var index = max(length - 1, 0);
    var check = 0;
    var result = 0;
    
    while (input != 0) {
        if (input & 15 == 0) {
            input >>= 4;
            anythingMoved = true;
        }
        else if ((input & 15) == check) {
            result += 1 << (index - 1) * 4;
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

    var scopeLimit = (Math.pow(2, 32) - 1) >> (31 - length * 4);

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

var randomRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var rowsToCols = function () {
    var num = 1;
    if (randomRange(0, 4) == 4) {
        num++;
    }
    var location = randomRange(0, emptySpaces);
    for (x = 0; x < cols.Length; x++) {
        for (y = 0; y < rows.Length; y++) {
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
        num++;
    }
    var location = randomRange(0, emptySpaces);
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


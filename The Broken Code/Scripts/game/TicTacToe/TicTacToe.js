//This game is tic tac toe
//Concept is bloody simple
//Use a canvas as the base
//Use a grid behind it
//0 = empty
//1 = X
//2 = O
//The game should have 3 functions
//First Function is Draw Board
//		Allows you to draw the grid we using to play the game
//Second Function is GameSystem
//		Allow you to Check if you won or not 
//		Allow you to click the table/grid and make sure it valid
//		Update the  grid on the front end!
//Third Function is I dunno just in case

var Grid = [[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]];
var GlobalCanvas;
var GlobalDrawBoard;
var GlobalPlayer;
var Clicked = 0;
var col = 3;
var row = 3;
var SqWidth = 200;
var SqHeight = 200;
var BoardWidth = 601;
var BoardHeight = 601;
var GlobalBoardConext;
//Considering how simple it is to determine the winning by lisitng it out, we may consider doing so ie
//1,2,3 or 4,5,6 or 7,8,9 for the rows win
//1,4,7 or 2,5,8 or 3,6,9 for the col wins
//1,5,9 or 3,5,7 for the dia wins
//Make sure you add +1 we don't take account for 0 at the start
function createBoard(canvas) {
    //This create Board
    //We assume that each sq is 100 px
    //We need to create one large one then slice  it up to smaller parts
    //We draw base on the grid we created
    GlobalBoardConext.clearRect(0, 0, BoardWidth, BoardHeight);
    GlobalBoardConext.beginPath();

    //Draw the 2 lines/ hashtag
    for (var r = 0; r < BoardWidth; r += SqWidth) {
        if (r == 0) {
            continue;
        }
        if (r == 600) {
            continue;
        }
        GlobalBoardConext.moveTo(.5 + r, 0);
        GlobalBoardConext.lineTo(.5 + r, BoardHeight);
    }

    for (var c = 0; c < BoardHeight; c += SqHeight) {
        if (c == 0) {
            continue;
        }
        if (c == 600) {
            continue;
        }
        GlobalBoardConext.moveTo(0, .5 + c);
        GlobalBoardConext.lineTo(BoardWidth, .5 + c);
    }
    GlobalBoardConext.strokeStyle = "#000000";
    GlobalBoardConext.stroke();


    //Need to fill in the board
    //use the  grid we have to draw it in
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
            //This  compare  coord
            var Slot = Grid[r][c];
            if (Slot == 0) {
                continue;
            }
            else if (Slot == 1) {
                GlobalBoardConext.font = "Bold 100px sans-serif";
                GlobalBoardConext.fillText("X", r * SqHeight + 50, c * SqWidth + 125);
                //Draw an X
            }
            else if (Slot == 2) {
                //Draw an O
                GlobalBoardConext.font = "Bold 100px sans-serif";
                GlobalBoardConext.fillText("O", r * SqHeight + 50, c * SqWidth + 125);
            }
        }
    }
    //Now we know we can always keep drawing over the current stuff
    //Next coruse of action would be Figure out how to click the damn canvas
}

//Let make a new function for game start
function Slot(row, col) {
    this.row = row;
    this.col = col;
}
function getLoc(e) {
    var xCoord;
    var yCoord;
    if (e.pageX != undefined && e.pageY != undefined) {
        xCoord = e.pageX;
        yCoord = e.pageY;
    }
    else {
        xCoord = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        yCoord = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    xCoord -= GlobalCanvas.offsetLeft;
    yCoord -= GlobalCanvas.offsetTop;
    xCoord = Math.min(xCoord, BoardWidth * SqWidth);
    yCoord = Math.min(yCoord, BoardHeight * SqHeight);
    var slot = new Slot(Math.floor(xCoord / 200), Math.floor(yCoord / 200));
    return slot;
}
function GameClick(e) {
    var slot = getLoc(e);
    //console.log(slot.row);
    //console.log(slot.col);
    //We got the  map ready. Now we need to check for player 
    //We say player1 is X and PLayer2 is 0
    //We check the grid first
    if (Grid[slot.row][slot.col] == 0) {
        //Now we check who turn it is
        if (GlobalPlayer == 0) {
            Grid[slot.row][slot.col] = 1;
            GlobalPlayer = 1;
            Clicked++;
        }
        else {
            Grid[slot.row][slot.col] = 2;
            GlobalPlayer = 0;
            Clicked++;

        }
        console.log(Clicked);
    }
    else {
        alert("Slot already selected!");
    }
    createBoard(GlobalCanvas);
    var Test = CheckWin();
    if (Clicked == 9) {
        alert("Players managed to cat's game it!");
    }
    if (Test == true || Clicked == 9) {
        for (r = 0; r < 3; r++) {
            for (c = 0; c < 3; c++) {
                Grid[r][c] = 0;
            }
        }
        Clicked = 0;
        createBoard(GlobalCanvas);
    }


}
function GameStart(canvas) {
    GlobalCanvas = canvas;
    GlobalCanvas.width = BoardWidth;
    GlobalCanvas.height = BoardHeight;
    GlobalCanvas.addEventListener("click", GameClick, false);
    GlobalBoardConext = GlobalCanvas.getContext("2d")
    GlobalPlayer = 0;
    createBoard(GlobalCanvas);

}

function CheckWin() {
    //Check if you win
    //Fastest method is to already have a predefined set of wins
    //ie 1,2,3 / 4,5,6 / 7,8,9 / 1,4,7 / 2,5,8 / 3,6,9 / 1,5,9 / 3,5,7
    //2nd Method would be brute force
    //We check each row if there any same values
    //We check each col
    //We check the dia

    var WinTrigger;
    for (var i = 0; i < 3; i++) {
        var LazySlot = Grid[0][i];
        var LazySlot2 = Grid[1][i];
        var LazySlot3 = Grid[2][i];
        var LazySlot4 = Grid[i][0];
        var LazySlot5 = Grid[i][1];
        var LazySlot6 = Grid[i][2];
        var LazySlot7 = Grid[0][0];
        var LazySlot8 = Grid[1][1];
        var LazySlot9 = Grid[2][2];
        var LazySlot10 = Grid[0][2];
        var LazySlot11 = Grid[2][0];
        //This check Rows
        if (LazySlot == LazySlot2 && LazySlot == LazySlot3 && LazySlot != 0) {
            WinTrigger = LazySlot;
        }
        if (LazySlot4 == LazySlot5 && LazySlot5 == LazySlot6 && LazySlot4 != 0) {
            WinTrigger = LazySlot4;
        }
        if (LazySlot7 == LazySlot8 && LazySlot7 == LazySlot9 && LazySlot7 != 0) {
            WinTrigger = LazySlot7;
        }
        if (LazySlot10 == LazySlot8 && LazySlot10 == LazySlot11 && LazySlot10 != 0) {
            WinTrigger = LazySlot10;
        }
        if (WinTrigger == 1) {
            alert("Player One won!");
            return true;
        }
        else if (WinTrigger == 2) {
            alert("Player Two Won!");
            return true;
        }
    }
    return false;
}

//Now we need a reset when won.



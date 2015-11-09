//This is a connect four game
//Created by Garrett Addington
//This is created for Project
//Started 10/27/15
//Verison 1.0

//CreateBoard Function
//It creates a game board that initally blank.
//We use the 7 by 6 board

//Click Function
//If we click a colmnn  it will automically add in a bottom row.
//So we need to create a 7 column clickable. 

//Game System Function
//This determine the if the game is won if not reset the board if so. 

//We use a grid system as our base
//int number code system is
//0 = blank
//1 = Player 1
//2 = Player 2

var C4Grid = [[0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]];

var C4GlobalCanvas;
var C4GlobalDrawBoard;
var C4GlobalPlayer = 1;
var C4Clicked = 0;
var C4col = 7;
var C4row = 6;
var C4SqWidth = 100;
var C4SqHeight = 100;
var C4BoardWidth = 701;
var C4BoardHeight = 601;
var C4GlobalBoardConext;
var Count = 0;
var winnerTrue = false;

//Winning Conditions is when in row have 4 column with the 1 or 2; when in coulmn have 4 rows that consist of 1 or 2 and lastly when 4 where it diagonial. 

function C4createBoard(canvas) {
    //This create Board
    //We assume that each sq is 100 px
    //We need to create one large one then slice  it up to smaller parts
    //We draw base on the grid we created
    C4GlobalBoardConext.clearRect(0, 0, C4BoardWidth, C4BoardHeight);
    C4GlobalBoardConext.beginPath();

    //Draw the 2 lines/ hashtag
    for (var c = 0; c < C4BoardWidth; c += C4SqWidth) {
        C4GlobalBoardConext.moveTo(.5 + c, 0);
        C4GlobalBoardConext.lineTo(.5 + c, C4BoardHeight);
    }

    for (var r = 0; r < C4BoardHeight; r += C4SqHeight) {
        C4GlobalBoardConext.moveTo(0, .5 + r);
        C4GlobalBoardConext.lineTo(C4BoardWidth, .5 + r);
    }
    C4GlobalBoardConext.strokeStyle = "#000000";
    C4GlobalBoardConext.stroke();


    //Need to fill in the board
    //use the  grid we have to draw it in
    for (var r = 0; r < C4row; r++) {
        for (var c = 0; c < C4col; c++) {
            //This  compare  coord
            var C4Slot = C4Grid[r][c];
           // console.log(C4Slot + "=" + r + "by " + c );
            if (C4Slot == 0) {
                continue;
            }
            else if (C4Slot == 1) {
                C4GlobalBoardConext.font = "Bold 100px sans-serif";
                C4GlobalBoardConext.fillStyle = "red";
                C4GlobalBoardConext.fillText("O", c * C4SqWidth +10, r * C4SqHeight+85);
            }
            else if (C4Slot == 2) {
                //Draw an O
                C4GlobalBoardConext.font = "Bold 100px sans-serif";
                C4GlobalBoardConext.fillStyle = "blue";
                C4GlobalBoardConext.fillText("O", c * C4SqWidth + 10, r * C4SqHeight +85);
                //console.log("I see it filled");
            }
        }
    }
    //Now we know we can always keep drawing over the current stuff
    //Next coruse of action would be Figure out how to click the damn canvas
}

function C4Slot(row, col) {
    this.row = col;
    this.col = row;
}

function C4GameStart(canvas) {
    C4GlobalCanvas = canvas;
    C4GlobalCanvas.width = C4BoardWidth;
    C4GlobalCanvas.height = C4BoardHeight;
    C4GlobalCanvas.addEventListener("click", C4GameClick, false);
    C4GlobalBoardConext = C4GlobalCanvas.getContext("2d")
    C4GlobalPlayer = 1;
    C4createBoard(C4GlobalCanvas);

}

function C4getLoc(e) {
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
    xCoord -= C4GlobalCanvas.offsetLeft;
    yCoord -= C4GlobalCanvas.offsetTop;
    xCoord = Math.min(xCoord, C4BoardWidth * C4SqWidth);
    yCoord = Math.min(yCoord, C4BoardHeight * C4SqHeight);
    var slot = new C4Slot(Math.floor(xCoord / 100), Math.floor(yCoord / 100));
    return slot;
}

function C4GameClick(e) {
    var slot = C4getLoc(e);
    console.log("Column: " + slot.col + "Row: " + slot.row + "Grid: " + C4Grid[slot.row][slot.col]);
    //We go down the row of THAT col
    for (var i = 5; i >= 0; i--) {
        //console.log(i);
        if (C4Grid[i][slot.col] == 0) {
            if (i == 0) {
                C4Grid[i][slot.col] = C4GlobalPlayer;
                //console.log("It Stuck here damnit");
                C4Clicked++;
                break;
            }
            else {
                //console.log("We get in to the 0 Test");
                //console.log(i - 1);
                C4Grid[i][slot.col] = C4GlobalPlayer;
                C4Clicked++;
                break;
            }
        }


    }
    if (C4GlobalPlayer == 1) {
        C4GlobalPlayer = 2;
    }
    else {
        C4GlobalPlayer = 1;
    }

    C4createBoard(C4GlobalCanvas);
    var TestWin = C4CheckWin();
    if (C4Clicked == 42) {
        alert("Game is a TIE!");
    }
    if (TestWin == true) {
        alert("WINNER IS " +C4GlobalPlayer);
    }
    if (TestWin == true || C4Clicked == 42) {
        C4Grid = [[0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0]];

        C4Clicked = 0;
        C4createBoard(C4GlobalCanvas);
    }
}

function C4CheckWin() {
    //We need to check rows wins
    //We need to check Col Wins
    //This is row check
    //We need to check if they back to back
    for (var c = 0; c < 7; c++) {
        for (var r = 0; r < 6; r++) {
            if (C4Grid[r][c] != 0) {
                //This make sure we not comparing 0s which is nulls
                if (r+1 == 6) {

                }
                else if (C4Grid[r][c] == C4Grid[r + 1][c]) {
                    //This check if the row below us match the one above us
                    //if so we add count
                    Count++;
                    //console.log(Count);
                }
                else {
                    //else reset count to 0
                    Count = 0;
                }
            }
            if (Count == 3) {
                return true;
            }
        }
        Count = 0;

    }
    for (var r = 0; r < 6; r++) {
        for (var c = 0; c < 7; c++) {
            if (C4Grid[r][c] != 0) {
                if (c + 1 == 7) {

                }
                else if (C4Grid[r][c] == C4Grid[r][c + 1]) {
                    Count++
                }
                else {
                    Count = 0;
                }
            }
            if (Count == 3) {
                return true;
            }
        }
        Count = 0;
    }
}
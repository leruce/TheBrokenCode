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
var C4GlobalPlayer;
var C4Clicked = 0;
var C4col = 7;
var C4row = 6;
var C4SqWidth = 100;
var C4SqHeight = 100;
var C4BoardWidth = 701;
var C4BoardHeight = 601;
var C4GlobalBoardConext;

//Winning Conditions is when in row have 4 column with the 1 or 2; when in coulmn have 4 rows that consist of 1 or 2 and lastly when 4 where it diagonial. 

function C4createBoard(canvas) {
    //This create Board
    //We assume that each sq is 100 px
    //We need to create one large one then slice  it up to smaller parts
    //We draw base on the grid we created
    C4GlobalBoardConext.clearRect(0, 0, C4BoardWidth, C4BoardHeight);
    C4GlobalBoardConext.beginPath();

    //Draw the 2 lines/ hashtag
    for (var r = 0; r < C4BoardWidth; r += C4SqWidth) {
        if (r == 0) {
            continue;
        }
        if (r == 700) {
            continue;
        }
        C4GlobalBoardConext.moveTo(.5 + r, 0);
        C4GlobalBoardConext.lineTo(.5 + r, C4BoardHeight);
    }

    for (var c = 0; c < C4BoardHeight; c += C4SqHeight) {
        if (c == 0) {
            continue;
        }
        if (c == 600) {
            continue;
        }
        C4GlobalBoardConext.moveTo(0, .5 + c);
        C4GlobalBoardConext.lineTo(C4BoardWidth, .5 + c);
    }
    C4GlobalBoardConext.strokeStyle = "#000000";
    C4GlobalBoardConext.stroke();


    //Need to fill in the board
    //use the  grid we have to draw it in
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
            //This  compare  coord
            var C4Slot = Grid[r][c];
            if (C4Slot == 0) {
                continue;
            }
            else if (C4Slot == 1) {
                C4GlobalBoardConext.font = "Bold 50px sans-serif";
                C4GlobalBoardConext.fillText("X", r * C4SqHeight, c * C4SqWidth);
                //Draw an X
            }
            else if (C4Slot == 2) {
                //Draw an O
                C4GlobalBoardConext.font = "Bold 50px sans-serif";
                C4GlobalBoardConext.fillText("O", r * C4SqHeight, c * C4SqWidth);
            }
        }
    }
    //Now we know we can always keep drawing over the current stuff
    //Next coruse of action would be Figure out how to click the damn canvas
}
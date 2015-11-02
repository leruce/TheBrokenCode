var OTGrid = [[2, 0, 2, 0, 2, 0, 2, 0],
              [0, 2, 0, 2, 0, 2, 0, 2],
              [2, 0, 2, 0, 22, 0, 2, 0],
              [0, 3, 0, 3, 0, 3, 0, 3],
              [3, 0, 3, 0, 3, 0, 3, 0],
              [0, 11, 0, 12, 0, 1, 0, 1],
              [1, 0, 1, 0, 1, 0, 1, 0],
              [0, 1, 0, 1, 0, 1, 0, 1]];
//3 is vaild place to move
//2 is player 2 21 is queen 22 is clicked for normal piece 23 is clicked for queen piece
//1 is player 1 11 is queen 12 is clicked for normal piece 13 is clicked for qeen piece
//0 is Nonselectable areas
var OTGlobalCanvas;
var getPossibleMove = [];
var OTGlobalDrawBoard;
var OTGlobalPlayer;
var OtherPlayer;
var OTClicked = 0;
var OTcol = 8;
var OTrow = 8;
var OTSqWidth = 80;
var OTSqHeight = 80;
var OTBoardWidth = 641;
var OTBoardHeight = 641;
var OTGlobalBoardConext;
var Count = 0;
var winnerTrue = false;

//Winning Conditions is when in row have 4 column with the 1 or 2; when in coulmn have 4 rows that consist of 1 or 2 and lastly when 4 where it diagonial. 

function OTcreateBoard(canvas) {
    //This create Board
    //We assume that each sq is 100 px
    //We need to create one large one then slice  it up to smaller parts
    //We draw base on the grid we created
    OTGlobalBoardConext.clearRect(0, 0, OTBoardWidth, OTBoardHeight);
    OTGlobalBoardConext.beginPath();

    //Draw the 2 lines/ hashtag
    for (var c = 0; c < OTBoardWidth; c += OTSqWidth) {
        OTGlobalBoardConext.moveTo(.5 + c, 0);
        OTGlobalBoardConext.lineTo(.5 + c, OTBoardHeight);
    }

    for (var r = 0; r < OTBoardHeight; r += OTSqHeight) {
        OTGlobalBoardConext.moveTo(0, .5 + r);
        OTGlobalBoardConext.lineTo(OTBoardWidth, .5 + r);
    }
    OTGlobalBoardConext.strokeStyle = "#000000";
    OTGlobalBoardConext.stroke();


    //Need to fill in the board
    //use the  grid we have to draw it in
    for (var r = 0; r < OTrow; r++) {
        for (var c = 0; c < OTcol; c++) {
            //This  compare  coord
            var OTSlot = OTGrid[r][c];
            // console.log(C4Slot + "=" + r + "by " + c );
            if (OTSlot == 0) {
                OTGlobalBoardConext.rect(c * OTSqWidth, r * OTSqHeight, 80, 80);
                OTGlobalBoardConext.fillStyle = "black";
                OTGlobalBoardConext.fill();
            }
            else if (OTSlot == 1) {
                OTGlobalBoardConext.font = "Bold 80px sans-serif";
                OTGlobalBoardConext.fillStyle = "red";
                OTGlobalBoardConext.fillText("O", c * OTSqWidth + 10, r * OTSqHeight + 70);
            }
            else if (OTSlot == 2) {
                //Draw an O
                OTGlobalBoardConext.font = "Bold 80px sans-serif";
                OTGlobalBoardConext.fillStyle = "black";
                OTGlobalBoardConext.fillText("O", c * OTSqWidth + 10, r * OTSqHeight + 70);
                //console.log("I see it filled");
            }
            else if (OTSlot == 3) {


            }
            else if (OTSlot == 11) {
                OTGlobalBoardConext.font = "Bold 40px sans-serif";
                OTGlobalBoardConext.fillStyle = "red";
                OTGlobalBoardConext.fillText("O", c * OTSqWidth + 26, r * OTSqHeight + 55);
                OTGlobalBoardConext.font = "Bold 80px sans-serif";
                OTGlobalBoardConext.fillStyle = "red";
                OTGlobalBoardConext.fillText("O", c * OTSqWidth + 10, r * OTSqHeight + 70);
            }
            else if (OTSlot == 21) {
                OTGlobalBoardConext.font = "Bold 40px sans-serif";
                OTGlobalBoardConext.fillStyle = "black";
                OTGlobalBoardConext.fillText("O", c * OTSqWidth + 26, r * OTSqHeight + 55);
                OTGlobalBoardConext.font = "Bold 80px sans-serif";
                OTGlobalBoardConext.fillStyle = "black";
                OTGlobalBoardConext.fillText("O", c * OTSqWidth + 10, r * OTSqHeight + 70);
            }

        }
    }
    //Now we know we can always keep drawing over the current stuff
    //Next coruse of action would be Figure out how to click the damn canvas
}

function OTSlot(row, col) {
    this.row = col;
    this.col = row;
}

function OTGameStart(canvas) {
    OTGlobalCanvas = canvas;
    OTGlobalCanvas.width = OTBoardWidth;
    OTGlobalCanvas.height = OTBoardHeight;
    OTGlobalCanvas.addEventListener("click", OTGameClick, false);
    OTGlobalBoardConext = OTGlobalCanvas.getContext("2d")
    OTGlobalPlayer = 1;
    OtherPlayer = 2;
    OTcreateBoard(OTGlobalCanvas);

}

function OTgetLoc(e) {
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
    xCoord -= OTGlobalCanvas.offsetLeft;
    yCoord -= OTGlobalCanvas.offsetTop;
    xCoord = Math.min(xCoord, OTBoardWidth * OTSqWidth);
    yCoord = Math.min(yCoord, OTBoardHeight * OTSqHeight);
    var slot = new OTSlot(Math.floor(xCoord / 80), Math.floor(yCoord / 80));
    return slot;
}

function OTGameClick(e) {
    var slot = OTgetLoc(e);
    
    //We assume that player one can ONLY move up unless queen
    //We assue playeer 2 can only move down unless queen
    //This is player 1 normal piece
    console.log(slot.row + " " + slot.col);

    OTcreateBoard(OTGlobalCanvas);
}

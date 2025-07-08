const data = (function () {

    const gameBoard = {
        gameBoard: [["","",""],
                    ["","",""],
                    ["","",""]],
                }
 
// Player Definitions
    const playerOne = {
        playerName: {
            firstName: "Arminas",
            lastName: "Bartkus",
        },
        playerScore: 0,
        playerMark: "X", //make pickable
        isMyTurn: null,
    }

    const playerTwo = {
        playerName: {
            firstName: "Emma",
            lastName: "Beattie",
        },
        playerScore: 0,
        playerMark: "O",
        isMyTurn: null,
    }

    return {playerOne, playerTwo, gameBoard};
  
})()

const gameController = {

    startGame: function() {
        data.playerOne.isMyTurn = true;
    },

    checkForOverrideAttempts: function(locationY, locationX) {
        
        let currentGameBoard = data.gameBoard.gameBoard;
        let currentGameBoardRow = currentGameBoard[locationY];
        let currentGameBoardCell = currentGameBoardRow[locationX];

        if (currentGameBoardCell != "") {console.log("Erro!")}
            // THIS IS IF TRYING TO OVERRIDE
    },

    checkForWin: function(currentGameBoard) {
        
        console.log(currentGameBoard);
        let [row1, row2, row3] = currentGameBoard;






        const isFullCriteria = (gridSquare) => {return gridSquare !== ""}
        
        let brokenDownBoard = [];
        currentGameBoard.forEach((item) => item.forEach((element) => {brokenDownBoard.push(element)}));

        brokenDownBoard.every(isFullCriteria); 
    
        // if  ((a === b && b === c) || (d === e && e === f) || (g === h && h === i) || (a === d && d === g) || (b === e && e === h)
        //      || (c === f && f === i) || (a === e && e === i) || (c === e && e === g)) {
        //     console.log("win")
        //     this.declareWinner();
        // }

        // else
         if (brokenDownBoard.every(isFullCriteria)) {
            console.log("draw");
        }

        else {
            this.swapPlayerTurns();
            console.log("continue game")
            
            //  console.log(data.playerOne.isMyTurn) 
            // console.log(data.playerTwo.isMyTurn) 
        }

    },

    swapPlayerTurns: function() {

        if (data.playerOne.isMyTurn === true) {
            data.playerOne.isMyTurn = false;
            data.playerTwo.isMyTurn = true;
        }
        else if (data.playerTwo.isMyTurn === true) {
            data.playerTwo.isMyTurn = false;
            data.playerOne.isMyTurn = true;
        }
    },
    
    declareWinner: function() {
    },

createMark: function(row, column) {
  
    this.checkForOverrideAttempts(row, column)

    let sign;

    if (data.playerOne.isMyTurn === true) {
        sign = "X";
    }
    else {sign = "O"}



        const currentGameBoard = data.gameBoard.gameBoard;

        const foundRow = currentGameBoard[row];
        foundRow[column] = sign;

        this.checkForWin(currentGameBoard);
    },
}

gameController.startGame();
gameController.createMark(1,1);
gameController.createMark(1,2);
gameController.createMark(1,0);

gameController.createMark(0,0);

gameController.createMark(0,1);

gameController.createMark(2,0);

gameController.createMark(0,2);

gameController.createMark(2,1);

gameController.createMark(2,2);


const data = (function () {

    const gameBoard = {
        gameBoard: [["1","X","X"],
                    ["4","","6"],
                    ["7","8","9"]],
                }
 
// Player Definitions
    const playerOne = {
        playerName: {
            firstName: "Arminas",
            lastName: "Bartkus",
        },
        playerScore: 0,
        playerMark: "X"
    }

    const playerTwo = {
        playerName: {
            firstName: "Emma",
            lastName: "Beattie",
        },
        playerScore: 0,
        playerMark: "O"
    }

    return {playerOne, playerTwo, gameBoard};
  
})()

const gameController = {

    checkForWin: function() {
        
        let currentGameBoard = data.gameBoard.gameBoard;
        let [[a, b, c], [d, e, f], [g, h, i]] = data.gameBoard.gameBoard;


        const isFullCriteria = (gridSquare) => {return gridSquare !== ""}
        
        let brokenDownBoard = [];
        currentGameBoard.forEach((item) => item.forEach((element) => {brokenDownBoard.push(element)}));

        brokenDownBoard.every(isFullCriteria); 
    
        if  ((a === b && b === c) || (d === e && e === f) || (g === h && h === i) || (a === d && d === g) || (b === e && e === h)
             || (c === f && f === i) || (a === e && e === i) || (c === e && e === g)) {
            console.log("win")
            this.declareWinner();
        }

        else if (brokenDownBoard.every(isFullCriteria)) {
            console.log("draw");
        }

        else {
            this.managePlayerTurns();
            console.log("continue game")
        }

    },

    managePlayerTurns: function() {
    },
    
    declareWinner: function() {
    },

createMark: function(sign, row, column) {
  
        const currentGameBoard = data.gameBoard.gameBoard;

        const foundRow = currentGameBoard[row];
        foundRow[column] = sign;

        this.checkForWin(currentGameBoard);
    },
}

gameController.createMark("X", 0, 0)
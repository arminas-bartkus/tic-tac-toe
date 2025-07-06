const initial = (function () {

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
    }

    const playerTwo = {
        playerName: {
            firstName: "Emma",
            lastName: "Beattie",
        },
        playerScore: 0,
    }

    return {playerOne, playerTwo, gameBoard};
  
})()

console.log(initial.gameBoard[1]);

const gameController = {

    checkForWin: function() {
    },

    managePlayerTurns: function() {
    },
    
    declareWinner: function() {
    },

createMark: function(sign, row, column) {
  
        let currentGameBoard = initial.gameBoard.gameBoard;

        foundRow = currentGameBoard[row];
        foundRow[column] = sign;

        currentGameBoard[row] = foundRow;
    },
}
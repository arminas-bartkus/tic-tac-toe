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

const gameController = {

    checkForWin: function() {
    },

    managePlayerTurns: function() {
    },
    
    declareWinner: function() {
    },

createMark: function(sign, [[row], [column]]) {
        let playerSign = sign;
        let location = [row, column];

        let currentGameBoard = initial.gameBoard;
        
        currentGameBoard[location] = playerSign;
        console.log(currentGameBoard);
        console.log(initial.gameBoard)
    },


}
gameController.createMark("X", [[1],[1]]);
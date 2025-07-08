const data = (function () {
    //Get Dom Elements
    
    gridCells = document.querySelectorAll(".cell");
    addListeners();
    
    
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

    function addListeners() {
         
        gridCells.forEach((cell => {
            cell.addEventListener("click", function() {
                gameController.createMark(cell.dataset.row, cell.dataset.col); 
            })
        }));
    }


    return {playerOne, playerTwo, gameBoard};
  
})();

const gameController = {

    startGame: function() {
        data.playerOne.isMyTurn = true;
    },

    checkForOverrideAttempts: function(locationY, locationX) {
        
        let currentGameBoard = data.gameBoard.gameBoard;
        let currentGameBoardRow = currentGameBoard[locationY];
        let currentGameBoardCell = currentGameBoardRow[locationX];

        if (currentGameBoardCell != "") {return true;}
            // THIS IS IF TRYING TO OVERRIDE
    },
    checkForWin: function(currentGameBoard) {
        
        console.log(currentGameBoard);
        let [[a, b, c], [d, e, f], [g, h, i]] = currentGameBoard;

        
        
        let brokenDownBoard = [];
        currentGameBoard.forEach((item) => item.forEach((element) => {brokenDownBoard.push(element)}));
        const isFullCriteria = (gridSquare) => {return gridSquare !== ""}
        brokenDownBoard.every(isFullCriteria); 
    
        if  ((a === b && b === c && (b === "X" || b === "O")) || (d === e && e === f && (e === "X" || e === "O")) 
        || (g === h && h === i && (h === "X" || h === "O")) || (a === d && d === g && (d === "X" || d === "O")) 
        || (b === e && e === h && (e === "X" || e === "O")) || (c === f && f === i && (f === "X" || f === "O")) 
        || (a === e && e === i && (e === "X" || e === "O")) || (c === e && e === g) && (e === "X" || e === "O")) {

            let winner = ""
            if (data.playerOne.isMyTurn === true) {
                winner = data.playerOne.playerName;
                data.playerOne.playerScore++;
            }
            else {
                winner = data.playerTwo.playerName;
                data.playerOne.playerScore++;
            }

            this.declareWinner(winner);
        }

        else if (brokenDownBoard.every(isFullCriteria)) {
            
            console.log("draw");
            // show model with reset point
        }

        else {

            // continue game
            this.swapPlayerTurns();
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
    
    declareWinner: function(winner) {

        console.log("The winner is " + winner.firstName + " " + winner.lastName)
        data
    },

    createMark: function(row, column) {
    
        let sign;

        if(this.checkForOverrideAttempts(row, column)) {}

        else {

            if (data.playerOne.isMyTurn === true) {
                sign = "X";
            }
            else {
                sign = "O";
            }

            //Place x or o at location

            newSymbol = document.createElement("img");

            if (sign === "X") {
                newSymbol.setAttribute("src", "./img/crossed.png");
                newSymbol.setAttribute("alt", "A cross");
            }

            else {
                newSymbol.setAttribute("src", "./img/letter-o.png");
                newSymbol.setAttribute("alt", "A nought")
            }
            
            //grid cells is currently global, fix?
            
            stringForQuerySelector = "div[data-row = '" + row.toString() + "']" + "[data-col='" + column.toString() +"']";
            cellToEdit = document.querySelector(stringForQuerySelector);
            cellToEdit.appendChild(newSymbol);

            const currentGameBoard = data.gameBoard.gameBoard;
            const foundRow = currentGameBoard[row];
            foundRow[column] = sign;

        this.checkForWin(currentGameBoard);

        }
    },
}

gameController.startGame();

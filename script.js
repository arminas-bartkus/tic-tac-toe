const data = (function () {
    //Get Dom Elements
    
    const gridCells = document.querySelectorAll(".cell");
    
    const playerOneModal = document.querySelector(".playerOneModal");
    const playerTwoModal = document.querySelector(".playerTwoModal");
    const winnerDisplayModal = document.querySelector(".winnerDisplay");


    const addDataBtn = document.querySelector(".addDataBtn");

    const submitPlayerOneBtn = document.querySelector(".submitPlayerOne");
    const submitPlayerTwoBtn = document.querySelector(".submitPlayerTwo");
    
    // Player Data
    const pOneFirstNameInput = document.querySelector("#playerOneFirstName");
    const pOneLastNameInput = document.querySelector("#playerOneLastName");
    const pTwoFirstNameInput = document.querySelector("#playerTwoFirstName");
    const pTwoLastNameInput = document.querySelector("#playerTwoLastName");

    // Name and Score

    p1NameDisplay = document.querySelector(".p1NameDisplay");
    p1ScoreDisplay = document.querySelector(".p1Score");
    p2NameDisplay = document.querySelector(".p2NameDisplay");
    p2ScoreDisplay = document.querySelector(".p2Score");


    // Winner Message DOM elements
    const winnerMessage = document.querySelector(".winnerMessage")
    const restartGameBtn = document.querySelector(".restartGameBtn")

    // Player to move elements

    playerToMoveText = document.querySelector(".playerToMoveName")
    playerToMoveImg = document.querySelector(".playerToMoveImg")

    addListeners();
    
    const gameBoard = {
        gameBoard: [["","",""],
                    ["","",""],
                    ["","",""]]
                }

    const playerOne = {
        playerName: {
            firstName: "Guest 1",
            lastName: "",
        },
        playerScore: 0,
        playerMark: "",
        isMyTurn: null,
    }

    const playerTwo = {
        playerName: {
            firstName: "Guest 2",
            lastName: "",
        },
        playerScore: 0,
        playerMark: "",
        isMyTurn: null,
    }

    function addListeners() {

        addDataBtn.addEventListener("click", function() {
            playerOneModal.showModal();
        });
        
        submitPlayerOneBtn.addEventListener("click", function() {
            playerOneModal.close();
            playerTwoModal.showModal();

            data.playerOne.playerName.firstName = pOneFirstNameInput.value;
            data.playerOne.playerName.lastName = pOneLastNameInput.value;

        });

        submitPlayerTwoBtn.addEventListener("click", function() {
            playerTwoModal.close();

            data.playerTwo.playerName.firstName = pTwoFirstNameInput.value;
            data.playerTwo.playerName.lastName = pTwoLastNameInput.value;

            gameController.startGame();

        });

        restartGameBtn.addEventListener("click", function() {
            winnerDisplayModal.close();
            gameController.restartGame();
        });

        gridCells.forEach((cell => {
            cell.addEventListener("click", function() {
                gameController.createMark(cell.dataset.row, cell.dataset.col); 
            })
        }));
    }


    return {playerOne, playerTwo, gameBoard, gridCells, winnerDisplayModal, winnerMessage};
  
})();

const gameController = {

    gameIsOver: false,
    roundCounter : 1,


    startGame: function() {
        
        if (this.roundCounter % 2 === 0) {
            data.playerOne.isMyTurn = false;
            data.playerTwo.isMyTurn = true;
            
            playerToMoveText.innerHTML = "Player to Move: " + data.playerTwo.playerName.firstName
            playerToMoveImg.setAttribute("src", "./img/letter-o.png");

            data.playerOne.playerMark = "O";
            data.playerTwo.playerMark = "X"
        }
        else {
            data.playerOne.isMyTurn = true;
            data.playerTwo.isMyTurn = false; 

            playerToMoveText.innerHTML = "Player to Move: " + data.playerOne.playerName.firstName
            playerToMoveImg.setAttribute("src", "./img/crossed.png");
            
            data.playerOne.playerMark = "X"
            data.playerTwo.playerMark = "O"
        }

        this.renderNameAndScore();
       
    },

    renderNameAndScore: function () {
        p1NameDisplay.innerHTML = "Player Name: " + data.playerOne.playerName.firstName + " " + data.playerOne.playerName.lastName;
        p1ScoreDisplay.innerHTML = "Score: " + data.playerOne.playerScore;
        p2NameDisplay.innerHTML = "Player Name: " + data.playerTwo.playerName.firstName
        + " " + data.playerTwo.playerName.lastName;
        p2ScoreDisplay.innerHTML = "Score: " + data.playerTwo.playerScore;
    },

    restartGame: function() {
        this.roundCounter++;
        this.gameIsOver = false;
        data.gameBoard.gameBoard = [["","",""],
                                    ["","",""],
                                    ["","",""]];
        
        Array.from(data.gridCells).forEach((cell => {

            if (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        }));
    
        this.startGame();

    },

    checkForOverrideAttempts: function(locationY, locationX) {
        
        let currentGameBoard = data.gameBoard.gameBoard;
        let currentGameBoardRow = currentGameBoard[locationY];
        let currentGameBoardCell = currentGameBoardRow[locationX];

        if (currentGameBoardCell != "") {return true;}
            // THIS IS IF TRYING TO OVERRIDE
    },
    checkForWin: function(currentGameBoard) {
        
        let [[a, b, c], [d, e, f], [g, h, i]] = currentGameBoard;

        let brokenDownBoard = [];
        currentGameBoard.forEach((item) => item.forEach((element) => {brokenDownBoard.push(element)}));
        const isFullCriteria = (gridSquare) => {return gridSquare !== ""}
        brokenDownBoard.every(isFullCriteria); 
    
        const repeatCond = (e === "X" || e === "O");

        if  ((a === b && b === c && (b === "X" || b === "O")) || (d === e && e === f && repeatCond) 
        || (g === h && h === i && (h === "X" || h === "O")) || (a === d && d === g && (d === "X" || d === "O")) 
        || (b === e && e === h && repeatCond) || (c === f && f === i && (f === "X" || f === "O")) 
        || (a === e && e === i && repeatCond) || (c === e && e === g) && repeatCond) {

            if (data.playerOne.isMyTurn) {
                
                winner = data.playerOne;
                data.playerOne.playerScore++;
                this.renderNameAndScore();

            }
            else {
                winner = data.playerTwo;
                data.playerTwo.playerScore++;
                this.renderNameAndScore();
            }

            this.gameIsOver = true;
            this.declareWinner(winner);
        }

        else if (brokenDownBoard.every(isFullCriteria)) {
            
            data.winnerDisplayModal.showModal();
            data.winnerMessage.innerHTML = "The Game Ended in a Draw!"
        }

        else {
            // continue game
            this.swapPlayerTurns();
        }

    },

    swapPlayerTurns: function() {

        data.playerOne.isMyTurn = !data.playerOne.isMyTurn;
        data.playerTwo.isMyTurn = !data.playerTwo.isMyTurn;

    },
    
    declareWinner: function(winner) {

        data.winnerDisplayModal.showModal();
        data.winnerMessage.innerHTML = "The winner is " + winner.playerName.firstName
        + ", They now have " + winner.playerScore + " point(s)"
    },

    createMark: function(row, column) {
    
        let sign;

        if(this.checkForOverrideAttempts(row, column) || this.gameIsOver) {}

        else {

            if (data.playerOne.isMyTurn) {
                sign = "X";
            }
            else {
                sign = "O";
            }

            const currentGameBoard = data.gameBoard.gameBoard;
            const foundRow = currentGameBoard[row];
            foundRow[column] = sign;
        
        this.createMarkOnDom(sign, row, column);
        this.checkForWin(currentGameBoard);
        
        }
    },

    createMarkOnDom: function(sign, row, column) {
        
        let newSymbol = document.createElement("img");

        if (sign === "X") {
            newSymbol.setAttribute("src", "./img/crossed.png");
            newSymbol.setAttribute("alt", "A cross");
            playerToMoveText.innerHTML = "Player to Move: " + data.playerTwo.playerName.firstName
            playerToMoveImg.setAttribute("src", "./img/letter-o.png");
        }
        else if (sign === "O") {
            newSymbol.setAttribute("src", "./img/letter-o.png");
            newSymbol.setAttribute("alt", "A nought")
            playerToMoveText.innerHTML = "Player to Move: " + data.playerOne.playerName.firstName
            playerToMoveImg.setAttribute("src", "./img/crossed.png");
        }
            
        let stringForQuerySelector = "div[data-row = '" + row + "']" + "[data-col='" + column +"']";
        const cellToEdit = document.querySelector(stringForQuerySelector);
        cellToEdit.appendChild(newSymbol);
    }
}

gameController.startGame();

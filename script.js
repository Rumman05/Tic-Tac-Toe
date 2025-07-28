const Gameboard = (() => {

    let gameboard = ['','','','','','','','',''];

    const render = () => {
        let boardHTML = '';
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        })
    }

    const squareChecker = (index) => {
        if (gameboard[index] != '') {
            console.log("Sqaure is populated")
            return true
        }
        return false
    }

    const updateSquare = (value, index) => {
        if (!squareChecker(index)) {
            if (value == "0") {
                gameboard[index] = "X"
                checkWinner();
            } else if(value == "1") {
                gameboard[index] = "O"
                checkWinner();
            }
            render();
        }
    }

    const checkWinner = () => {
        let wins = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]

        for (let i = 0; i < wins.length; i++) {
            let [a,b,c] = wins[i]

            if (gameboard[a] && gameboard[a] == gameboard[b] && gameboard[a] == gameboard[c]) {
                return gameboard[a];
            }
        }
        return null
    }

    const reset = () => {
        gameboard = ['','','','','','','','',''];
        render();
    }

    const checkDraw = () => {
        return checkWinner() == null && gameboard.every(square => square !== '');
    }


    return {
        render,
        updateSquare,
        squareChecker,
        checkWinner,
        reset,
        checkDraw,
    }
    
})();

const createPlayer = (name, mark, winCount) => {

    return {
        name,
        mark,
        winCount
    }

}

const Game = (() => {
    let players = [];
    let player1wins = 0;
    let player2wins = 0;
    let drawCount = 0;
    let currentPlayerTurn;
    let gameOver;
    

    const start = () => {

        const player1Name = document.querySelector('#player1-name').value;
        const player2Name = document.querySelector('#player2-name').value;

        if (player1Name === '' || player2Name === '') {
            alert("Please enter names for both players")
            return;
        };

        players = [
            createPlayer(document.querySelector('#player1-name').value, "X", player1wins),
            createPlayer(document.querySelector('#player2-name').value, "O", player2wins),
        ]

        currentPlayerTurn = 0;
        gameOver = false;
        Gameboard.render();
        winCountDisplay(players, drawCount);
        updateDisplay(currentPlayerTurn);
        resetButton.disabled = false;

    };

    const changeTurn = () => {
        currentPlayerTurn = currentPlayerTurn === 0 ? 1: 0;
    }

    const handleClick = (event) => {
        // Prevent clicks if game is over OR if no players are set
        if (gameOver) {
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);
        if (!Gameboard.squareChecker(index)) {
            Gameboard.updateSquare(currentPlayerTurn, index);
            setGameOver();
            changeTurn();
            updateDisplay(currentPlayerTurn);
        }
    };

    const setGameOver = () => {
        if (Gameboard.checkWinner() != null) {
            gameOver = true;
            winCounter(); // Count the win first
            winnersMessage(players);
            winCountDisplay(); // Then update the display
            startButton.disabled = true;
        } else if (Gameboard.checkDraw()) {
            gameOver = true;
            drawCount += 1; // Increment draw count
            drawMessage();
            winCountDisplay(); // Update display
            startButton.disabled = true;
        }
    }

    const winnersMessage = (players) => {
        const winMessage = document.querySelector("#message");
        const winningMark = Gameboard.checkWinner();

        let winner;
        if (players[0].mark == winningMark) {
            winner = players[0].name
        } else {
            winner = players[1].name
        }

        winMessage.textContent = `${winner} has won the game!`
        winMessage.style.display = 'block';
    }

    const winCounter = () => {
        const winningMark = Gameboard.checkWinner();

        if (winningMark === "X") {
            player1wins += 1;
            players[0].winCount = player1wins; // Update player object
        } else if (winningMark === "O") {
            player2wins += 1;
            players[1].winCount = player2wins; // Update player object
        }
    }

    const winCountDisplay = () => {
        if (players.length === 0) return; // Don't display if no players
        
        const player1wincount = document.querySelector('#player1-wincount');
        const player2wincount = document.querySelector('#player2-wincount');
        const drawCountDisplay = document.querySelector('#draw-count');

        player1wincount.textContent = players[0].name + ": " + players[0].winCount;
        player2wincount.textContent = players[1].name + ": " + players[1].winCount;
        drawCountDisplay.textContent = "Draws: " + drawCount;
    }

    const drawMessage = () => {
        const drawMessage = document.querySelector("#message")
        
        drawMessage.textContent = "The game ends as a draw!"
        drawMessage.style.display = 'block'
    }

    const updateDisplay = (currentPlayerTurn) => {
        const currentTurn = document.querySelector("#current-turn")
        let currentTurnMessage
        if (!gameOver) {
            if (currentPlayerTurn == 0) {
                currentTurnMessage = "It is " + players[0].name + "'s (" + players[0].mark + ") " +  "turn"
            } else {
                currentTurnMessage = "It is " + players[1].name + "'s (" + players[1].mark + ") " +  "turn"
            }
        }   
        

        currentTurn.textContent = currentTurnMessage
    }

    const reset = () => {
        if (gameOver == true) {
            // Reset game state
            currentPlayerTurn = 0;
            gameOver = false;
            
            // Clear displays
            document.querySelector("#message").style.display = 'none';
            
            // Re-enable start button
            startButton.disabled = false;
            
            // Reset and render the board
            Gameboard.reset();
            
            // Update display for current player
            updateDisplay(currentPlayerTurn);
        }
    }



    return {
        start,
        handleClick,
        changeTurn,
        setGameOver,
        winnersMessage,
        updateDisplay,
        reset,
        winCountDisplay,
        winCounter,
    };

})();

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', () => {
    Game.start();
})

const resetButton = document.querySelector("#reset-button");
resetButton.disabled = true;
resetButton.addEventListener('click', () => {
    Gameboard.reset();
    Game.reset();
})
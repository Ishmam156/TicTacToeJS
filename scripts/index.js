const gameBoard = (() => {
  // let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
  let board = new Array(9).fill("");
  const updateBoard = (index, player) => {
    board[index] = player.playerSymbol;
    displayController.updateGameBoard();
    game.checkWinner();
    game.changePlayer();
  };
  const resetBoard = () => {
    board = board.fill("");
  };
  return {
    board,
    updateBoard,
    resetBoard,
  };
})();

const player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  return {
    playerName,
    playerSymbol,
  };
};

const displayController = (() => {
  const render = () => {
    const grid = document.querySelector(".game-grid");
    grid.innerHTML = "";

    gameBoard.board.forEach((item, index) => {
      const singlePlay = document.createElement("div");
      singlePlay.textContent = item;
      singlePlay.classList.add("game-play");
      singlePlay.dataset.index = index;
      singlePlay.addEventListener("click", () => {
        if (!singlePlay.textContent) {
          if (game.isGameOn()) {
            gameBoard.updateBoard(index, game.getCurrentPlayer());
          }
        }
      });
      grid.appendChild(singlePlay);
    });

    document.querySelector(".game-restart").addEventListener("click", () => {
      game.restartGame();
      render();
    });
  };

  const updateGameBoard = () => {
    document.querySelectorAll(".game-play").forEach((item) => {
      item.textContent = gameBoard.board[item.dataset.index];
    });
  };

  render();

  return {
    render,
    updateGameBoard,
  };
})();

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let gameOn = true;
  // player1 = player(prompt("What is your name, Player 1?"), "X");
  // player2 = player(prompt("What is your name, Player 2?"), "O");

  const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const startGame = () => {
    player1 = player("Player 1", "X");
    player2 = player("Player 2", "O");

    currentPlayer = player1;
  };

  startGame();

  const changePlayer = () => {
    currentPlayer =
      currentPlayer.playerSymbol === player1.playerSymbol ? player2 : player1;
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const isGameOn = () => {
    return gameOn;
  };

  const checkWinner = () => {
    if (!gameBoard.board.includes("")) {
      gameOn = false;
      console.log("draw");
    }

    winningOptions.forEach((option) => {
      if (
        gameBoard.board[option[0]] === gameBoard.board[option[1]] &&
        gameBoard.board[option[1]] === gameBoard.board[option[2]] &&
        gameBoard.board[option[0]] !== ""
      ) {
        gameOn = false;
        console.log(currentPlayer);
        alert(`Winner is ${currentPlayer.playerName}`);
      }
    });
  };

  const restartGame = () => {
    gameOn = true;
    currentPlayer = null;
    gameBoard.resetBoard();
    startGame();
  };

  return {
    changePlayer,
    getCurrentPlayer,
    checkWinner,
    isGameOn,
    restartGame,
  };
})();

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
    grid.style.border = "1px solid gray";
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

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    game.startGame(
      event.target.player1name.value,
      event.target.player2name.value
    );
    render();
  });

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

  const startGame = (player1name, player2name) => {
    player1 = player(player1name, "X");
    player2 = player(player2name, "O");

    currentPlayer = player1;
  };

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
    startGame,
  };
})();

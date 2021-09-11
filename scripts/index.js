const gameBoard = (() => {
  let board = new Array(9).fill("");
  const updateBoard = (index, player) => {
    board[index] = player.playerSymbol;
    displayController.updateGameBoard();
    const winner = game.checkWinner();
    if (!winner) {
      game.changePlayer();
    }
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
  const restartButton = document.querySelector(".game-restart");
  const form = document.querySelector("form");
  const grid = document.querySelector(".game-grid");
  const gameStatus = document.querySelector(".game-status");
  const displayWinner = document.querySelector(".game-winner");

  const render = () => {
    grid.style.border = "1px solid #132C33";
    grid.innerHTML = "";
    displayWinner.innerHTML = "";

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

    restartButton.addEventListener("click", () => {
      game.restartGame();
      render();
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const player1name = event.target.player1name.value;
    const player2name = event.target.player2name.value;

    if (!player1name || !player2name) {
      alert("Must provide a name to start!");
      return;
    }

    game.startGame(
      event.target.player1name.value,
      event.target.player2name.value
    );
    render();
    addStatusToBoard();
    form.style.display = "none";
    restartButton.style.display = "block";
  });

  const updateGameBoard = () => {
    document.querySelectorAll(".game-play").forEach((item) => {
      item.textContent = gameBoard.board[item.dataset.index];
    });
  };

  const addStatusToBoard = () => {
    const players = game.playerStatus();

    players.forEach((player) => {
      const playerStatus = document.createElement("div");
      const playerName = document.createElement("p");
      playerName.textContent = `${player.playerName} `;
      playerStatus.appendChild(playerName);
      const wins = document.createElement("div");
      const winNumber = document.createElement("span");
      winNumber.textContent = "0";
      winNumber.classList.add(`player-${player.playerSymbol}-wins`);
      wins.appendChild(winNumber);
      playerStatus.appendChild(wins);
      gameStatus.append(playerStatus);
      gameStatus.style.backgroundColor = "#132C33";
    });
  };

  const updateWinner = (currentPlayer, win) => {
    const winnerElement = document.createElement("h2");

    if (win) {
      winnerElement.textContent = `Winner of this round is: ${currentPlayer.playerName}!`;
      let winnerNumber = document.querySelector(
        `.player-${currentPlayer.playerSymbol}-wins`
      );
      let currentWins = Number(winnerNumber.textContent);
      winnerNumber.textContent = currentWins + 1;
    } else {
      winnerElement.textContent = "It's a tie :( Try again!";
    }

    displayWinner.append(winnerElement);
    setTimeout(() => {
      displayWinner.innerHTML = "";
    }, 2500);
  };

  return {
    render,
    updateGameBoard,
    updateWinner,
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
    winningOptions.forEach((option) => {
      if (
        gameBoard.board[option[0]] === gameBoard.board[option[1]] &&
        gameBoard.board[option[1]] === gameBoard.board[option[2]] &&
        gameBoard.board[option[0]] !== ""
      ) {
        gameOn = false;
        displayController.updateWinner(currentPlayer, true);
        return true;
      }
    });

    if (!gameBoard.board.includes("")) {
      gameOn = false;
      displayController.updateWinner(currentPlayer, false);
      return true;
    }

    return false;
  };

  const playerStatus = () => [player1, player2];

  const restartGame = () => {
    gameOn = true;
    currentPlayer = player1;
    gameBoard.resetBoard();
  };

  return {
    changePlayer,
    getCurrentPlayer,
    checkWinner,
    isGameOn,
    restartGame,
    startGame,
    playerStatus,
  };
})();

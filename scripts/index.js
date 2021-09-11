const gameBoard = (() => {
  // let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
  let board = new Array(9).fill("");
  const updateBoard = (index, player) => {
    board[index] = player.playerSymbol;
    displayController.render();
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
      singlePlay.dataset.index = index;
      singlePlay.addEventListener("click", (event) => {
        if (!singlePlay.textContent) {
          gameBoard.updateBoard(index, game.getCurrentPlayer());
        }
      });
      grid.appendChild(singlePlay);
    });
  };

  render();

  return {
    render,
  };
})();

const game = (() => {
  let player1;
  let player2;

  // player1 = player(prompt("What is your name, Player 1?"), "X");
  // player2 = player(prompt("What is your name, Player 2?"), "O");
  player1 = player("Player 1", "X");
  player2 = player("Player 2", "O");

  let currentPlayer = player1;

  const changePlayer = () => {
    currentPlayer =
      currentPlayer.playerSymbol === player1.playerSymbol ? player2 : player1;
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  return {
    changePlayer,
    getCurrentPlayer,
  };
})();

const gameBoard = (() => {
  // let board = new Array(9).fill("");
  let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
  const updateBoard = (index, player) => {
    board[index] = player.playerSymbol;
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
  const initialization = () => {
    const grid = document.querySelector(".game-grid");

    gameBoard.board.forEach((item) => {
      const singlePlay = document.createElement("div");
      singlePlay.textContent = item;
      grid.appendChild(singlePlay);
    });
  };

  initialization();
})();

const Player1 = player("Sami", "X");
const Player2 = player("Sadu", "O");

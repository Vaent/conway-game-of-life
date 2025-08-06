// <script defer type="module" src="interface.js"></script>

import Life from "./Life.js"

function setUp() {
  const life = initialiseLife();
  const gameBoard = document.getElementById("game-board");
  buildLayout(life, gameBoard);
  addAdvanceEventListener(life, gameBoard);
}

function initialiseLife() {
  const xSize = Math.floor(Math.random() * 10) + 10;
  const ySize = Math.floor(Math.random() * 10) + 10;
  const liveCells = [];
  for (let x = 0; x < xSize; x++)
    for (let y = 0; y < ySize; y++)
      if (Math.random() < 0.2) liveCells.push([x, y]);
  const queryParams = new URLSearchParams(window.location.search);
  const options = {
    allowExpansion: queryParams.get("autoexpand") === "true",
  };
  return Life.fromCoordinates(xSize, ySize, liveCells, options);
}

function buildLayout(life, gameBoard) {
  while (gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild);
  const layoutTable = gameBoard.appendChild(document.createElement("table"));
  life.layout.forEach((row, yIndex) => {
    layoutTable.appendChild(document.createElement("tr"))
      .append(...row.map((cell, xIndex) => {
        const td = document.createElement("td");
        cell && (td.className = "live");
        td.addEventListener("click", () => {
          // when a cell is clicked, toggle the status in Life of the clicked cell, then refresh the display
          life.toggleCellStatus(xIndex, yIndex);
          buildLayout(life, gameBoard);
        });
        return td;
      }));
  });
}

function advanceAndRender(life, gameBoard) {
  life.stepForward();
  buildLayout(life, gameBoard);
}

function addAdvanceEventListener(life, gameBoard) {
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      advanceAndRender(life, gameBoard);
    }
  });
}

setUp();

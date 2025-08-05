// <script defer type="module" src="interface.js"></script>

import Life from "./Life.js"

function setUp() {
  const life = initialiseWithRandomParameters();
  const gameBoard = document.getElementById("game-board");
  buildLayout(life, gameBoard);
  addAdvanceEventListener(life, gameBoard);
}

function initialiseWithRandomParameters() {
  const xSize = Math.floor(Math.random() * 10) + 10;
  const ySize = Math.floor(Math.random() * 10) + 10;
  const liveCells = [];
  for (let x = 0; x < xSize; x++)
    for (let y = 0; y < ySize; y++)
      if (Math.random() < 0.2) liveCells.push([x, y]);
  return Life.fromCoordinates(xSize, ySize, liveCells);
}

function buildLayout(life, gameBoard) {
  const layoutTable = gameBoard.appendChild(document.createElement("table"));
  life.layout.forEach(row => {
    layoutTable.appendChild(document.createElement("tr"))
      .append(...row.map(cell => {
        const td = document.createElement("td");
        cell && (td.className = "live");
        return td;
      }));
  });
}

function advanceAndRender(life, gameBoard) {
  life.stepForward();
  while (gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild);
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

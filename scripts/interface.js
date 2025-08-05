// <script defer type="module" src="interface.js"></script>

import Life from "./Life.js"

function setUp() {
  const life = initialiseWithRandomParameters();
  const gameBoard = document.getElementById("game-board");
  buildLifeLayoutIn(gameBoard, life);
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

function buildLifeLayoutIn(gameBoard, life) {
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

setUp();

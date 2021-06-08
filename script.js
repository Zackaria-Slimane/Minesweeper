import { createBoard, TILE_STATUS, renderMines } from "./logic.js";

const minesCount = document.querySelector(".subtext");
const gameBoard = document.querySelector(".board");

// function renderBoard() {
// 	for (let i = 0; i < 10 /*100*/; i++) {
// 		let newTile = document.createElement("div");
// 		newTile.classList.add("board");
// 		gameBoard.appendChild(newTile);
// 	}
// }

// renderBoard();

const boardSize = 10;
const numberMines = 10;

const board = createBoard(boardSize, numberMines);
const mines = renderMines(boardSize, numberMines);

board.forEach((row) => {
	row.forEach((tile) => {
		gameBoard.append(tile.element);
	});
});

gameBoard.style.setProperty("--size", boardSize);

console.log(board.id);

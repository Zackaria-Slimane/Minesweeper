import { createBoard, TILE_STATUS, renderMines } from "./logic.js";

const minesCount = document.querySelector(".subtext");
const gameBoard = document.querySelector(".board");

const boardSize = 10;
const numberMines = 10;
let minesLeft = numberMines;
minesCount.innerText = `Mines Left :${minesLeft}`;

const board = createBoard(boardSize, numberMines);
const minesPlaced = renderMines(boardSize, numberMines);

// assignin the mines to tiles and appending tiles to board
function renderBoard() {
	board.forEach((row) => {
		row.forEach((tile) => {
			gameBoard.append(tile.element);
			minesPlaced.forEach((cell) => {
				if (cell.x === tile.x && cell.y === tile.y) {
					tile.mine = true;
					console.log(tile);
					// tile.element.dataset.status = TILE_STATUS.MINE;
				}
			});
		});
	});
}
renderBoard();

gameBoard.style.setProperty("--size", boardSize);

console.log(minesPlaced);

// handling event listeners for each type of click  -- mark or reveal
board.forEach((row) => {
	row.forEach((tile) => {
		tile.element.addEventListener("click", () => {
			if (tile.mine === true) {
				tile.element.dataset.status = TILE_STATUS.MINE;
				revealMines();
			}
		});
	});
});

// mark the tiles on right click

board.forEach((row) => {
	row.forEach((tile) => {
		tile.element.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			if (tile.element.dataset.status === TILE_STATUS.HIDDEN) {
				tile.element.dataset.status = TILE_STATUS.MARKED;
			}
		});
	});
});

function revealMines() {
	board.forEach((row) => {
		row.forEach((tile) => {
			if (tile.mine === true) {
				tile.element.dataset.status = TILE_STATUS.MINE;
			}
		});
	});
	window.alert("YOU LOST :( ! ");
	return renderBoard();
}

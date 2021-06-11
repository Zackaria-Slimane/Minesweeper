import { createBoard, TILE_STATUS, renderMines, nearTiles } from "./functions.js";

const minesCount = document.querySelector(".subtext");
const gameBoard = document.querySelector(".board");

const boardSize = 10;
const numberMines = 10;
let minesLeft = numberMines;
// minesCount.innerText = `Mines Left :${minesLeft}`;

export const board = createBoard(boardSize, numberMines);
const minesPlaced = renderMines(boardSize, numberMines);

// Boad & mines rendering
function renderBoard() {
	board.forEach((row) => {
		row.forEach((tile) => {
			gameBoard.append(tile.element);
			minesPlaced.forEach((cell) => {
				if (cell.x === tile.x && cell.y === tile.y) {
					tile.mine = true;
					// console.log(tile);
					// tile.element.dataset.status = TILE_STATUS.MINE;
				}
			});
		});
	});
}
renderBoard();

gameBoard.style.setProperty("--size", boardSize);

console.log(minesPlaced);

//reveal the mines in board if one is clicked
function revealMines() {
	board.forEach((row) => {
		row.forEach((tile) => {
			if (tile.mine === true) {
				tile.element.dataset.status = TILE_STATUS.MINE;
			}
		});
	});
	window.alert("YOU LOST  ! ");

	return renderBoard();
}

//handling left & right click events on tiles
// mark the tiles on right click
board.forEach((row) => {
	row.forEach((tile) => {
		tile.element.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			if (
				tile.element.dataset.status === TILE_STATUS.HIDDEN &&
				tile.element.dataset.status !== TILE_STATUS.MINE &&
				tile.element.dataset.status !== TILE_STATUS.NUMBER
			) {
				tile.element.dataset.status = TILE_STATUS.MARKED;
				minesLeft--;
				minesCount.innerText = `Mines Left :${minesLeft}`;
			} else if (
				tile.element.dataset.status === TILE_STATUS.MARKED &&
				tile.element.dataset.status !== TILE_STATUS.MINE &&
				tile.element.dataset.status !== TILE_STATUS.NUMBER
			) {
				tile.element.dataset.status = TILE_STATUS.HIDDEN;
				minesLeft++;
				minesCount.innerText = `Mines Left :${minesLeft}`;
			}
		});
	});
});

//reveal the tiles on left click , either mine or number

board.forEach((row) => {
	row.forEach((tile) => {
		tile.element.addEventListener("click", () => {
			if (tile.mine === true) {
				tile.element.dataset.status = TILE_STATUS.MINE;
				revealMines();
			} else if (tile.element.dataset.status !== TILE_STATUS.MARKED) {
				tile.element.dataset.status = TILE_STATUS.NUMBER;
				const nearbyTiles = nearTiles(gameBoard, tile);
				const nearbyMines = nearbyTiles.filter((tile) => tile.mine);
				console.log(nearbyMines);
        if (nearbyMines.length === 0) {
          
				} else {
					tile.element.textContent = nearbyMines.length;
				}
			}
		});
	});
});

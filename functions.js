//board rendering logic
export const TILE_STATUS = {
	HIDDEN: "hidden",
	MINE: "mine",
	NUMBER: "number",
	MARKED: "marked",
};

import { board } from "./script.js";

//create the board
export function createBoard(boardSize, numberMines) {
	const board = [];
	for (let x = 0; x < boardSize; x++) {
		const row = [];
		for (let y = 0; y < boardSize; y++) {
			const element = document.createElement("div");
			element.dataset.status = TILE_STATUS.HIDDEN;
			// element.id = x + " " + y;
			element.setAttribute("x", x);
			element.setAttribute("y", y);

			const tile = {
				element,
				x,
				y,
				cords: x + " " + y,
				mine: false,
				get status() {
					return this.element.dataset.status;
				},

				set status(value) {
					return (this.element.dataset.status = value);
				},
			};
			row.push(tile);
		}
		board.push(row);
	}

	return board;
}

// generate the mines on random cords
const getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min));
};

export function renderMines(boardSize, numberMines) {
	let mineCoordinates = [];
	let cell = {};

	for (let i = 0; i < numberMines; i++) {
		let randomRowCord = getRandomInt(0, boardSize);
		let randomColCord = getRandomInt(0, boardSize);

		cell = { x: randomRowCord, y: randomColCord };

		mineCoordinates.push(cell);
		// console.log(mineCoordinates);
	}

	return mineCoordinates;
}

// export function adjacentTiles(board, tile) {
// 	let adjacent = [];
// 	for (let x = tile.x - 1; x <= tile.x + 1; x++) {
// 		for (let y = tile.y - 1; y <= tile.y + 1; y++) {
// 			let adjTile = board[tile.x + x]?.[tile.y + y];
// 			adjacent.push(adjTile);
// 			console.log(adjacent);
// 		}
// 	}
// 	return adjacent;
// }

// export function nearTiles(board, tile) {
// 	const tiles = [];

// 	for (let xAdj = -1; xAdj <= 1; xAdj++) {
// 		for (let yAdj = -1; yAdj <= 1; yAdj++) {
// 			let adjTile = board[tile.x + xAdj]?.[tile.y + yAdj];
// 			tiles.push(adjTile);
// 			console.log(tiles);
// 		}
// 	}
// 	return tiles;
// }

export function matchCords(a, b) {
	return a.x === b.x && a.y === b.y;
}

export function nearTiles(tile) {
	const adjTilesArray = [];

	for (let x = tile.x - 1; x <= tile.x + 1; x++) {
		for (let y = tile.y - 1; y <= tile.y + 1; y++) {
			board.forEach((row) =>
				row.forEach((tile) => {
					if (matchCords(tile, { x, y })) {
						adjTilesArray.push(tile);

						console.log(adjTilesArray);
					}
				}),
			);
		}
	}
	return adjTilesArray;
}





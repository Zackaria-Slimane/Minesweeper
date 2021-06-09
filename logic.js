//board rendering logic
export const TILE_STATUS = {
	HIDDEN: "hidden",
	MINE: "mine",
	NUMBER: "number",
	MARKED: "marked",
};

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
	return Math.floor(Math.random() * (max - min)) + min;
};

export function renderMines(boardSize, numberMines) {
	let mineCoordinates = [];
	let cell = {};

	for (let i = 0; i < numberMines; i++) {
		let randomRowCord = getRandomInt(0, boardSize);
		let randomColCord = getRandomInt(0, boardSize);
		cell = { x: randomRowCord, y: randomColCord };
		// cell.setAttribute("data-status", "mine");
		mineCoordinates.push(cell);
		// console.log(mineCoordinates);
	}
	console.log(mineCoordinates);
	return mineCoordinates;
}

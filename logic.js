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
			element.id = `${x}:${y}`;
			element.setAttribute("xCord", x);
			element.setAttribute("yCord", y);

			const tile = {
				element,
				x,
				y,
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
	for (let i = 0; i < numberMines; i++) {
		let randomRowCoordinate = getRandomInt(0, boardSize);
		let randomColumnCoordinate = getRandomInt(0, boardSize);
		let cell = randomRowCoordinate + ":" + randomColumnCoordinate;

		while (mineCoordinates.includes(cell)) {
			randomRowCoordinate = getRandomInt(0, boardSize);
			randomColumnCoordinate = getRandomInt(0, boardSize);
			cell = randomRowCoordinate + ":" + randomColumnCoordinate;
		}
		mineCoordinates.push(cell);
		console.log(cell);
		console.log(mineCoordinates);
	}
}

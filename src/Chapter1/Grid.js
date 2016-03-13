import Cell from './Cell.js';

export default class Grid {

	/**
	 * @type {Number}
	 */
	rows;

	/**
	 * @type {Number}
	 */
	columns;

	/**
	 * @type {Array}
	 */
	grid = [];

	/**
	 * @type {Number}
	 */
	get size() {
		return this.rows * this.columns;
	}

	/**
	 * @type {Iterable.<Array>}
	 */
	get eachRow() {

		function *eachCellGenerator( grid ) {
			// We can't use 'yield' in a callback, and for...in doesn't guarantee
			// order, so we're back to using good old for loops.
			for ( let rowIndex = 0; rowIndex < grid.length; rowIndex++ ) {
				yield grid[rowIndex];
			}
		}

		return eachCellGenerator( this.grid );

	}

	/**
	 * @type {Iterable.<Cell>}
	 */
	get eachCell() {

		function *eachCellGenerator( grid ) {
			for ( let rowIndex = 0; rowIndex < grid.length; rowIndex++ ) {
				const row = grid[rowIndex];
				for ( let columnIndex = 0; columnIndex < row.length; columnIndex++ ) {
					yield this.cellAtGridPosition( rowIndex, columnIndex);
				}
			}
		}

		return eachCellGenerator( this.grid );
	}

	constructor( rows, columns ) {
		this.rows = rows;
		this.columns = columns;
		this.grid = this._prepareGrid();
		this._configureCells();
	}

	/**
	 * @private
	 */
	_prepareGrid() {
		return Array.from( {length: this.rows }, ( _1, row ) => {
			return Array.from( {length: this.columns}, ( _2, column ) => {
				return new Cell( row, column );
			} );
		} );
	}

	/**
	 * @private
	 */
	_configureCells() {
		this.grid.forEach( ( column, rowIndex ) => {
			column.forEach( ( cell, columnIndex ) => {

				const northInBounds = rowIndex - 1 		> -1;
				const southInBounds = rowIndex + 1 		< this.rows;
				const eastInBounds = columnIndex + 1 	< this.columns;
				const westInBounds = columnIndex - 1 	> -1;

				cell.north = northInBounds ? this.grid[ rowIndex - 1 ][ columnIndex ] : false;
				cell.south = southInBounds ? this.grid[ rowIndex + 1 ][ columnIndex ] : false;
				cell.east = eastInBounds ? this.grid[ rowIndex ][ columnIndex + 1] : false;
				cell.west = westInBounds ? this.grid[ rowIndex ][ columnIndex - 1] : false;

			} );
		} );
	}

	/**
	 * Get a cell for a given set of coordinates.
	 * @param {Number} row
	 * @param {Number} column
	 * @return {Cell|Bool} Returns a cell instance, or false if no cell exists
	 */
	cellAtGridPosition( row, column ) {
		if ( row < 0 || row > this.rows - 1 ) { return null; }
		if ( column < 0 || column > this.columns - 1 ) { return null; }
		return this.grid[ row ][ column ];
	}

	/**
	 * get a random cell from the grid.
	 * @returns {Cell}
	 */
	randomCell() {
		const randomRowIndex = Math.round( Math.random() * this.rows - 1 );
		const randomColumnIndex = Math.round( Math.random() * this.columns - 1 );
		return this.cellAtGridPosition( randomRowIndex, randomColumnIndex );
	}


}

export default class Cell {

	row;
	column;

	north = false;
	south = false;
	east = false;
	west = false;

	links = new Set();

	get neighbours() {
		const neighbours = new Map();
		if ( this.north ) { neighbours.set('north', this.north); }
		if ( this.south ) { neighbours.set('south', this.south); }
		if ( this.east ) { neighbours.set('east', this.east); }
		if ( this.west ) { neighbours.set('west', this.west); }
		return neighbours;
	}

	constructor( row, column ) {
		this.row = row;
		this.column = column;
	}

	link( cell, bidirectional = true ) {
		this.links.add( cell );
		if ( bidirectional ) { cell.link( this, false ); }
	}

	unlink( cell, bidirectional = true ) {
		this.links.delete( cell );
		if ( bidirectional ) { cell.unlink( this, false ); }
	}

	linkedTo( cell ) {
		return this.links.has( cell );
	}

}

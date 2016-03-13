export default class BinaryTree {

	grid;

	constructor( grid ) {

		for ( const cell of grid.eachCell ) {
			const neighbours = [];
			if ( cell.north ) { neighbours.push( cell.north ); }
			if ( cell.east ) { neighbours.push( cell.east ); }

			const index = Math.floor( Math.random() * neighbours.length );
			const neighbour = neighbours[ index ];

			if ( neighbour ) { cell.link( neighbour ); }

		}

		this.grid = grid;

	}

}

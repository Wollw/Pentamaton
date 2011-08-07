var Tile = function(shape) {
	var state = false;
	var nextState;

	this.addNeighbor = function(n) {
		this.neighbors[this.neighbors.length] = n;
	}

	this.neighbors = new Array();
	// Return the current tile's state
	this.getState = function() {
		return this.shape.state;
	}
	// Changes the state of a dead cell to live and vice versa
	// Returns the changed state
	this.updateState = function() {
		this.shape.state = nextState;
		state = nextState;
		return state;
	}
	this.makeDead = function() {
		nextState = false;
	}
	this.makeLive = function() {
		nextState = true;
	}
	// The shape data
	this.shape = shape;
}

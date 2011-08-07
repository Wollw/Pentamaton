var speed = 0;
var bpm = 100;
var currentParts = new Array();
// Get the canvas context we will be drawing on
var init = function() {
	var canvas = document.getElementById('pentamaton');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
	}

	var pentagon =  new Pentagon(50,200,220);

	// Make tile for central pentagon
	currentParts[0] = new Tile(pentagon);

	// Make tiles for acute triangles
	for (var i = 1; i < 6; i++) {
		currentParts[i] = new Tile(new AcuteTriangle(pentagon,2,3));
		currentParts[i].shape.pentagon = currentParts[0].shape;
		currentParts[i].shape.origin = i-1;
		currentParts[i].shape.rotation = 324-((i-1)*72);
	}

	// Make small inner obtuse triangles
	for (var i = 6; i < 11; i++) {
		currentParts[i] = new Tile(new ObtuseTriangle(
										currentParts[0].shape,
										currentParts[5].shape.len));
		currentParts[i].shape.dx = currentParts[0].shape.coords[i-6]['x']
									+currentParts[0].shape.dx;
		currentParts[i].shape.dy = currentParts[0].shape.coords[i-6]['y']
									+currentParts[0].shape.dy;
		currentParts[i].shape.rotation = 360-((i-6)*72);
	}

	// Make small middle obtuse triangles
	for (var i = 11; i < 16; i++) {
		currentParts[i] = new Tile(new ObtuseTriangle(
										currentParts[0].shape,
										currentParts[5].shape.len));
		currentParts[i].shape.dx = currentParts[0].shape.coords[i-11]['x']
									+currentParts[0].shape.dx;
		currentParts[i].shape.dy = currentParts[0].shape.coords[i-11]['y']
									+currentParts[0].shape.dy;
		currentParts[i].shape.rotation = 360-((i-11)*72)+180;

		currentParts[i].shape.dx += Math.sin((Math.PI/180)
										*currentParts[i].shape.rotation)
									*(currentParts[i].shape.height+1.5)*2;
		currentParts[i].shape.dy -= Math.cos((Math.PI/180)
										*currentParts[i].shape.rotation)
									*(currentParts[i].shape.height+1.5)*2;
	}

	// Make larger outer obtuse triangles
	for (var i = 16; i < 21; i++) {
		currentParts[i] = new Tile(new ObtuseTriangle(
										currentParts[0].shape,
										currentParts[5].shape.len));
		currentParts[i].shape.dx = currentParts[0].shape.dx;
		currentParts[i].shape.dy = currentParts[0].shape.dy;
		currentParts[i].shape.rotation = 360-((i-16)*72)+216;
		currentParts[i].shape.rescale = 1.3;

		currentParts[i].shape.dx += Math.sin((Math.PI/180)
										*currentParts[i].shape.rotation)
									*(currentParts[i].shape.height+1.5)*3.6;
		currentParts[i].shape.dy -= Math.cos((Math.PI/180)
										*currentParts[i].shape.rotation)
									*(currentParts[i].shape.height+1.5)*3.6;
	}


	// connect polygons to neighbors
	currentParts[0].neighbors = [1,2,3,4,5,6,7,8,9,10];	//pentagon
	// acute triangles
	currentParts[1].neighbors = [5,0,2,6,7,11,12,17];
	currentParts[2].neighbors = [1,0,3,7,8,12,13,18];
	currentParts[3].neighbors = [2,0,4,8,9,13,14,19];
	currentParts[4].neighbors = [3,0,5,9,10,14,15,20];
	currentParts[5].neighbors = [4,0,1,10,6,15,11,16];
	// inner obtuse triangles
	currentParts[6].neighbors = [11,16,15,10,5,0,1,7,12,17];
	currentParts[7].neighbors = [17,18,11,12,13,6,1,0,2,8];
	currentParts[8].neighbors = [18,19,12,13,14,7,2,0,3,9];
	currentParts[9].neighbors = [19,20,13,14,15,8,3,0,4,10];
	currentParts[10].neighbors = [20,16,14,15,11,9,4,0,5,6];
	// middle obtuse triangles
	currentParts[11].neighbors = [16,17,15,10,5,6,1,7,12];
	currentParts[12].neighbors = [17,18,11,6,1,7,2,8,13];
	currentParts[13].neighbors = [18,19,12,7,2,8,3,9,14];
	currentParts[14].neighbors = [19,20,13,8,3,9,4,10,15];
	currentParts[15].neighbors = [20,16,14,9,4,10,5,6,11];
	// outer obtuse triangles
	currentParts[16].neighbors = [20,15,10,5,6,11,17];
	currentParts[17].neighbors = [16,11,6,1,7,12,18];
	currentParts[18].neighbors = [17,12,7,2,8,13,19];
	currentParts[19].neighbors = [18,13,8,3,9,14,20];
	currentParts[20].neighbors = [19,14,9,4,10,15,16];


	// Read starting conditions from checkboxes
	var startstate = new Array();
	startstate[0] = document.shapes.s0.checked;
	startstate[1] = document.shapes.s1.checked;
	startstate[2] = document.shapes.s2.checked;
	startstate[3] = document.shapes.s3.checked;
	startstate[4] = document.shapes.s4.checked;
	startstate[5] = document.shapes.s5.checked;
	startstate[6] = document.shapes.s6.checked;
	startstate[7] = document.shapes.s7.checked;
	startstate[8] = document.shapes.s8.checked;
	startstate[9] = document.shapes.s9.checked;
	startstate[10] = document.shapes.s10.checked;
	startstate[11] = document.shapes.s11.checked;
	startstate[12] = document.shapes.s12.checked;
	startstate[13] = document.shapes.s13.checked;
	startstate[14] = document.shapes.s14.checked;
	startstate[15] = document.shapes.s15.checked;
	startstate[16] = document.shapes.s16.checked;
	startstate[17] = document.shapes.s17.checked;
	startstate[18] = document.shapes.s18.checked;
	startstate[19] = document.shapes.s19.checked;
	startstate[20] = document.shapes.s20.checked;

	for (var i = 0; i < currentParts.length; i++) {
		currentParts[i].shape.color.live = "#D1E231";
		currentParts[i].shape.color.dead = "darkgrey";
		if (startstate[i])
			currentParts[i].makeLive();
		else
			currentParts[i].makeDead();
		currentParts[i].updateState();
	}

	// Debugging section to check to make sure neighbors are connected
	/*
	var t = 20;
	currentParts[t].makeLive();
	currentParts[t].updateState();
	console.log("Tile "+t+" neighbors ->", currentParts[t].neighbors);
	var a = new Array();
	for (var i = 0; i < currentParts[t].neighbors.length; i++) {
		if (a[currentParts[t].neighbors[i]])
			console.log("Warning! Tile "+t+" has a duplicate neighbor: "
						+currentParts[t].neighbors[i]+" at index "+i);
		a[currentParts[t].neighbors[i]] = true;
	}
	for (var i = 0; i < currentParts[t].neighbors.length; i++) {
		if (currentParts[t].neighbors[i] < currentParts.length) {
			currentParts[currentParts[t].neighbors[i]].makeDead();
			currentParts[currentParts[t].neighbors[i]].updateState();
		}
	}
	drawTile(ctx,currentParts,t);
	drawTileNeighbors(ctx,currentParts,t);
	*/

	speed = (60/bpm)*1000;
	nextFrame(ctx);
	console.log(speed);
	setInterval(
		(function(){nextFrame(ctx)}),
		speed);


}

var nextFrame = function(ctx) {

	// Read rules from checkboxes
	var rules_born = new Array();
	rules_born[0] = document.rules_born.r0.checked;
	rules_born[1] = document.rules_born.r1.checked;
	rules_born[2] = document.rules_born.r2.checked;
	rules_born[3] = document.rules_born.r3.checked;
	rules_born[4] = document.rules_born.r4.checked;
	rules_born[5] = document.rules_born.r5.checked;
	rules_born[6] = document.rules_born.r6.checked;
	rules_born[7] = document.rules_born.r7.checked;
	rules_born[8] = document.rules_born.r8.checked;
	rules_born[9] = document.rules_born.r9.checked;
	rules_born[10] = document.rules_born.r10.checked;
	var rules_survive = new Array();
	rules_survive[0] = document.rules_survive.r0.checked;
	rules_survive[1] = document.rules_survive.r1.checked;
	rules_survive[2] = document.rules_survive.r2.checked;
	rules_survive[3] = document.rules_survive.r3.checked;
	rules_survive[4] = document.rules_survive.r4.checked;
	rules_survive[5] = document.rules_survive.r5.checked;
	rules_survive[6] = document.rules_survive.r6.checked;
	rules_survive[7] = document.rules_survive.r7.checked;
	rules_survive[8] = document.rules_survive.r8.checked;
	rules_survive[9] = document.rules_survive.r9.checked;
	rules_survive[10] = document.rules_survive.r10.checked;

	drawBoard(ctx,currentParts);
	for (var i = 0; i < currentParts.length; i++) {
		var liveNeighbors = 0;
		for (var j = 0; j < currentParts[i].neighbors.length; j++) {
			if (currentParts[i].neighbors[j] < currentParts.length)
				if (currentParts[currentParts[i].neighbors[j]].getState())
					liveNeighbors++;
		}
		if (currentParts[i].getState()) {
			if (rules_survive[liveNeighbors])
				currentParts[i].makeLive();
			else
				currentParts[i].makeDead();
		} else {
			if (rules_born[liveNeighbors])
				currentParts[i].makeLive();
			else
				currentParts[i].makeDead();
		}

	}

	for (var i = 0; i < currentParts.length; i++) {
		currentParts[i].updateState();
	}
}

var drawBoard = function(ctx,parts) {
	for (var i = 0; i < parts.length; i++) {
		drawTile(ctx,parts,i);
	}
	return 0;
}

var drawTile = function(ctx,parts,id) {
	parts[id].shape.draw(ctx);
	return 0;
}

var drawTileNeighbors = function(ctx,parts,id) {
	for (var i = 0; i < parts[id].neighbors.length; i++) {
		parts[id].neighbors.sort(function(a,b){return a - b});
		if (parts[id].neighbors[i] < parts.length) {
			drawTile(ctx,parts,parts[id].neighbors[i]);
		}
	}
	return 0;
}


var changeSettings = function(){
	//bpm = document.getElementById("bpm").value;
	//speed = (60/bpm)*1000;
	var startstate = new Array();
	startstate[0] = document.shapes.s0.checked;
	startstate[1] = document.shapes.s1.checked;
	startstate[2] = document.shapes.s2.checked;
	startstate[3] = document.shapes.s3.checked;
	startstate[4] = document.shapes.s4.checked;
	startstate[5] = document.shapes.s5.checked;
	startstate[6] = document.shapes.s6.checked;
	startstate[7] = document.shapes.s7.checked;
	startstate[8] = document.shapes.s8.checked;
	startstate[9] = document.shapes.s9.checked;
	startstate[10] = document.shapes.s10.checked;
	startstate[11] = document.shapes.s11.checked;
	startstate[12] = document.shapes.s12.checked;
	startstate[13] = document.shapes.s13.checked;
	startstate[14] = document.shapes.s14.checked;
	startstate[15] = document.shapes.s15.checked;
	startstate[16] = document.shapes.s16.checked;
	startstate[17] = document.shapes.s17.checked;
	startstate[18] = document.shapes.s18.checked;
	startstate[19] = document.shapes.s19.checked;
	startstate[20] = document.shapes.s20.checked;
	
	for (var i = 0; i < 21; i++) {
		switch (startstate[i]) {
			case true:
				currentParts[i].makeLive();
				break;
			case false:
				currentParts[i].makeDead();
		}
		currentParts[i].updateState();
	}
}	

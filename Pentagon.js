var Pentagon = function(scale,dx,dy,rot) {
	this.state = false;
	this.dx = dx;
	this.dy = dy;
	this.rot = rot*(Math.PI/180);
	// Draw a pentagon at a location
	this.color = {};
	this.color.live = "rgb(255,255,255)";
	this.color.dead = "rgb(0,0,0)";
	this.draw = function(ctx) {
		ctx.save();
		ctx.translate(dx,dy);
		ctx.rotate(rot);
		ctx.beginPath();
		ctx.moveTo(
			this.coords[0]['x'],
			this.coords[0]['y']);
		for (var i = 1; i <= this.coords.length; i++) {
			ctx.lineTo(
				this.coords[i%5]['x'],
				this.coords[i%5]['y']);
		}
		ctx.stroke();
		if (this.state) {
			ctx.fillStyle = this.color.live;
			ctx.fill();
		} else {
			ctx.fillStyle = this.color.dead
			ctx.fill();
		}

		ctx.closePath();
		ctx.restore();
	}

	this.getPtX = function(n) {
		return dx+this.coords[n]['x'];
	}
	this.getPtY = function(n) {
		return dy+this.coords[n]['y'];
	}

	// Build a unit pentagon
	this.coords = new Array(5);
	for (var i = 0; i < this.coords.length; i++) {
		this.coords[i] = new Array();
		switch (i) {
			case 0:
				var x = 0;
				var y = 1*scale;
				break;
			case 1:
				var x = Math.sin((2*Math.PI)/5)*scale;
				var y = Math.cos((2*Math.PI)/5)*scale;
				break;
			case 2:
				var x =  Math.sin((4*Math.PI)/5)*scale;
				var y = -Math.cos((Math.PI)/5)*scale;
				break;
			case 3:
				var x = -Math.sin((4*Math.PI)/5)*scale;
				var y = -Math.cos((Math.PI)/5)*scale;
				break;
			case 4:
				var x = -Math.sin((2*Math.PI)/5)*scale;
				var y =  Math.cos((2*Math.PI)/5)*scale;
				break;
		}
		this.coords[i]['x'] = x;
		this.coords[i]['y'] = y;
	}
}

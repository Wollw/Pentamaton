var AcuteTriangle = function(pentagon,p1,p2,rot) {
	var dx = Math.abs(pentagon.coords[p1]['x']-pentagon.coords[p2]['x']);
	var dy = Math.abs(pentagon.coords[p1]['y']-pentagon.coords[p2]['y']);
	var len = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
	len = Math.tan((Math.PI/180)*72)*len/2;
	this.len = len;

	this.coords = new Array(3);
	for (var i = 0; i < this.coords.length; i++) {
		this.coords[i] = new Array();
		switch (i) {
			case 0:
				this.coords[i]['x'] = 0;
				this.coords[i]['y'] = 0;
				break;
			case 1:
				this.coords[i]['x'] = Math.abs(
							pentagon.coords[p1]['x']
							-pentagon.coords[p2]['x']);
				this.coords[i]['y'] = Math.abs(
							pentagon.coords[p2]['y']
							-pentagon.coords[p1]['y']);
				break;
			case 2:
				// Trigonometrically solve for missing vertex of triangle
				this.coords[i]['x'] = this.coords[1]['x']/2;
				this.coords[i]['y'] = Math.tan((Math.PI/180)*72)*this.coords[i]['x'];
				break;
		}
	}


	this.getPtX = function(n) {
		return this.pentagon.coords[this.origin]['x']
			+this.pentagon.dx+this.coords[n]['x'];
	}
	this.getPtY = function(n) {
		return this.pentagon.coords[this.origin]['y']
			+this.pentagon.dy+this.coords[n]['y'];
	}


	this.pentagon;
	this.origin;
	this.rotation;
	this.color = {};
	this.color.live = "rgb(255,255,255)";
	this.color.dead = "rgb(0,0,0)";
	this.draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(
			this.pentagon.coords[this.origin]['x']+this.pentagon.dx,
			this.pentagon.coords[this.origin]['y']+this.pentagon.dy);
		ctx.rotate((Math.PI/180)*this.rotation);
		ctx.moveTo(
			this.coords[0]['x'],
			this.coords[0]['y']);
		for (var i = 1; i <= this.coords.length; i++) {
			ctx.lineTo(
				this.coords[i%3]['x'],
				this.coords[i%3]['y']);
		}
		ctx.stroke();
		if (this.state) {
			ctx.fillStyle = this.color.live;
			ctx.fill();
		}	else {
			ctx.fillStyle = this.color.dead;
			ctx.fill();
		}
		ctx.closePath();
		ctx.restore();
	}

}


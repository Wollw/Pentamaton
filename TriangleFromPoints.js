var ObtuseTriangle = function(pentagram,len) {
	this.base = (Math.sin((Math.PI/180)*54)*len);
	this.height = (Math.cos((Math.PI/180)*54)*len);
	this.coords = new Array(3);
	for (var i = 0; i < this.coords.length; i++) {
		this.coords[i] = new Array();
		switch (i) {
			case 0:
				this.coords[i]['x'] = 0;
				this.coords[i]['y'] = 0;
				break;
			case 1:
				this.coords[i]['x'] = -this.base;
				this.coords[i]['y'] = this.height+1;
				break;
			case 2:
				this.coords[i]['x'] = this.base;
				this.coords[i]['y'] = this.height+1;
				break;
		}
	}

	this.pentagon;
	this.origin;
	this.dx;
	this.dy;
	this.rescale;
	this.rotation;
	this.color = {};
	this.color.live = "rgb(255,255,255)";
	this.color.dead = "rgb(0,0,0)";
	this.draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.dx,this.dy);
		ctx.rotate((Math.PI/180)*this.rotation);
		ctx.scale(this.rescale,this.rescale);
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


function Player(resource) {
	this.resource = resource;
	this.buildSprite();
}

Player.prototype = {
	animations: {},
	state: 'idle',
	
	x: 400,
	y: 300,
	
	vel_x: 0,
	vel_y: 50,
	
	width: 97,
	height: 97,
	
	top: function() { return Math.round(this.y); },
	left: function() { return Math.round(this.x); },
	right: function() { return Math.round(this.x + this.width); },
	bottom: function() { return Math.round(this.y + this.height); },
	
	process: function(seconds){
		this.x += this.vel_x * seconds;
		
		if (engine.mainCollider > this.bottom()) {
			this.y = this.y + this.vel_y * seconds;
		}
		
		this.currentAnimation().animate(seconds);
	},
	
	currentAnimation: function(){
		return this.animations[this.state];
	},
	
	draw: function(canvas){
		var frame = this.currentAnimation().getSprite();
		var w = this.width;
		var h = this.height;
		
		if (debug) {
			canvas.fillStyle = "rgba(0,200,0, 0.3)";
			canvas.fillRect(this.x, this.y, w,h);
			
			canvas.strokeStyle = "rgb(200,0,0)";
			
			canvas.beginPath();
			canvas.moveTo(Math.round(this.x + (w/2)),this.top());
			canvas.lineTo(Math.round(this.x + (w/2)),this.bottom());
			canvas.stroke();
		}
		
		canvas.drawImage(this.resource, frame.x, frame.y, w, h, this.left(), this.top(), w, h);
	},
	
	buildSprite: function() {
		this.sprites = new SpriteSheet({
		  width: this.width,
		  height: this.height,
	    sprites: [
	      { name: 'idle1', x: 0, y: 0 },
	      { name: 'idle2', x: 1, y: 0 },
	      { name: 'idle3', x: 2, y: 0 },
				{ name: 'idle4', x: 3, y: 0 },
				
				{ name: 'run1', x: 0, y: 4 },
				{ name: 'run2', x: 1, y: 4 },
				{ name: 'run3', x: 2, y: 4 },
	    ]
		});

		this.animations['idle'] = new Animation([
		   { sprite: 'idle1', time: 0.1 },
		   { sprite: 'idle2', time: 0.1},
		   { sprite: 'idle3', time: 0.1 },
			 { sprite: 'idle4', time: 0.2 },
			 { sprite: 'idle3', time: 0.1 },
			 { sprite: 'idle2', time: 0.1 },
	  ], this.sprites);
	
		this.animations['run'] = new Animation([
		   { sprite: 'run1', time: 0.2 },
		   { sprite: 'run2', time: 0.2 },
		   { sprite: 'run3', time: 0.2 },
			 { sprite: 'run2', time: 0.2 },
	  ], this.sprites);
	}
}


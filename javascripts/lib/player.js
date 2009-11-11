var STATE_JUMP = 'jump';
var STATE_RUN = 'run';
var STATE_IDLE = 'idle';

var LEFT = -200;
var RIGHT = 200;

function Player(resource) {
	this.resource = resource;
	this.buildSprite();
}

Player.prototype = {
	animations: {},
	state: STATE_JUMP,
	isJumping: true,
	
	x: 400,
	y: 0,
	
	vel_x: 0,
	vel_y: 0,
	
	width: 75,
	height: 75,
	
	top: function() { return Math.round(this.y); },
	left: function() { return Math.round(this.x); },
	right: function() { return Math.round(this.x + this.width); },
	bottom: function() { return Math.round(this.y + this.height); },
	
	run: function(vel){
		this.vel_x = vel;
		this.state = STATE_RUN;
	},
	
	stop: function(){
		if (this.state == STATE_RUN) {
			this.state = STATE_IDLE;
		};
		
		this.vel_x = 0;
	},
	
	jump: function(){
		if (this.isJumping) {
			this.vel_y = -200;
			this.isJumping = true;
			this.state = STATE_JUMP;
			log('Player is jumping!');
		}
	},
	
	process: function(seconds){
		if (this.isJumping) {
			this.vel_y = this.vel_y + engine.gravity * seconds 
		}
		
		this.x += this.vel_x * seconds;
		this.y += this.vel_y * seconds;
		
		this.currentAnimation().animate(seconds);
		
		if (this.isJumping && this.bottom() > engine.floorY) {
			this.vel_y = 0;
			this.y = engine.floorY - this.height;
			this.state = STATE_IDLE;
			this.isJumping = false;
		}else{
			this.isJumping = true;
		}
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
				{ name: 'run4', x: 3, y: 4 },
	    ]
		});

		this.animations['idle'] = new Animation([
		   { sprite: 'idle1', time: 0.2 },
		   { sprite: 'idle2', time: 0.2 },
		   { sprite: 'idle3', time: 0.2 },
			 { sprite: 'idle4', time: 0.2 },
	  ], this.sprites);
		
		this.animations['jump'] = new Animation([
		   { sprite: 'idle1', time: 0.5 }
	  ], this.sprites);
		
		this.animations['run'] = new Animation([
		   { sprite: 'run1', time: 0.1 },
		   { sprite: 'run2', time: 0.1 },
		   { sprite: 'run3', time: 0.1 },
			 { sprite: 'run4', time: 0.1 },
	  ], this.sprites);
	}
}


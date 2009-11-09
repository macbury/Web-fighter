var curX = 0;
var curY = 0;

var debug = true;

var engine = {
	width: 800,
	height: 600,
	
	mainCollider: 450,
	
	mainTimer: null,
	frameTimer: null,
	
	player1: null,
	
	init: function(resources){
		var self = this;
		self.resources = resources;
		
		self.canvas = $('canvas')[0].getContext('2d');
		
		self.player1 = new Player(self.resources.getById('player1'));
		
		self.frameTimer = new FrameTimer();
		self.mainTimer = setInterval(function () {
			self.process();
		}, 50);
		
		$('.container canvas').mousemove(function(e){
			curX = e.pageX - this.offsetLeft;
			curY = e.pageY - this.offsetTop;
		}).click(function () {
			console.log('y: '+curY);
			console.log('x: '+curX);
		});
		
		$(window).keydown(function(event){
			
			if (event.keyCode == 65) {
				// A
				self.player1.vel_x = -100;
			} else if (event.keyCode == 68) {
				// D
				self.player1.vel_x = 100;
			}else{
				self.player1.vel_x = 0;
			};
			
			if (event.keyCode == 35) {
				self.player1.vel_y = 100;
			} else {
				self.player1.vel_y = -100;
			}
			
		}).keyup(function () {
			$(this).keydown();
		});
	},
	
	process: function () {
		var seconds = this.frameTimer.getSeconds();

		this.player1.process(seconds);

		this.render();
		this.frameTimer.tick();
	},

	render: function () {
		var self = this;
		var c = self.canvas;
		c.clearRect(0,0,self.width,self.height);
		c.drawImage(self.resources.getById('background'), 0, 0);

		self.player1.draw(c);
	}
}

var SpriteSheet = function(data) {
    this.load(data);
};
 
SpriteSheet.prototype = {
	_sprites: [],
	_width: 0,
	_height: 0,
 
	load: function(data) {
		this._height = data.height;
		this._width = data.width;
		this._sprites = data.sprites;
	},

	getOffset: function(spriteName) {
		for(var i = 0, len = this._sprites.length; i < len; i++) {
		    var sprite = this._sprites[i];

		    if(sprite.name == spriteName) {
		        return {
		            x: ((sprite.x||0) * this._width),
		            y: ((sprite.y||0) * this._height),
		            width: this._width,
		            height: this._height
		        };
		    }
		}

		return null;
	}
};
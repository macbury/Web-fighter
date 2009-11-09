/*
	1. Array with resources
*/
function Resources(hash) {
	var self = this;
	this.list = {};
	this.loaded = 0;
	
	$.each(hash, function (id, src) {
		var image = new Image();
		self.list[id] = image;
		image.onload = function () { self.loaded++; };
		image.src = src;
	});
	
	this.loadTimer = setInterval(function () {
		if (self.loaded == Object.size(self.list)) {
			clearInterval(self.loadTimer);
			self.loadTimer = null;
			engine.init(self);
		}
	}, 100);
}

Resources.prototype.getById = function (id) {
	return this.list[id];
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
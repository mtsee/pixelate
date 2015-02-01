(function(root) {

  function Pixelate(el, opts) {
    opts = opts || {};
    this.setAmount(opts.amount);

    this.imageUrl = el.src;
    this.width = el.clientWidth;
    this.height = el.clientHeight;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.imageRendering = 'optimizeSpeed';
    this.canvas.style.imageRendering = '-webkit-crisp-edges';
    this.canvas.style.imageRendering = '-moz-crisp-edges';
    this.canvas.style.imageRendering = '-o-crisp-edges';
    this.canvas.style.imageRendering = 'crisp-edges';
    this.canvas.style.msInterpolationMode = 'nearest-neighbor';

    el.style.display = 'none';
    el.parentNode.appendChild(this.canvas, el);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.pixelImage = new Image();
    this.pixelImage.onload = function() {
      this.render();
    }.bind(this);
    this.pixelImage.src = this.imageUrl;

    return this;
  }

  Pixelate.prototype.setAmount = function(amount) {
    this.amount = 1 - (amount || 0);
    return this;
  };

  Pixelate.prototype.setWidth = function(width) {
    var height = (this.height / this.width) * width;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    return this;
  };

  Pixelate.prototype.render = function() {
    var w = this.width * (this.amount <= 0 ? 0.01 : this.amount);
    var h = this.height * (this.amount <= 0 ? 0.01 : this.amount);
    // render smaller image
    this.ctx.drawImage(this.pixelImage, 0, 0, w, h);
    // stretch the smaller image
    this.ctx.drawImage(this.canvas, 0, 0, w, h, 0, 0, this.width, this.height);
    return this;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Pixelate;
    }
    exports.pixelate = Pixelate;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Pixelate;
    });
  } else {
    root.Pixelate = Pixelate;
  }

})(this);
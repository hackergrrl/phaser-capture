(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Phaser.Plugin.Capture = factory();
  }
}(this, function () {

  function Capture(game, parent) {
    Phaser.Plugin.call(this, game, parent);

    this.pendingScreenshot = null;

    this.game = game;
  };

  // Capture.prototype = Object.create(Phaser.Plugin.prototype);
  // Capture.prototype.constructor = Phaser.Plugin.SamplePlugin;

  // Capture.prototype.setup = function() {
  // };

  Capture.prototype.screenshot = function(callback, options) {
    if (!callback) {
      return;
    }
    options = options || {}

    this.pendingScreenshot = {
      format: options.format || 'image/png',
      callback: callback,
    }
  };

  // Capture.prototype.startRecord = function() {
  // };

  // Capture.prototype.stopRecord = function() {
  // };

  Capture.prototype.postRender = function() {
    if (this.pendingScreenshot) {
      var dataUrl = game.canvas.toDataURL(this.pendingScreenshot.format);
      if (this.pendingScreenshot.callback) {
        this.pendingScreenshot.callback(dataUrl);
        this.pendingScreenshot = null;
      }
    }
  };

  return Capture;
}));

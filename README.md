# Why?

Although each OS has their own set of tools for screenshots and video capture, I
wanted something platform agnostic that I could simply plug into whatever
web-based game I was making. This also lets me collect captures on computers
that I don't have software installation rights on.

I chose [Phaser](http://www.phaser.io) in particular only because it's what I'm
already using most of the time, but I would like to eventually include a more
minimal module that does the core screenshot/recording work without being
coupled to Phaser.


# Usage

The plugin is packaged via [UMD](https://github.com/umdjs/umd), meaning it'll
work happily used if included browser globally (via `<script
src="phaser-capture.js">`) or if you prefer Node or
[Browserify](http://browserify.org/).

Unfortunately [Phaser plugins](http://phaser.io/docs/2.2.2/Phaser.Plugin.html)
are not very well documented, and most rely on their own ad-hoc documentation to
instruct their users. For now, `phaser-capture` is no different:

```javascript
// var PhaserCapture = require('phaser-capture');  // For Node/Browserify users

var playState = {
  create: function() {
    game.capture = game.plugins.add(Phaser.Plugin.Capture);
    // game.capture = game.plugins.add(PhaserCapture);  // Node/Browserify

    // Take a screenshot every 5 seconds.
    setInterval(function() {
      game.capture.screenshot(function(dataUrl) {
        // Outputs a data-url of the image (default image/png).
        console.log(dataUrl);
      });
    }, 5000);
  },
};

game = new Phaser.Game(800, 600);
game.state.add('play', playState);
game.state.start('play');
```

# API

The resultant plugin exposes only one method currently:

### `screenshot(callback, opts)`

 * `callback` is the function that will be called once the screenshot render is
   complete. It assumes its only argument will be a data-url.
 * `options` is an object that may contain:
   * `format`, either `image/png` or `image/jpeg`

# /THE FUTURE!/
 1. Downloading screenshots easily
 2. Uploading screenshots somewhere (Dropbox? Something more agnostic?)
 3. Video recording! (GIF, WebM)


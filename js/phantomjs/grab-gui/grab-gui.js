var casper = require('casper').create({
  viewportSize: {
    width: 1366, 
    height: 768
  }
});

casper.start('file:///Library/Projects/git/gui-demo/index.html', function() {
    var fileEnding = "png";
    var rootDir = "output/";

    var now = new Date();
    var dateString = now.toLocaleDateString();
    var timeString = now.toLocaleTimeString();
    nowString = dateString + "_" + timeString;
    var dirName = "gui-demo-elements-images_1366x768" + nowString;

    var fullPagePath = rootDir + dirName + "/full-page." + fileEnding
    casper.capture(fullPagePath);
    console.log("Saved: ", fullPagePath);

    var elemsToCapture = this.getElementsInfo('[data-capture]');

    elemsToCapture.forEach(function(elm) {
      var fullPath = rootDir + dirName + "/" + elm.attributes["data-capture"] + "." + fileEnding;
      casper.capture(fullPath, {
        top: elm.y,
        left: elm.x,
        width: elm.width,
        height: elm.height
      }, 
      {
        format: fileEnding,
        quality: 100
      });
      console.log("Saved: ", fullPath);
    });
});

casper.run();
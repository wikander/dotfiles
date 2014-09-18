var page = require('webpage').create();
var args = require('system').args;
var url, dir, fileName;
if (args[1] === undefined) {
  console.log("Usage: screenshot.js [url] [directory]");
  phantom.exit();
} else {
  url = args[1];
  if (args[2] === undefined || args[2] == ".") {
    dir = "";
  } else {
    dir = args[2] + "/";
  }

  fileName = args[3];
}

if (fileName === undefined) {
  var now = new Date();
  var dateString = now.toLocaleDateString();
  var timeString = now.toLocaleTimeString();

  nowString = dateString + "_" + timeString;

  var parser = document.createElement('a');
  parser.href = url;

  var fileNameTag = parser.hostname + (parser.pathname == "/" ? "" : parser.pathname);

  fileName = fileNameTag + "_" + nowString;
  fileName = fileName.replace(/\//g, "|");
}

fileName = fileName + ".png";

page.open(url, function () {
    page.render('./' + dir + fileName);
    console.log("Generated filename: " + fileName);
    console.log("In path: " + dir);
    phantom.exit();
});
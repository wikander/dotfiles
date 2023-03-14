var casper = require('casper').create();
var pageURL = 'http://172.25.7.195:8080/external/fund.html?isin=VGG3193X1015&orgNr=202100-6255';

casper.start(pageURL, function() {
  this.capture('fund-screenshot.png');

  this.test.assertHttpStatus(200, 'Fund page is up.');

  this.test.assertTitle('Max Matthiessen', 'Title is the one expected.');

  this.test.assertEval(function() {
    var timeSpanLink = document.querySelector('ul#time-span-tabs > li.active > a');
    return timeSpanLink.getAttribute('href') === "#THREE_MONTHS";
  }, 'Three months is the default active tab.');
});

casper.run(function() {
    this.test.done(3);
    this.test.renderResults(true);
});
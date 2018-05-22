var pageURL = 'http://axsaimapprd.int.axstores.se:9000/#/';
casper.test.begin('Aim is alive and we are able to login.', 2, function suite(test) {
  casper.start(pageURL, function() {
    this.capture('login-page.png');

    this.test.assertHttpStatus(200, 'AIM is alive!');

    this.test.assertTitle('AIM', 'The title is correct.');
  });

  casper.run(function() {
    test.done();
  });
});

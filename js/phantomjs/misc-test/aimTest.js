var pageURL = 'http://axsaimapprd.int.axstores.se:9000/#/';

casper.options.viewportSize = {
    width: 1440,
    height: 900
};

casper.test.begin('Aim is alive and we are able to login.', 4, function suite(test) {
  casper.start(pageURL, function() {
    this.test.assertHttpStatus(200, 'AIM is alive!');
    this.test.assertTitle('AIM', 'The title is correct.');

    this.fillSelectors('form[name="loginForm"]', {
      'input[name="username"]': 'admin@omegapoint.se',
      'input[name="password"]': 'ockelbo300'
    }, false);

    casper.click('button[type="submit"]');

    casper.waitForResource('active', function() {
      casper.click('a.accordion-toggle');
      this.test.assertExists('ul.nav', "Menu is present.");
      this.test.assertTitle('AIM | Admin', 'First page in AIM reached.');

      casper.wait(100, function() {
        this.capture('home.png');
      });
    }, function() {
      this.echo('Loading of home page timeout.');
    },
    10000);

  }).run(function() {
    test.done();
  });

  casper.on('http.status.404', function(resource) {
    this.test.echo(resource.url + ' is 404');
  });
});

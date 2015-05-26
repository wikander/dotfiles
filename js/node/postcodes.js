var https = require('https');
 
var optionsget = {
    host : 'www.posten.se',
    path : '/_layouts/Posten/NordicWeb/pgm/PostalCodeLookup.ashx?country=se&postalcode=',
    method : 'GET' // do GET
};

var basePath = '/_layouts/Posten/NordicWeb/pgm/PostalCodeLookup.ashx?country=se&postalcode=';
var getPostCode = function(postCode) {
    optionsget.path = basePath + postCode;
    console.info("Request to: ", optionsget.path);
    var reqGet = https.request(optionsget, function(res) {
    //  console.log("headers: ", res.headers);
        if (res.statusCode == 200) {
            res.on('data', function(d) {
                var jsonData = JSON.parse(d);
                process.stdout.write(jsonData.postalcity);
            });
        } else {
            console.info("Inte 200 status.")
        }
    });
     
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
};

getPostCode(11730);
getPostCode(11854);

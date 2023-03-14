var express = require('express'),
    app = express(),
    mysql   = require('mysql'),
    bodyParser = require('body-parser'),
    connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'almreg'
    });

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/get-all-persons/', function (req, res) {
  res.set ({ 'Content-Type': 'application/json' });
  
  connectionpool.getConnection(function(err, connection) {
    if (err) {
        console.error('CONNECTION error: ',err);
        res.statusCode = 503;
        res.send({
            result: 'error',
            err:    err.code
        });
    } else {
        connection.query('SELECT * FROM Person ORDER BY id DESC LIMIT 20', req.params.id, function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            }
            res.send({
                result: 'success',
                err:    '',
                data:   rows,
                length: rows.length
            });
            connection.release();
        });
    }
  });
});

app.post('/insert/', function (req, res) {
  res.set ({ 'Content-Type': 'application/json' });
  
  connectionpool.getConnection(function(err, connection) {
    if (err) {
        console.error('CONNECTION error: ',err);
        res.statusCode = 503;
        res.send({
            result: 'error',
            err:    err.code
        });
    } else {
      var data = req.body;
      console.log(data);
      connection.query('INSERT INTO Person SET ?', data, function(err, result) {
          if (err) {
              console.error(err);
              res.statusCode = 500;
              res.send({
                  result: 'error',
                  err:    err.code
              });
          } else {
              res.send({
                  result: 'success',
                  err:    '',
                  id:     result.insertId
              });
          }
          connection.release();
      });
    }
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
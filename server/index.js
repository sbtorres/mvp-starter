var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/purchases', function (req, res) {
  db.getPurchases(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


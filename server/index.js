var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/purchases', function (req, res) {
  db.getPurchases(req.body, function(err, purchases) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(purchases);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));

app.get('/purchases/:id', function (req, res) {
  const userId = req.params.id;
  db.getPurchases(userId, function(err, purchases) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(purchases);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


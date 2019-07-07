var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));

app.get('/purchases/:id', function (req, res) {
  const userId = req.params.id;
  let sortedPurchases = {};
  db.getPurchases(userId, function(err, purchases) {
    if(err) {
      res.status(404).send(err);
    } else {
      purchases.map((purchase) => {
        if (sortedPurchases.hasOwnProperty(purchase.stock_ticker)) {
          sortedPurchases[purchase.stock_ticker].push(purchase);
        } else {
          sortedPurchases[purchase.stock_ticker] = [purchase];
        }
      })
      res.status(200).send(sortedPurchases);
    }
  });
});

app.get('/historicalData/:symbol/:date', function (req, res) {
  const ticker = req.params.symbol;
  const date = req.params.date;
  db.getHistoricalData(ticker, date, function (err, data) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.post('/purchases/:user_id', function (req, res) {
  const userId = req.params.user_id;
  db.createPurchase(userId, req.body, (err) => {
    if (err) {
      res.status(422).send(err);
    } else {
      res.status(201).send('Posted!');
    }
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


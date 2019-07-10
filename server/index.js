const axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));

const getData = (expectedTickers, callback) => {
  let count = 0;
  for (let key in expectedTickers) {
    console.log(expectedTickers);
    axios.get(`https://api.iextrading.com/1.0/tops/last?symbols=${key}`)
    .then((currentStockData) => {
      console.log('in then');
      expectedTickers[key] = currentStockData.data[0].price;
      count++;
      if (count === Object.keys(expectedTickers).length) {
        callback(expectedTickers);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

app.get('/purchases/:id', function (req, res) {
  const userId = req.params.id;
  let sortedPurchases = {stockSummary:{}};
  let expectedTickers = {};

  db.getPurchases(userId, function(err, purchases) {
    if(err) {
      res.status(404).send(err);
    } else {
      for (let i = 0; i < purchases.length; i++) {
        if (!expectedTickers[purchases[i]]) {
          expectedTickers[purchases[i].stock_ticker] = 0;
        }
      }

      getData(expectedTickers, () => {
        for (let i = 0; i < purchases.length; i++) {
          console.log('starting map');
          if (sortedPurchases.stockSummary.hasOwnProperty(purchases[i].stock_ticker)) {
            let stockSummaryData = sortedPurchases.stockSummary[purchases[i].stock_ticker];
            console.log(stockSummaryData);
            console.log(stockSummaryData.avg_share_price);
            let purchaseRatio = purchases[i].num_of_shares / (purchases[i].num_of_shares + stockSummaryData.num_of_shares);
            stockSummaryData.avg_share_price = (stockSummaryData.avg_share_price * (1 - purchaseRatio)) + (purchases[i].share_price * purchaseRatio);
            stockSummaryData.avg_dow_price = (stockSummaryData.avg_dow_price * (1 - purchaseRatio)) + (purchases[i].dow_price * purchaseRatio);
            stockSummaryData.avg_nasdaq_price = (stockSummaryData.avg_nasdaq_price * (1 - purchaseRatio)) + (purchases[i].nasdaq_price * purchaseRatio);
            stockSummaryData.avg_sp500_price = (stockSummaryData.avg_sp500_price * (1 - purchaseRatio)) + (purchases[i].sp500_price * purchaseRatio);
            stockSummaryData.num_of_shares += purchases[i].num_of_shares;
            stockSummaryData.individual_purchases.push(purchases[i]);
          } else {
            sortedPurchases.stockSummary[purchases[i].stock_ticker] = {
              stock_ticker: purchases[i].stock_ticker,
              num_of_shares: purchases[i].num_of_shares,
              avg_share_price: purchases[i].share_price,
              avg_dow_price: purchases[i].dow_price,
              avg_nasdaq_price: purchases[i].nasdaq_price,
              avg_sp500_price: purchases[i].sp500_price,
              current_share_price: expectedTickers[purchases[i].stock_ticker],
              individual_purchases: [purchases[i]],
            }
          }
        }

        sortedPurchases.individualPurchases = purchases;
        res.status(200).send(sortedPurchases);
      });
    }
  })
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


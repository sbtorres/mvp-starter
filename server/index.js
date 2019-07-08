const axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));

app.get('/purchases/:id', function (req, res) {
  const userId = req.params.id;
  let sortedPurchases = {stockSummary:{}};
  db.getPurchases(userId, function(err, purchases) {
    if(err) {
      res.status(404).send(err);
    } else {
      const requests = purchases.map(async (purchase) => {
        if (sortedPurchases.stockSummary.hasOwnProperty(purchase.stock_ticker)) {
          let stockSummaryData = sortedPurchases.stockSummary[purchase.stock_ticker];
          console.log(stockSummaryData);
          console.log(stockSummaryData.avg_share_price);
          let purchaseRatio = purchase.num_of_shares / (purchase.num_of_shares + stockSummaryData.num_of_shares);
          stockSummaryData.avg_share_price = (stockSummaryData.avg_share_price * (1 - purchaseRatio)) + (purchase.share_price * purchaseRatio);
          stockSummaryData.avg_dow_price = (stockSummaryData.avg_dow_price * (1 - purchaseRatio)) + (purchase.dow_price * purchaseRatio);
          stockSummaryData.avg_nasdaq_price = (stockSummaryData.avg_nasdaq_price * (1 - purchaseRatio)) + (purchase.nasdaq_price * purchaseRatio);
          stockSummaryData.avg_sp500_price = (stockSummaryData.avg_sp500_price * (1 - purchaseRatio)) + (purchase.sp500_price * purchaseRatio);
          stockSummaryData.num_of_shares += purchase.num_of_shares;
        } else {
          await axios.get(`https://api.iextrading.com/1.0/tops/last?symbols=${purchase.stock_ticker}`)
          .then((currentStockData) => {
            sortedPurchases.stockSummary[purchase.stock_ticker] = {
              stock_ticker: purchase.stock_ticker,
              current_share_price: currentStockData.data[0].price,
              num_of_shares: purchase.num_of_shares,
              avg_share_price: purchase.share_price,
              avg_dow_price: purchase.dow_price,
              avg_nasdaq_price: purchase.nasdaq_price,
              avg_sp500_price: purchase.sp500_price,
              user_id: purchase.user_id
            }
          }
          )
          .catch((err) => {
            console.log(err);
          })
        }
      })

      Promise.all(requests).then(() => {
        sortedPurchases.individualPurchases = purchases;
        res.status(200).send(sortedPurchases);
      })
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


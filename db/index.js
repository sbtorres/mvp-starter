var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'stock_tracker'
});

var getPurchases = function(userId, callback) {
  const query = 'SELECT * FROM purchases WHERE user_id = ' + connection.escape(userId);
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getHistoricalData = function(ticker, date, callback) {
  let table = '';
  switch (ticker) {
    case 'VOO':
      table = 'sp_historical';
      break;
    case 'QQQ':
      table = 'nasdaq_historical';
      break;
    case 'DIA':
      table = 'dow_historical';
      break;
    default: 
      table = '';
  }
  const query = `SELECT * FROM ${table} WHERE date = "${date}"`;
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = { getPurchases, getHistoricalData };

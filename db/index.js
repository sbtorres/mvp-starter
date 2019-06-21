var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'scotttorres',
  password : '',
  database : 'stock-tracker'
});

var getPurchases = function(callback, userId) {
  const query = 'SELECT * FROM purchases WHERE user_id = ' + connection.escape(userId);
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { getPurchases };

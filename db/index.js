var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'scotttorres',
  password : '',
  database : 'stock-tracker'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;

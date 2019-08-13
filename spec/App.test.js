const axios = require('axios');

test('User with id of 1 returns JSON stock data with correct shape', done => {
  const callback = (data) => {
    expect(data).toHaveProperty('stockSummary');
    expect(data).toHaveProperty('individualPurchases');
    expect(data).toHaveProperty('stockSummary.AAPL');
    done();
  }

  axios.get('http://localhost:3000/purchases/1')
    .then((results) => {
      callback(results.data);
    })
    .catch((err) => {
      console.log(err);
    })

});

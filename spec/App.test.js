const axios = require('axios');

test('User with id of 1 returns JSON stock data', done => {
  const callback = (data) => {
    expect(data).toHaveProperty('stockSummary');
    done();
  }

  axios.get('http://localhost:3000/purchases/1')
    .then((results) => {
      callback(results.data);
    })

})
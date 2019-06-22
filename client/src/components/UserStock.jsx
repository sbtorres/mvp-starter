import React from 'react';

const UserStock = (props) => (
  <div>
    { props.purchase.stock_ticker }
    { props.purchase.share_price}
  </div>
)

export default UserStock;
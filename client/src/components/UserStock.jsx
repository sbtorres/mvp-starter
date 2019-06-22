import React from 'react';

const UserStock = (props) => (
  <div className="user-stock">
      <div className="user-stock-ticker">
        { props.purchase.stock_ticker }
      </div>
      <div className="user-num-shares">
        { props.purchase.num_of_shares }
      </div>
      <div className="user-share-price">
        { '$' + props.purchase.share_price.toFixed(2) }
      </div>
  </div>
)

export default UserStock;
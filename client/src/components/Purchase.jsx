import React from 'react';

const Purchase = (props) => (
  <div className="user-stock">
      <div className="user-stock-ticker">
        { props.purchase.stock_ticker }
      </div>
      <div className="user-num-shares">
        { props.purchase.num_of_shares }
      </div>
      <div className="purchase-share-price">
        { '$' + props.purchase.share_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
      </div>
      <div className="current-share-price">
        { '$' + props.purchase.current_share_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
      </div>
      <div className="user-total">
        { '$' + (props.purchase.current_share_price * props.purchase.num_of_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className="stock-percent-gain">
        {(100 * (props.purchase.current_share_price - props.purchase.share_price) / props.purchase.share_price).toFixed(2) + '%'}
      </div>
  </div>
)

export default Purchase;
import React from 'react';
import Comparison from './Comparison.jsx';

const Purchase = (props) => (
  <div className="stocks-container">
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
          { '$' + props.stockSummary.current_share_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
        </div>
        <div className="user-total">
          { '$' + (props.stockSummary.current_share_price * props.purchase.num_of_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div className="stock-percent-gain">
          {(100 * (props.stockSummary.current_share_price - props.purchase.share_price) / props.purchase.share_price).toFixed(2) + '%'}
        </div>
    </div>
    <div className="comparison-list">
      <Comparison marketData={props.marketData} stockSummary={props.stockSummary} purchase={props.purchase} />
    </div>
  </div>
)

export default Purchase;
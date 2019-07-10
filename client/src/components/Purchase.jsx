import React from 'react';
import Comparison from './Comparison.jsx';
import moment from 'moment';

const Purchase = (props) => (
  <div className="stocks-container">
    <div className="individual-purchase">
        <div className="user-stock-ticker">
          { moment(props.purchase.date_purchased).format('l') }
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
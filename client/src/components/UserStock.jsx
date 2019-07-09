import React from 'react';
import Purchase from './Purchase.jsx';
import SummaryComparison from './SummaryComparison.jsx';

const UserStock = (props) => (
  <div>
    <div className="user-stock">
        <div className="user-stock-ticker">
          { props.stockSummary.stock_ticker }
        </div>
        <div className="user-num-shares">
          { props.stockSummary.num_of_shares }
        </div>
        <div className="stockSummary-share-price">
          { '$' + props.stockSummary.avg_share_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
        </div>
        <div className="current-share-price">
          { '$' + props.stockSummary.current_share_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
        </div>
        <div className="user-total">
          { '$' + (props.stockSummary.current_share_price * props.stockSummary.num_of_shares).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div className="stock-percent-gain">
          {(100 * (props.stockSummary.current_share_price - props.stockSummary.avg_share_price) / props.stockSummary.avg_share_price).toFixed(2) + '%'}
        </div>
    </div>
    <div>
      <SummaryComparison marketData={props.marketData} stockSummary={props.stockSummary} />
    </div>
    <div className="user-stocks-list">
      { props.stockSummary.individual_purchases.map(purchase => 
        <Purchase key={purchase.id} marketData={props.marketData} purchase={purchase} stockSummary={props.stockSummary}/> 
      )}
    </div>
  </div>
)

export default UserStock;
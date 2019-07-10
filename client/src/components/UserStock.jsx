import React, {useState} from 'react';
import Purchase from './Purchase.jsx';
import SummaryComparison from './SummaryComparison.jsx';

const UserStock = (props) => {

  const [arePurchasesVisible, setArePurchasesVisible] = useState(false);

  function handleStockClick(event) {
    setArePurchasesVisible(!arePurchasesVisible)
  }

  return (
    <div>
      <div className="stocks-container">
        <div className="user-stock" onClick={handleStockClick}>
          <div className="stock-summary-container">
            <div className="user-stock-ticker">
              { props.stockSummary.stock_ticker }
            </div>
            <div className="user-num-shares">
              { props.stockSummary.num_of_shares }
            </div>
            <div className="purchase-share-price">
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
            <div className="comparison-list">
              <SummaryComparison marketData={props.marketData} stockSummary={props.stockSummary} />
            </div>
            </div>
            {arePurchasesVisible && 
              <div className="individual-purchase-container">
                { props.stockSummary.individual_purchases.map(purchase => 
                  <Purchase key={purchase.id} marketData={props.marketData} purchase={purchase} stockSummary={props.stockSummary}/> 
                )}
              </div>
            }
        </div>

      </div>
    </div>
  )
}

export default UserStock;
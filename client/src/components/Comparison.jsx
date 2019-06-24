import React from 'react';

const Comparison = (props) => (
  <div className="comparison">
    {props.purchases.map((purchase) => {
      return (
        <div key={purchase.id} className="comparison-row">
          <div className="sp500-comparison">{
            ((100 * (((purchase.num_of_shares * purchase.current_share_price) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price))) - 
            (100 * (((((purchase.num_of_shares * purchase.share_price) / purchase.sp500_price) * props.marketData[0].lastSalePrice) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price)))).toFixed(2) + '%'
            }
          </div>
          <div className="nasdaq-comparison">{
            ((100 * (((purchase.num_of_shares * purchase.current_share_price) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price))) - 
            (100 * (((((purchase.num_of_shares * purchase.share_price) / purchase.nasdaq_price) * props.marketData[1].lastSalePrice) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price)))).toFixed(2) + '%'
            }
          </div>
          <div className="dow-comparison">{
            ((100 * (((purchase.num_of_shares * purchase.current_share_price) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price))) - 
            (100 * (((((purchase.num_of_shares * purchase.share_price) / purchase.dow_price) * props.marketData[2].lastSalePrice) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price)))).toFixed(2) + '%'
            }
          </div>
        </div>
      );
    })}
  </div>
)


export default Comparison;

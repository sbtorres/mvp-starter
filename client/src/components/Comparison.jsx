import React from 'react';

const Comparison = (props) => {
  console.log(props);
  const {stockSummary, purchase, marketData} = props;
  return(
    <div className="comparison">
      <div key={purchase.id} className="comparison-row">
        <div className="sp500-comparison">{
          ((100 * (((purchase.num_of_shares * stockSummary.current_share_price) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price))) - 
          (100 * (((((purchase.num_of_shares * purchase.share_price) / purchase.sp500_price) * marketData[0].lastSalePrice) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price)))).toFixed(2) + '%'
          }
        </div>
        <div className="nasdaq-comparison">{
          ((100 * (((purchase.num_of_shares * stockSummary.current_share_price) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price))) - 
          (100 * (((((purchase.num_of_shares * purchase.share_price) / purchase.nasdaq_price) * marketData[1].lastSalePrice) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price)))).toFixed(2) + '%'
          }
        </div>
        <div className="dow-comparison">{
          ((100 * (((purchase.num_of_shares * stockSummary.current_share_price) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price))) - 
          (100 * (((((purchase.num_of_shares * purchase.share_price) / purchase.dow_price) * marketData[2].lastSalePrice) - (purchase.num_of_shares * purchase.share_price)) / (purchase.num_of_shares * purchase.share_price)))).toFixed(2) + '%'
          }
        </div>
      </div>
    </div>
  )
}


export default Comparison;

import React from 'react';

const SummaryComparison = (props) => (
  <div className="comparison">
    <div key={props.stockSummary.id} className="comparison-row">
      <div className="sp500-comparison">{
        ((100 * (((props.stockSummary.num_of_shares * props.stockSummary.current_share_price) - (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)) / (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price))) - 
        (100 * (((((props.stockSummary.num_of_shares * props.stockSummary.avg_share_price) / props.stockSummary.avg_sp500_price) * props.marketData[0].lastSalePrice) - (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)) / (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)))).toFixed(2) + '%'
        }
      </div>
      <div className="nasdaq-comparison">{
        ((100 * (((props.stockSummary.num_of_shares * props.stockSummary.current_share_price) - (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)) / (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price))) - 
        (100 * (((((props.stockSummary.num_of_shares * props.stockSummary.avg_share_price) / props.stockSummary.avg_nasdaq_price) * props.marketData[1].lastSalePrice) - (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)) / (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)))).toFixed(2) + '%'
        }
      </div>
      <div className="dow-comparison">{
        ((100 * (((props.stockSummary.num_of_shares * props.stockSummary.current_share_price) - (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)) / (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price))) - 
        (100 * (((((props.stockSummary.num_of_shares * props.stockSummary.avg_share_price) / props.stockSummary.avg_dow_price) * props.marketData[2].lastSalePrice) - (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)) / (props.stockSummary.num_of_shares * props.stockSummary.avg_share_price)))).toFixed(2) + '%'
        }
      </div>
    </div>
  </div>
)


export default SummaryComparison;

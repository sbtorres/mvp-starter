import React from 'react';

const MarketOverview = (props) => (
  <div>
    <h2 style={{"display": "flex", "justifyContent": "center", "margin": "5px 5px"}}>Current Market Overview</h2>
    <div className="top-headers">
      {props.marketData.map((tickerData, index) => {
        return (
          <ul key={index} className="index-fund-column">
            <li className="index-fund-ticker">{tickerData.symbol}:</li>
            <li className="index-fund-price">{'$' + tickerData.lastSalePrice.toFixed(2)}</li>
          </ul>
        );
      })}
    </div>
  </div>
)

export default MarketOverview;
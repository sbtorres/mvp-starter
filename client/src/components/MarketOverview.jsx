import React from 'react';

const MarketOverview = (props) => (
  <div id="index-fund-list">
    {props.marketData.map((tickerData) => {
      return (
        <ul className="index-fund-column">
          <li className="index-fund-ticker">{tickerData.symbol}</li>
          <li className="index-fund-price">{tickerData.lastSalePrice}</li>
        </ul>
      );
    })}
  </div>
)

export default MarketOverview;
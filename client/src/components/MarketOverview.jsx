import React from 'react';

const MarketOverview = (props) => (
  <ul id="index-fund-list">
    {props.marketData.map((tickerData) => {
      return (<li className="index-fund-ticker">{tickerData.symbol}   {tickerData.lastSalePrice}</li>);
    })}
  </ul>
)

export default MarketOverview;
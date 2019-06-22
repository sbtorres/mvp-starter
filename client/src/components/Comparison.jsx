import React from 'react';

const Comparison = (props) => (
  <div>
    {props.purchases.map((purchase) => {
      return (
        <div>
          <div>{(100 * (props.marketData[0].lastSalePrice - purchase.sp500_price) / purchase.sp500_price).toFixed(2)}</div>
          <div>{(100 * (props.marketData[1].lastSalePrice - purchase.nasdaq_price) / purchase.nasdaq_price).toFixed(2)}</div>
          <div>{(100* (props.marketData[2].lastSalePrice - purchase.dow_price) / purchase.dow_price).toFixed(2)}</div>
        </div>
      );
    })}
  </div>
)


export default Comparison;
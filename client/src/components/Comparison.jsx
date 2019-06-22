import React from 'react';

const Comparison = (props) => (
  <div>
    {props.purchases.map((purchase) => {
      return (
        <div>
          <div>{(props.marketData[0].lastSalePrice - purchase.sp500_price) / purchase.sp500_price}</div>
        </div>
      );
    })}
  </div>
)


export default Comparison;
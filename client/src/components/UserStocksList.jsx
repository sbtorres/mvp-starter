import React from 'react';
import UserStock from './UserStock.jsx';

const UserStocksList = (props) => (
  <div style={{"width": "100%"}}>
    <h2> Your Stock Holdings </h2>
    <div className="header">
      <h4 className="left-header-col-1">Ticker</h4>
      <h4 className="left-header-col-2">Number of Shares</h4>
      <h4 className="left-header-col-3">Purchase Price</h4>
      <h4 className="left-header-col-4">Current Share Price</h4>
      <h4 className="left-header-col-5">Total</h4>
      <h4 className="left-header-col-6">Total Gain</h4>
    </div>
    <div className="user-stocks-list">
      {Object.keys(props.stockSummary).map(stockData => <UserStock key={stockData} stockSummary={props.stockSummary[stockData]} purchases={props.purchases} />)}
    </div>
  </div>
)

export default UserStocksList;
import React from 'react';
import UserStock from './UserStock.jsx';

const UserStocksList = (props) => (
  <div style={{"width": "100%"}}>
    <div className="stocks-titles">
      <h2 className="stocks-left-header"> Your Stock Holdings </h2>
      <h2 className="stocks-right-header">vs. Index Funds</h2>
    </div>
    <div className="header">
      <h5 className="left-header-col-1">Ticker</h5>
      <h5 className="left-header-col-2">Number of Shares</h5>
      <h5 className="left-header-col-3">Purchase Price</h5>
      <h5 className="left-header-col-4">Current Share Price</h5>
      <h5 className="left-header-col-5">Total</h5>
      <h5 className="left-header-col-6">Total Gain</h5>
      <h5 className="right-header-col-1">vs. S&amp;P 500</h5>
      <h5 className="right-header-col-2">vs. NASDAQ</h5>
      <h5 className="right-header-col-3">vs. DOW</h5>
    </div>

    <div className="user-stocks-list">
      {Object.keys(props.stockSummary).map(stockData => <UserStock key={stockData} marketData={props.marketData} stockSummary={props.stockSummary[stockData]} purchases={props.purchases} />)}
    </div>
  </div>
)

export default UserStocksList;
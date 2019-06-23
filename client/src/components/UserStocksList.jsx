import React from 'react';
import UserStock from './UserStock.jsx';

const UserStocksList = (props) => (
  <div style={{"width": "100%"}}>
    <h2> Your Stock Holdings </h2>
    <div className="header">
      <h4 className="left-header-col-1">Ticker</h4>
      <h4 className="left-header-col-2">Number of Shares</h4>
      <h4 className="left-header-col-3">Share Price</h4>
      <h4 className="left-header-col-4">Total</h4>
    </div>
    <div className="user-stocks-list">
      { props.purchases.map(purchase => <UserStock key={purchase.id} purchase={purchase}/>)}
    </div>
  </div>
)

export default UserStocksList;
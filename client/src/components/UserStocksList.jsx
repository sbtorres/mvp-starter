import React from 'react';
import UserStock from './UserStock.jsx';

const UserStocksList = (props) => (
  <div style={{"width": "100%"}}>
    <h2> Your Stock Holdings: </h2>
    <div className="user-stocks-list">
      { props.purchases.map(purchase => <UserStock purchase={purchase}/>)}
    </div>
  </div>
)

export default UserStocksList;
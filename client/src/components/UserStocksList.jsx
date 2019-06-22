import React from 'react';
import UserStock from './UserStock.jsx';

const UserStocksList = (props) => (
  <div>
    <h2> Your Stock Holdings: </h2>
    You own { props.purchases.length } stocks.
    { props.purchases.map(purchase => <UserStock purchase={purchase}/>)}
  </div>
)

export default UserStocksList;
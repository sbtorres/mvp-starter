import React from 'react';
import UserStock from './UserStock.jsx';

const UserStocksList = (props) => (
  <div>
    <h4> Holdings: </h4>
    You own { props.purchases.length } stocks.
    { props.purchases.map(item => <UserStock purchase={purchase}/>)}
  </div>
)

export default UserStocksList;
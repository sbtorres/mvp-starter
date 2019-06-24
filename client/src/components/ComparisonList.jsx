import React from 'react';
import Comparison from './Comparison.jsx'

const ComparisonList = (props) => (
  <div style={{"width": "100%"}}>
    <h2>vs. Index Funds</h2>
    <div className="header">
      <h4 className="right-header-col-1">vs. S&amp;P 500</h4>
      <h4 className="right-header-col-2">vs. NASDAQ</h4>
      <h4 className="right-header-col-3">vs. DOW</h4>
    </div>
    <div className="comparison-list">
      <Comparison purchases={props.purchases} marketData={props.marketData}/>
    </div>
  </div>
)

export default ComparisonList;

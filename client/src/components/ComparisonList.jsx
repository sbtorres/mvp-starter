import React from 'react';
import Comparison from './Comparison.jsx'

class ComparisonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{"width": "100%"}}>
        <h2>Comparisons</h2>
        <Comparison purchases={this.props.purchases} marketData={this.props.marketData}/>
      </div>
    )
  }
}

export default ComparisonList;

import React from 'react';
import Comparison from './Comparison.jsx'

class ComparisonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Comparisons</h2>
        <Comparison />
      </div>
    )
  }
}

export default ComparisonList;

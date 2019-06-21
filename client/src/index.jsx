import React from 'react';
import ReactDOM from 'react-dom';
import UserStocksList from './components/UserStocksList.jsx';
import ComparisonList from './components/ComparisonList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      purchases: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/purchases', (err, purchases) => {
      this.setState({purchases: purchases});
    });
  }

  render () {
    return (
      <div>
      <h1>Stock Tracker</h1>
        <div id="stock-comparison-module">
          <div id="left-module">
            <UserStocksList purchases={this.state.purchases}/>
          </div>
          <div id="right-module">
            <ComparisonList />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
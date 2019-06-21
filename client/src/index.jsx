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
      marketData: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/purchases')
      .then((purchases) => {
        this.setState({purchases: purchases});
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get('https://api.iextrading.com/1.0/tops?symbols=dia,voo,qqq') 
      .then((marketData) => {
        this.setState({marketData: marketData.data});
      })
      .catch((err) => {
        console.log(err);
      })
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
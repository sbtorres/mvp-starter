import React from 'react';
import ReactDOM from 'react-dom';
import UserStocksList from './components/UserStocksList.jsx';
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
      <h1>Your Stocks</h1>
      <UserStocksList purchases={this.state.purchases}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
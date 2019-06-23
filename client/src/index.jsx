import React from 'react';
import ReactDOM from 'react-dom';
import MarketOverview from './components/MarketOverview.jsx';
import UserStocksList from './components/UserStocksList.jsx';
import ComparisonList from './components/ComparisonList.jsx';
import StockInputForm from './components/StockInputForm.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      purchases: [],
      marketData: [],
      stockPurchaseModalIsVisible: false,
    }

    this.handleStockPurchaseClick = this.handleStockPurchaseClick.bind(this);
    this.hideStockPurchaseModal = this.hideStockPurchaseModal.bind(this);
    this.handleUserStockInput = this.handleUserStockInput.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/purchases/1')
      .then((purchases) => {
        this.setState({purchases: purchases.data});
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get('https://api.iextrading.com/1.0/tops?symbols=voo,qqq,dia') 
      .then((marketData) => {
        // When not in trading hours, it appears TOPS does not return anything. This is a workaround.
        if (marketData.data.length < 1) {
          axios.get('https://api.iextrading.com/1.0/tops/last?symbols=voo,qqq,dia')
            .then((marketData) => {
              marketData.data.forEach((ticker) => {
                ticker.lastSalePrice = ticker.price;
              })
              this.setState({marketData: marketData.data});
            })
        } else {
          this.setState({marketData: marketData.data});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleStockPurchaseClick() {
    this.setState(prevState => {
      return {stockPurchaseModalIsVisible: !prevState.stockPurchaseModalIsVisible}
    });
  }

  hideStockPurchaseModal() {
    this.setState(prevState => {
      return {stockPurchaseModalIsVisible: !prevState.stockPurchaseModalIsVisible}
    });
  }

  handleUserStockInput(submittedPurchase) {
    let date = submittedPurchase.date_purchased;
    submittedPurchase.stock_ticker = submittedPurchase.stock_ticker.toUpperCase();
    axios.get(`http://localhost:3000/historicalData/VOO/${date}`)
      .then((historicalData) => {
        submittedPurchase.sp500_price = historicalData.data[0].close;
        axios.get(`http://localhost:3000/historicalData/QQQ/${date}`)
        .then((historicalData) => {
          submittedPurchase.nasdaq_price = historicalData.data[0].close;
          axios.get(`http://localhost:3000/historicalData/DIA/${date}`)
          .then((historicalData) => {
            submittedPurchase.dow_price = historicalData.data[0].close;
            axios.post(`http://localhost:3000/purchases/1`, submittedPurchase)
            .then(() => {
              this.componentDidMount();
            })
            .catch((err) => {
              console.log(err);
            })
          })
          .catch((err) => {
            console.log(err);
          })
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render () {
    const ComparisonData = (<ComparisonList purchases={this.state.purchases} marketData={this.state.marketData}/>)
    return (
      <div>
      <h1>MyIndex</h1>
        <div id="market-overview-panel">
          <MarketOverview marketData={this.state.marketData}/>
        </div>
        <div id="stock-comparison-module">
          <div id="left-module">
            <UserStocksList purchases={this.state.purchases}/>
          </div>
          <div id="right-module">
            {this.state.marketData.length > 1 ? ComparisonData : (<div></div>)}
          </div>
        </div>
        <div style={{"display": "flex", "width": "30%", "justifyContent": "center", "paddingTop": "10px"}}>
          <button onClick={this.handleStockPurchaseClick}>Add A Stock!</button>
        </div>
        <div>
          <StockInputForm
            handleUserStockInput={this.handleUserStockInput}
            hideStockPurchaseModal={this.hideStockPurchaseModal}
            isVisible={this.state.stockPurchaseModalIsVisible}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
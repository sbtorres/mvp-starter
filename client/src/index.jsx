import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import PortfolioOverview from './components/PortfolioOverview.jsx';
import MarketOverview from './components/MarketOverview.jsx';
import UserStocksList from './components/UserStocksList.jsx';
import StockInputForm from './components/StockInputForm.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      purchases: [],
      stockSummary: [],
      marketData: [],
      userPortfolio: {},
      stockPurchaseModalIsVisible: false,
    }

    this.handleStockPurchaseClick = this.handleStockPurchaseClick.bind(this);
    this.hideStockPurchaseModal = this.hideStockPurchaseModal.bind(this);
    this.handleUserStockInput = this.handleUserStockInput.bind(this);
    this.calculateTotalsAndSetState = this.calculateTotalsAndSetState.bind(this);
  }

  componentDidMount() {
    let updatedPurchases = [];
    axios.get('/purchases/1')
      .then((purchases) => {
        this.setState({stockSummary: purchases.data.stockSummary});
        
        axios.get('https://api.iextrading.com/1.0/tops?symbols=voo,qqq,dia') 
        .then((marketData) => {
          // When not in trading hours, it appears TOPS does not return anything. This is a workaround.
          if (marketData.data.length < 1) {
            axios.get('https://api.iextrading.com/1.0/tops/last?symbols=voo,qqq,dia')
              .then((marketData) => {
                marketData.data.forEach((ticker) => {
                  ticker.lastSalePrice = ticker.price;
                })
                this.calculateTotalsAndSetState(purchases.data.stockSummary, marketData.data);
              })
          } else {
            this.calculateTotalsAndSetState(purchases.data.stockSummary, marketData.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  calculateTotalsAndSetState(purchases, marketData) {
    let userPortfolio = {
      userBaseline: 0,
      userCurrentTotal: 0,
      sp500CurrentTotal: 0,
      nasdaqCurrentTotal: 0,
      dowCurrentTotal: 0
    }

    console.log(purchases);
    
    for (let key in purchases) {
      for (let i = 0; i < purchases[key].individual_purchases.length; i++) {
        userPortfolio.userBaseline += purchases[key].individual_purchases[i].share_price * purchases[key].individual_purchases[i].num_of_shares;
        userPortfolio.userCurrentTotal += purchases[key].current_share_price * purchases[key].individual_purchases[i].num_of_shares;
        userPortfolio.sp500CurrentTotal += ((purchases[key].individual_purchases[i].share_price * purchases[key].individual_purchases[i].num_of_shares) / purchases[key].individual_purchases[i].sp500_price) * marketData[0].lastSalePrice;
        userPortfolio.nasdaqCurrentTotal += ((purchases[key].individual_purchases[i].share_price * purchases[key].individual_purchases[i].num_of_shares) / purchases[key].individual_purchases[i].nasdaq_price) * marketData[1].lastSalePrice;
        userPortfolio.dowCurrentTotal += ((purchases[key].individual_purchases[i].share_price * purchases[key].individual_purchases[i].num_of_shares) / purchases[key].individual_purchases[i].dow_price) * marketData[2].lastSalePrice;
      }
    }; 

    this.setState({
      marketData: marketData,
      userPortfolio: userPortfolio,
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
    axios.get(`/historicalData/VOO/${date}`)
      .then((historicalData) => {
        submittedPurchase.sp500_price = historicalData.data[0].close;
        axios.get(`/historicalData/QQQ/${date}`)
        .then((historicalData) => {
          submittedPurchase.nasdaq_price = historicalData.data[0].close;
          axios.get(`/historicalData/DIA/${date}`)
          .then((historicalData) => {
            submittedPurchase.dow_price = historicalData.data[0].close;
            axios.post(`/purchases/1`, submittedPurchase)
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
    const UserStocks = (<UserStocksList marketData={this.state.marketData} stockSummary={this.state.stockSummary} />)
    const Portfolio= (<PortfolioOverview userPortfolio={this.state.userPortfolio} />)
    return (
      <div>
        <div class="header">
          <img src="icon.png" alt="app-logo" height="36" width="36"></img>
          <h1>MyIndex</h1>
          <div class="sign-in-button">
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </div>
        </div>
        <div id="portfolio-overview">
          {Object.keys(this.state.stockSummary).length > 1 && this.state.marketData.length > 1 ? Portfolio : (<div></div>)}
        </div>
        <div id="market-overview-panel">
          <MarketOverview marketData={this.state.marketData}/>
        </div>
        <div id="stock-comparison-module">
          <div id="left-module">
            {Object.keys(this.state.stockSummary).length > 1 && this.state.marketData.length > 1 ? UserStocks : (<div></div>)}
          </div>
        </div>
        <div style={{"display": "flex", "width": "40%", "justifyContent": "center", "paddingTop": "20px"}}>
          <button className="add-stock-button" onClick={this.handleStockPurchaseClick}>Add A Stock!</button>
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
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import PortfolioOverview from './components/PortfolioOverview.jsx';
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
    axios.get('http://localhost:3000/purchases/1')
      .then((purchases) => {
        const requests = purchases.data.individualPurchases.map(async (purchase) => {
          const getCurrentData = await axios.get(`https://api.iextrading.com/1.0/tops/last?symbols=${purchase.stock_ticker}`)
            .then((currentData) => {
              purchase.current_share_price = currentData.data[0].price;
              updatedPurchases.push(purchase);
            })
            .catch((err) => {
              console.log(err);
            })
        })
        
        Promise.all(requests).then(() => {
          axios.get('https://api.iextrading.com/1.0/tops?symbols=voo,qqq,dia') 
          .then((marketData) => {
            // When not in trading hours, it appears TOPS does not return anything. This is a workaround.
            if (marketData.data.length < 1) {
              axios.get('https://api.iextrading.com/1.0/tops/last?symbols=voo,qqq,dia')
                .then((marketData) => {
                  marketData.data.forEach((ticker) => {
                    ticker.lastSalePrice = ticker.price;
                  })
                  this.calculateTotalsAndSetState(updatedPurchases, marketData.data);
                })
            } else {
              this.calculateTotalsAndSetState(updatedPurchases, marketData.data);
            }
          })
          .catch((err) => {
            console.log(err);
          })
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
    const mapPurchases = purchases.map((purchase) => {
      userPortfolio.userBaseline += purchase.share_price * purchase.num_of_shares;
      userPortfolio.userCurrentTotal += purchase.current_share_price * purchase.num_of_shares;
      userPortfolio.sp500CurrentTotal += ((purchase.share_price * purchase.num_of_shares) / purchase.sp500_price) * marketData[0].lastSalePrice;
      userPortfolio.nasdaqCurrentTotal += ((purchase.share_price * purchase.num_of_shares) / purchase.nasdaq_price) * marketData[1].lastSalePrice;
      userPortfolio.dowCurrentTotal += ((purchase.share_price * purchase.num_of_shares) / purchase.dow_price) * marketData[2].lastSalePrice;
    });
    
    Promise.all(mapPurchases).then(() => {
      this.setState({
        purchases: purchases,
        marketData: marketData,
        userPortfolio: userPortfolio,
      })
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
    const UserStocks = (<UserStocksList purchases={this.state.purchases}/>)
    const Portfolio= (<PortfolioOverview userPortfolio={this.state.userPortfolio} />)
    return (
      <div>
        <div id="portfolio-overview">
          {this.state.purchases.length > 1 && this.state.marketData.length > 1 ? Portfolio : (<div></div>)}
        </div>
        <div id="market-overview-panel">
          <MarketOverview marketData={this.state.marketData}/>
        </div>
        <div id="stock-comparison-module">
          <div id="left-module">
            {this.state.purchases.length > 1 && this.state.marketData.length > 1 ? UserStocks : (<div></div>)}
          </div>
          <div id="right-module">
            {this.state.purchases.length > 1 && this.state.marketData.length > 1 ? ComparisonData : (<div></div>)}
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
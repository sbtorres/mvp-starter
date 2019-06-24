import React from 'react';

const PortfolioOverview = (props) => {
  return (
    <div className="top-headers">
      <div className="index-fund-column">Current Net Worth: <br></br>{'$' + props.userPortfolio.userCurrentTotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      <div className="index-fund-column">Total Growth: <br></br>{(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.userBaseline) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
      <div className="index-fund-column">vs. S&amp;P 500: <br></br>{(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.sp500CurrentTotal) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
      <div className="index-fund-column">vs. Nasdaq: <br></br>{(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.nasdaqCurrentTotal) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
      <div className="index-fund-column">vs. Dow Jones: <br></br>{(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.dowCurrentTotal) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
    </div>
  )
}

export default PortfolioOverview;
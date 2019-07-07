import React from 'react';

const PortfolioOverview = (props) => {
  return (
    <div>
      <h2 style={{"display": "flex", "justifyContent": "center", "margin": "5px 5px"}}>Portfolio Overview</h2>
      <div className="top-headers">
        <div className="portfolio-column-1"><strong>Current Net Worth:&nbsp;</strong>{'$' + props.userPortfolio.userCurrentTotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div className="portfolio-column-2"><strong>Total Growth:&nbsp;</strong> {(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.userBaseline) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
        <div className="portfolio-column-3"><strong>vs. S&amp;P 500:&nbsp;</strong> {(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.sp500CurrentTotal) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
        <div className="portfolio-column-4"><strong>vs. Nasdaq:&nbsp;</strong> {(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.nasdaqCurrentTotal) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
        <div className="portfolio-column-5"><strong>vs. Dow Jones:&nbsp;</strong> {(100 * ((props.userPortfolio.userCurrentTotal - props.userPortfolio.dowCurrentTotal) / props.userPortfolio.userBaseline)).toFixed(2) + '%'}</div>
      </div>
    </div>
  )
}

export default PortfolioOverview;
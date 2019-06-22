import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: ${props => props.isVisible ? "block" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

class StockInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <StyledContainer isVisible={this.props.isVisible}>
        <form>
          <label>Stock Ticker</label>
          <input type="text" />
          <label>Number of Shares</label>
          <input type="number" />
          <label>Price per Share</label>
          <input type="number" />
        </form>
      </StyledContainer>
    );
  }
}

export default StockInputForm;

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

const StyledStockModalContainer = styled.div`
  display: block;
  position:fixed;
  background: rgb(255, 255, 255);
  padding: 24px;
  font-family: Roboto, Helvetica, sans-serif;
  color: #484848;
  font-size: 14px;
  width: 23%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const StyledForm = styled.form`
  display: flex;
  background-color: #fff;
  justify-content: left;
  padding: 5px;
`;

const StyledLabel = styled.label`
  display: flex;
  width: 50%;
`;

class StockInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <StyledContainer isVisible={this.props.isVisible}>
        <StyledStockModalContainer>
          <h4>What'd you buy?</h4>
          <StyledForm>
            <StyledLabel>Stock Ticker</StyledLabel>
            <input type="text" />
          </StyledForm>
          <StyledForm>
            <StyledLabel>Number of Shares</StyledLabel>
            <input type="number" />
          </StyledForm>
          <StyledForm>
            <StyledLabel>Price per Share</StyledLabel>
            <input type="number" />
          </StyledForm>
        </StyledStockModalContainer>
      </StyledContainer>
    );
  }
}

export default StockInputForm;

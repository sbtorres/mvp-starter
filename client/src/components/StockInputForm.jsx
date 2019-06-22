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
  width: 30%;
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
  justify-content: flex-end;
  width: 50%;
  padding-right: 15px;
`;

const StyledCloseButton = styled.button`
  display: block;
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background-color: transparent;
  font-size: 36px;
  border-width: 0px;
  color: #fff;
`;

const StyledPurchaseButton = styled.button`
  display: flex;
  justify-content: center;
  width: 50%;
  background-color: #42ffaa;
  font-size: 16px;
  padding: 10px;
`;

class StockInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.state = {
      stock_ticker: '',
      num_of_shares: '',
      share_price: '',
      date_purchased: '',
    };
    
    this.handleClickOutsideModal = this.handleClickOutsideModal.bind(this);
    this.onUserTextInput = this.onUserTextInput.bind(this);
    this.handlePurchaseSubmission = this.handlePurchaseSubmission.bind(this);
  }

  handleClickOutsideModal(event) {
    const isOutside = !this.ref.current.contains(event.target);
    const { hideStockPurchaseModal } = this.props;

    if (isOutside) {
      hideStockPurchaseModal();
    }
  }

  onUserTextInput(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }

  handlePurchaseSubmission() {
    const { handleUserStockInput } = this.props;
    const currentState = this.state;
    handleUserStockInput(currentState);
    this.setState({
      stock_ticker: '',
      num_of_shares: '',
      share_price: '',
      date_purchased: '',
    });
  }

  render() {
    return(
      <StyledContainer onClick={this.handleClickOutsideModal} isVisible={this.props.isVisible}>
        <StyledCloseButton>X</StyledCloseButton>
        <StyledStockModalContainer ref={this.ref}>
          <h3>What'd you buy?</h3>
          <StyledForm className="stock-purchase-form">
            <StyledLabel>Stock Ticker</StyledLabel>
            <input 
              name="stock_ticker" 
              value={this.state.stock_ticker} 
              type="text" 
              onChange={this.onUserTextInput}
            />
          </StyledForm>
          <StyledForm className="stock-purchase-form">
            <StyledLabel>Number of Shares</StyledLabel>
            <input 
              name="num_of_shares" 
              value={this.state.num_of_shares} 
              type="text" 
              onChange={this.onUserTextInput}
            />
          </StyledForm>
          <StyledForm className="stock-purchase-form">
            <StyledLabel>Price per Share</StyledLabel>
            <input 
              name="share_price" 
              value={this.state.share_price} 
              type="text" 
              onChange={this.onUserTextInput}
            />
          </StyledForm>
          <StyledForm className="stock-purchase-form">
            <StyledLabel>Date Purchased (YYYY-MM-DD)</StyledLabel>
            <input 
              name="date_purchased" 
              value={this.state.date_purchased} 
              type="text" 
              onChange={this.onUserTextInput}
            />
          </StyledForm>
          <div style={{"display": "flex", "justifyContent": "center", "paddingTop": "10px"}}>
            <StyledPurchaseButton onClick={this.handlePurchaseSubmission}>Add Purchase!</StyledPurchaseButton>
          </div>
        </StyledStockModalContainer>
      </StyledContainer>
    );
  }
}

export default StockInputForm;

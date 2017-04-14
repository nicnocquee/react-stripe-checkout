import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: false,
      stripeToken: null
    }

    // configure Stripe Checkout
    this.stripeHandler = window.StripeCheckout.configure({
      key: "<YOUR_STRIPE_PUBLISHABLE_KEY>",
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: this.onGetStripeToken.bind(this)
    });
  }

  onGetStripeToken (token) {
    // Got Stripe token. This means user's card is valid!
    // We need to continue the payment process by sending this token to our own server.
    // More info: https://stripe.com/docs/charges
    this.setState({stripeToken: token})
  }

  onClickPay (e) {
    e.preventDefault()
    this.setState({isLoading: true});

    const onCheckoutOpened = () => {
      this.setState({isLoading: false})
    }

    // open Stripe Checkout
    this.stripeHandler.open({
      name: 'My Delightful Shop',
      description: 'An awesome product',
      amount: 1000, // 10 USD -> 1000 cents
      currency: 'usd',
      opened: onCheckoutOpened.bind(this)
    });
  }
  render() {
    var buttonText = this.state.isLoading ? "Please wait ..." : "Pay $10"
    var buttonClassName = "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "")
    if (this.state.stripeToken) {
      buttonText = "Processing your payment ..."
      buttonClassName = "Pay-Now Pay-Now-Disabled"
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React and Stripe Integration</h2>
        </div>
        <p className="App-intro">
          {"Tap the button below to open Stripe's Checkout overlay. Replace <YOUR_STRIPE_PUBLISHABLE_KEY> in App.js with your own key."}
        </p>
        {this.state.stripeToken ? <p className="App-intro">{"Got Stripe token ID: " + this.state.stripeToken.id + ". Continue payment process in the server."}</p> : null}
        <a className={buttonClassName} href="#" onClick={this.onClickPay.bind(this)}>{buttonText}</a>
      </div>
    );
  }
}

export default App;

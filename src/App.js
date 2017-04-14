import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: false
    }

    this.stripeHandler = window.StripeCheckout.configure({
      key: "<YOUR_STRIPE_PUBLISHABLE_KEY>",
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use to complete payment
      }
    });
  }
  onClickPay (e) {
    e.preventDefault()
    this.setState({isLoading: true});

    const onCheckoutOpened = () => {
      this.setState({isLoading: false})
    }

    this.stripeHandler.open({
      name: 'My Delightful Shop',
      description: 'An awesome product',
      amount: 1000, // 10 USD -> 1000 cents
      currency: 'usd',
      opened: onCheckoutOpened.bind(this)
    });
  }
  render() {
    const buttonText = this.state.isLoading ? "Please wait ..." : "Pay $10"
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React and Stripe Integration</h2>
        </div>
        <p className="App-intro">
          {"Tap the button below to open Stripe's Checkout overlay. Replace <YOUR_STRIPE_PUBLISHABLE_KEY> in App.js with your own key."}
        </p>
        <a className={"Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "")} href="#" onClick={this.onClickPay.bind(this)}>{buttonText}</a>
      </div>
    );
  }
}

export default App;

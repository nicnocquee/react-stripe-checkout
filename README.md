Integrating [Stripe's Checkout](https://stripe.com/docs/checkout/tutorial) with **custom pay button** to your react app is actually pretty simple. You don't need to install third party [package](https://github.com/azmenak/react-stripe-checkout). This project (bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)) shows how to do it with a few lines of codes.

1. Add the following to [public/index.html](https://github.com/nicnocquee/react-stripe-checkout/blob/master/public/index.html#L30)

```html
 <script src="https://checkout.stripe.com/checkout.js"></script>
```

2. Configure the Stripe Checkout in any component you want. In this sample, it's in [App.js](https://github.com/nicnocquee/react-stripe-checkout/blob/master/src/App.js#L13).

```javascript
this.stripeHandler = window.StripeCheckout.configure({
  key: "<YOUR_STRIPE_PUBLISHABLE_KEY>",
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // User's card is validated and now you can charge them!
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use to complete payment.
  }
});
```

3. Open the Checkout modal when [the pay button is clicked](https://github.com/nicnocquee/react-stripe-checkout/blob/master/src/App.js#L31).

```javascript
this.stripeHandler.open({
  name: 'My Delightful Shop',
  description: 'An awesome product',
  amount: 1000, // 10 USD -> 1000 cents
  currency: 'usd',
  opened: onCheckoutOpened.bind(this)
});
```

4. ...
5. **PROFIT!**

# Getting Started

- Clone this repo.
- `yarn install` or `npm install`
- Open `src/App.js` and replace `<YOUR_STRIPE_PUBLISHABLE_KEY>` with your [Stripe's publishable key](https://dashboard.stripe.com/account/apikeys).
- `yarn run`

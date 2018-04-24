const Alexa = require('alexa-sdk');
const { BlinkTradeRest } = require('blinktrade');

const myBitcoinBalance = blinktrade =>
  blinktrade
    .balance()
    .then(data => {
      const satoshiValue = data['4'].BTC;
      const bitcoin = satoshiValue * 0.00000001;

      return blinktrade
        .ticker()
        .then(ticker => {
          const balance = bitcoin * ticker.sell;
          return `Your balance is ${balance.toFixed(2)} ${
            process.env.CURRENCY
          }`;
        })
        .catch(err => {
          console.error('Fail to get ticker', err);
        });
    })
    .catch(err => {
      console.error('Fail to get balance', err);
    });

const alexaHandlers = {
  LaunchRequest() {
    const blinktrade = new BlinkTradeRest({
      prod: true,
      key: process.env.BLINK_TRADE_KEY,
      secret: process.env.BLINK_TRADE_SECRET,
      currency: process.env.CURRENCY_CODE,
    });

    const self = this;

    myBitcoinBalance(blinktrade)
      .then(balance => {
        const cardTitle = 'My Bitcoin Balance';
        const cardContent = balance;

        self.response.speak(balance).cardRenderer(cardTitle, cardContent);
        self.emit(':responseReady');
      })
      .catch(err => {
        console.error('Fail to handle with response', err);
      });
  },
};

const handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(alexaHandlers);
  alexa.execute();
};

module.exports = {
  handler,
  myBitcoinBalance,
};

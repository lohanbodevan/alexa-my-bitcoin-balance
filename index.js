const Alexa = require('alexa-sdk');
const { BlinkTradeRest } = require('blinktrade');

const myBitcoinBalance = blinktrade =>
  blinktrade.balance().then(data => {
    const satoshiValue = data['4'].BTC;
    const bitcoin = satoshiValue * 0.00000001;

    return blinktrade.ticker().then(ticker => {
      const balance = bitcoin * ticker.sell;
      return `Your balance is ${balance.toFixed(2)} ${process.env.CURRENCY}`;
    });
  });

const alexaHandlers = {
  LaunchRequest: () => {
    const blinktrade = new BlinkTradeRest({
      prod: true,
      key: process.env.BLINK_TRADE_KEY,
      secret: process.env.BLINK_TRADE_SECRET,
      currency: process.env.CURRENCY_CODE,
    });

    myBitcoinBalance(blinktrade).then(balance => {
      const cardTitle = 'My Bitcoin Balance';
      const cardContent = balance;

      this.response.speak(balance).cardRenderer(cardTitle, cardContent);
      this.emit(':responseReady');
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

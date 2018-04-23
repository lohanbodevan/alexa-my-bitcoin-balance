const { myBitcoinBalance } = require('../index');

describe('BlinkTrade balance suite test', () => {
  it('should myBitcoinBalance return 136.99 reais of balance in brasilian reais', async () => {
    process.env.CURRENCY = 'in brasilian reais';
    const expected = `Your balance is 136.99 in brasilian reais`;

    const fakeBlinkTradeAPI = {
      balance: () => Promise.resolve({ '4': { BTC: 436.453 } }),
      ticker: () => Promise.resolve({ sell: 31387000 }),
    };

    const balance = await myBitcoinBalance(fakeBlinkTradeAPI);

    expect(balance).toEqual(expected);
  });
});

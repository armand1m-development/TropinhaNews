import axios from "axios";

type AvailableCurrency = "USD-BRL" | "EUR-BRL";

const currencyIntl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const getCurrencyUrl = (currency: AvailableCurrency) =>
  `https://economia.awesomeapi.com.br/last/${currency}`;
export const getValueName = (currency: AvailableCurrency) =>
  currency.replace("-", "");
export const getCurrencyUrlBitcoin =
  "https://www.mercadobitcoin.net/api/BTC/ticker/";

const getCurrencyValue = async (
  currency: AvailableCurrency,
  Format: boolean = true
): Promise<string | number> => {
  const url = getCurrencyUrl(currency);
  const valueName = getValueName(currency);
  const response = await axios.get(url);

  const currencyValue = Number(response.data[valueName].ask);

  if (Format) {
    return currencyIntl.format(Math.round(currencyValue * 100) / 100);
  }

  return currencyValue;
};

const getCurrencyValueBitcoin = async (): Promise<string> => {
  const urlBitcoin = getCurrencyUrlBitcoin;
  const responseBitcoin = await axios.get(urlBitcoin);

  const currencyValue = Number(responseBitcoin.data.ticker.sell);

  return currencyIntl.format(Math.round(currencyValue * 100) / 100);
};

export const currency = {
  getDolarValue: () => getCurrencyValue("USD-BRL"),
  getEuroValue: () => getCurrencyValue("EUR-BRL"),
  getBitcoinValue: () => getCurrencyValueBitcoin(),
  getCurrencyValue,
};

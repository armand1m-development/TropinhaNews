import { currencySimultaneous } from "./services/currencyService";

export const generateReport = async () => {
  const dollarValue = await currencySimultaneous.getDolarValue();
  const euroValue = await currencySimultaneous.getEuroValue();
  const bitcoinValue = await currencySimultaneous.getBitcoinValue();

  return `\uD83D\uDCB8\uD83D\uDCB8\uD83D\uDCB8   REPORT   \uD83D\uDCB8\uD83D\uDCB8\uD83D\uDCB8

Dolar:  ${dollarValue}
Euro:   ${euroValue}
Bitcon: ${bitcoinValue}
`;
};

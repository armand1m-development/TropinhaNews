import { currency } from "./services/currencyService";

export const generateReport = async () => {
  const dollarValue = await currency.getDolarValue();
  const euroValue = await currency.getEuroValue();
  const bitcoinValue = await currency.getBitcoinValue();

  return `\uD83D\uDCB8\uD83D\uDCB8\uD83D\uDCB8   REPORT   \uD83D\uDCB8\uD83D\uDCB8\uD83D\uDCB8

Dolar:  ${dollarValue}
Euro:   ${euroValue}
Bitcon: ${bitcoinValue}
`;
};

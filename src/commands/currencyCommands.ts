import { CommandProps } from "./types";
import { currencySimultaneous } from "../services/currencyService";
// import currency from "currency.js";

export const currencyCommands = {
  dolar: async ({ bot, chatId }: CommandProps) => {
    const dollarValue = await currencySimultaneous.getDolarValue();
    bot.sendMessage(chatId, `Preço Dolar atual: ${dollarValue}`);
  },

  euro: async ({ bot, chatId }: CommandProps) => {
    const euroValue = await currencySimultaneous.getEuroValue();
    bot.sendMessage(chatId, `Preço Euro atual: ${euroValue}`);
  },

  bitcoin: async ({ bot, chatId }: CommandProps) => {
    const bitcoinValue = await currencySimultaneous.getBitcoinValue();
    bot.sendMessage(chatId, `Preço Bitcoin atual: ${bitcoinValue}`);
  },

  convertdol: async ({ bot, chatId, command }: CommandProps) => {
    const dollarValue = Number(command.args);
    if (isNaN(dollarValue)) {
      bot.sendMessage(chatId, "Argumento invalido. Digite um numero valido.");
      return;
    }
    const currentValue = await currencySimultaneous.getCurrencyValue(
      "USD-BRL",
      false
    );
    console.log(currentValue);
    const totalDoll = Number(currentValue) * dollarValue;
    bot.sendMessage(
      chatId,
      `Seu valor convertido é: R$${totalDoll.toFixed(2)}`
    );
  },

  converteuro: async ({ bot, chatId, command }: CommandProps) => {
    const euroValue = Number(command.args);
    if (isNaN(euroValue)) {
      bot.sendMessage(chatId, "Argumento invalido. Digite um numero valido.");
      return;
    }
    const currentValue = await currencySimultaneous.getCurrencyValue(
      "EUR-BRL",
      false
    );
    const totalEuro = Number(currentValue) * euroValue;
    bot.sendMessage(
      chatId,
      `Seu valor convertido é: R$${totalEuro.toFixed(2)}`
    );
  },

  convertbitcoin: async ({ bot, chatId, command }: CommandProps) => {
    const bitcoinValue = Number(command.args);
    if (isNaN(bitcoinValue)) {
      bot.sendMessage(chatId, "Argumento invalido. Digite um numero valido.");
      return;
    }
    const currentValue = await currencySimultaneous.getBitcoinValue();
    const convertBitcoin = currentValue.replace(/[R$.]/g, "").replace(",", ".");
    const convertForNumber = parseFloat(convertBitcoin);
    const totalBitcoin = convertForNumber * bitcoinValue;
    bot.sendMessage(
      chatId,
      `Seu valor convertido é: R$${totalBitcoin.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    );
  },
};

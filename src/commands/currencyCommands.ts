import { CommandProps } from "./types";
import { currency } from "../services/currencyService";

export const currencyCommands = {
  dolar: async ({ bot, chatId }: CommandProps) => {
    const dollarValue = await currency.getDolarValue();
    bot.sendMessage(chatId, `Preço Dolar atual: ${dollarValue}`);
  },

  euro: async ({ bot, chatId }: CommandProps) => {
    const euroValue = await currency.getEuroValue();
    bot.sendMessage(chatId, `Preço Euro atual: ${euroValue}`);
  },

  bitcoin: async ({ bot, chatId }: CommandProps) => {
    const bitcoinValue = await currency.getBitcoinValue();
    bot.sendMessage(chatId, `Preço Bitcoin atual: ${bitcoinValue}`);
  },

  convertdoll: async ({ bot, chatId, command }: CommandProps) => {
    const dollarValue = Number(command.args);
    if (isNaN(dollarValue)) {
      bot.sendMessage(chatId, "Argumento invalido. Digite um numero valido.");
      return;
    }
    const currentValue = await currency.getCurrencyValue("USD-BRL", false);
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
    const currentValue = await currency.getCurrencyValue("EUR-BRL", false);
    const totalEuro = Number(currentValue) * euroValue;
    bot.sendMessage(
      chatId,
      `Seu valor convertido é: R$${totalEuro.toFixed(2)}`
    );
  },
};

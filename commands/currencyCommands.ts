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
};

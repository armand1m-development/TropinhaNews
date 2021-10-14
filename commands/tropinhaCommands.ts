import { getCurrentDumb, setCurrentDumb } from "../services/bigDumbService";
import { CommandProps } from "./types";

export const tropinhaCommands = {
  burrao: async ({ bot, chatId }: CommandProps) => {
    const responseDumb = await getCurrentDumb(chatId);
    bot.sendMessage(chatId, responseDumb);
  },
  setBurrao: async ({ bot, chatId, command }: CommandProps) => {
    const user = command.args || "";
    const responseDumb = await setCurrentDumb(user, chatId);
    bot.sendMessage(chatId, responseDumb);
  },

  // 'subscribe-news': async ({ bot, chatId}: CommandProps) => {
  //   if (subscribed.includes(chatId)) {
  //     bot.sendMessage(chatId, "Already subscribed");
  //     return;
  //   }
  //   subscribed.push(chatId);
  //   bot.sendMessage(chatId, "Subscribed (YATAAA)");
  // }
};

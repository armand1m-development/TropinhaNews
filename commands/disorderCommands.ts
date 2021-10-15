import { CommandProps } from "./types";
import { setDisorder, getDisorder } from "../services/disoderService";

export const disorderCommands = {
 
  treta: async ({ bot, chatId, command, username }: CommandProps) => {
    const disorderResponse = await setDisorder(chatId, username);
    bot.sendMessage(chatId, disorderResponse);
  },

  semtreta: async ({ bot, chatId, command, username }: CommandProps) => {
    const disorderResponse = await getDisorder(chatId);
    bot.sendMessage(chatId, disorderResponse);
  },
};

import { CommandProps } from "./types";
import { setDisorder, getDisorder } from "../services/disoderService";

export const disorderCommands = {
  treta: async ({ bot, chatId, msg }: CommandProps) => {
    const disorderResponse = msg.reply_to_message ? await setDisorder(chatId, msg): await getDisorder(chatId);
    bot.sendMessage(chatId, disorderResponse);
  },
};

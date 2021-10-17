import { CommandProps } from "./types";
import { setCurrentDumb, getCurrentDumb } from "../services/bigDumbService";

export const bigDumbCommands = {
  burrao: async ({ bot, chatId, msg }: CommandProps) => {
    const dumbResponse = msg.reply_to_message ? await setCurrentDumb(chatId, bot, msg) : await getCurrentDumb(chatId);

    // if(dumbResponse[1]){
    //   bot.sendPhoto(chatId, dumbResponse[1]);
    // }

    bot.sendMessage(chatId, dumbResponse[0]);
  },
};

import { commands } from "./index";
import { CommandProps } from "./types";

export const showCommands = {
  commands: async ({ bot, chatId }: CommandProps) => {
    const allCommands = Object.keys(commands);
    const onlyCommand = allCommands.map((command) => {
      return `${command} \n`;
    });
    bot.sendMessage(chatId, `${onlyCommand}`);
  },
};

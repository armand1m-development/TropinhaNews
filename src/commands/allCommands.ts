import { commands } from "./index";
import { CommandProps } from "./types";

export const showCommands = {
    commands: async ({ bot, chatId }: CommandProps) => {
        const allCommands = Object.keys(commands);
        const onlyCommand = allCommands.map((command) => {            
            return `${command} \n`;
        })
        for (let index in onlyCommand) {
            console.log(onlyCommand[index]);  // output: Apple Orange Banana
        }
        bot.sendMessage(chatId, `${onlyCommand}`);
    },
}


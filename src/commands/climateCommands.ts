import { getClimateValue } from "../services/climateService";
import { CommandProps } from "./types";

export const climateCommands = {
  temp: async ({ bot, chatId, command }: CommandProps) => {
    const city = command.args;
    try {
      const temperature = await getClimateValue(city || "");
      bot.sendMessage(chatId, `Temperatura de ${city}: ${temperature}ºC`);
    } catch {
      bot.sendMessage(chatId, "City nao localizada");
    }
  },
};

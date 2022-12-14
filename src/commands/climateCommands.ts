import { getClimateValue, getForecast } from "../services/climateService";
import { CommandProps } from "./types";

export const climateCommands = {
  temp: async ({ bot, chatId, command }: CommandProps) => {
    const city = command.args;
    try {
      const { temperature, cityName } = await getClimateValue(city || '');
      bot.sendMessage(chatId, `Temperatura de ${cityName}: ${temperature}ºC`);
    } catch {
      bot.sendMessage(chatId, 'City nao localizada');
    }
  },
  previsao: async ({ bot, chatId, command }: CommandProps) => {
    const city = command.args;

    try {
      const forecast = await getForecast(city || "");
      const userMesage = [
        `\u{26A0} PREVISAO PARA ${city?.toUpperCase()} \u{26A0} \n`,
        ...forecast,
      ].join("\n");
      bot.sendMessage(chatId, userMesage);
    } catch {
      bot.sendMessage(
        chatId,
        "Reveja seus pensamentos e tente denovo so que certo"
      );
    }
  },
};


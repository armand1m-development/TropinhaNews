import { getClimateValue } from "../services/climateService";
import { CommandProps } from "./types";

export const climateCommands = {
  temp: async ({ bot, chatId, command }: CommandProps) => {
    const city = command.args;
    console.log(city);
    // try {
    //   const temperature = await getClimateValue(city || "");
    //   console.log(temperature);
    //   bot.sendMessage(chatId, `Temperatura da cidade: ${temperature}ºC`);
    // } catch {
    //   bot.sendMessage(chatId, "City nao localizada, cuidado burrao");
    // } ARRUMAR ESSA MERDA AQUI PQ NAO TA FUNCIONANDO CARALHO DEMONIO
  },
};

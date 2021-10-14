import { climateCommands } from "./climateCommands";
import { currencyCommands } from "./currencyCommands";
import { tropinhaCommands } from "./tropinhaCommands";

export const commands = {
  ...currencyCommands,
  ...climateCommands,
  ...tropinhaCommands,
};

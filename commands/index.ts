import { climateCommands } from "./climateCommands";
import { currencyCommands } from "./currencyCommands";
import { tropinhaCommands } from "./tropinhaCommands";
import { disorderCommands } from "./disorderCommands";

export const commands = {
  ...currencyCommands,
  ...climateCommands,
  ...tropinhaCommands,
  ...disorderCommands
};

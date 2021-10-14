import { climateCommands } from "./climateCommands";
import { currencyCommands } from "./currencyCommands";

export const commands = {
  ...currencyCommands,
  ...climateCommands,
};

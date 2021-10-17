import { climateCommands } from "./climateCommands";
import { currencyCommands } from "./currencyCommands";
import { disorderCommands } from "./disorderCommands";
import { bigDumbCommands } from "./bigDumbCommands";

export const commands = {
  ...bigDumbCommands,
  ...currencyCommands,
  ...climateCommands,
  ...disorderCommands
};

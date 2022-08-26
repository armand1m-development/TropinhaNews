import TelegramBot from "node-telegram-bot-api";

export type CommandProps = {
  bot: TelegramBot;
  chatId: number;
  command: Command;
  msg: TelegramBot.Message;
};

export type Command = {
  full: string;
  name: string;
  args: string | undefined;
};

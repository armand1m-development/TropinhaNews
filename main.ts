require("dotenv").config();
import TelegramBot from "node-telegram-bot-api";
import express from "express";
import cron from "node-cron";

import { commands } from "./commands";
import { Command } from "./commands/types";

type CommandNames = keyof typeof commands;

const app = express();

const { TELEGRAM_TOKEN, PORT } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN || "", { polling: true });

const subscribed: Array<number> = [];
const commandParserRegex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

bot.on("message", async (msg: any) => {
  const chatId = msg.chat.id;
  const messageText: string = msg.text;
  const parsedCommand = commandParserRegex.exec(messageText) || undefined;

  const command: Command | undefined = parsedCommand && {
    full: messageText,
    name: parsedCommand[1],
    args: parsedCommand[3] && parsedCommand[3].trim(),
  };

  if (messageText === "significa?") {
    bot.sendPhoto(chatId, "images/significa.jpg");
  }

  Object.keys(commands).map(async (commandName) => {
    if (!!command && commandName === command.name) {
      const commandPayload = { bot, chatId, command, msg };

      try {
        await commands[commandName as CommandNames](commandPayload);
      } catch (error) {
        console.log(error);
        bot.sendMessage(chatId, "Comando falhou :X");
      }
    }
  });
});

app.get("/health-check", (_: any, res: any) => {
  res.send("is up!");
});

app.listen(PORT || 3000, () => {
  console.log(`###### Started at http://localhost:${PORT} ######`);
});

cron.schedule("0 0 8,12,16 * * *", () => {
  subscribed.map((chatId) => {
    bot.sendMessage(chatId, "Report!!");
  });
  console.log("Sended report");
});

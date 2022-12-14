import TelegramBot from "node-telegram-bot-api";
require("dotenv").config();
import express from "express";
import cron from "node-cron";
import { commands } from "./commands";
import { Command } from "./commands/types";
import path from "path";
import { createReadStream } from "fs";
import { bigdumbRoute } from "./routes/bigDumbRoute"
import { disordersRoute } from "./routes/disorders"

type CommandNames = keyof typeof commands;

const app = express();

const { TELEGRAM_TOKEN, PORT } = process.env;

if (!TELEGRAM_TOKEN) {
  throw new Error(
    "Please provide a telegram token bot in the TELEGRAM_TOKEN env var"
  );
}

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const subscribed: Array<number> = [];
const commandParserRegex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text ?? "";
  const parsedCommand = commandParserRegex.exec(messageText) || undefined;
  const command: Command | undefined = parsedCommand && {
    full: messageText,
    name: parsedCommand[1],
    args: parsedCommand[3] && parsedCommand[3].trim(),
  };

  const pathSignificaImagem = path.resolve(
    process.cwd(),
    "./images/significa.png"
  );

  const imageReadStream = createReadStream(pathSignificaImagem);

  if (messageText === "significa?") {
    bot.sendPhoto(chatId, imageReadStream);
  }

  Object.keys(commands).map(async (commandName) => {
    if (!!command && commandName === command.name) {
      const commandPayload = { bot, chatId, command, msg };
      try {
        await commands[commandName as CommandNames](commandPayload);
      } catch (error) {
        console.log(error);
        bot.sendMessage(chatId, "Comando falhou :X _(cala a boca rafael)_");
      }
    }
  });
});

app.get("/healthcheck", (_: any, res: any) => {
  res.send("is up!");
});

app.listen(PORT ?? 5000, () => {
  console.log(`Bot running at http://0.0.0.0:${PORT}`);
});

app.get("/bigdumbs", bigdumbRoute);

app.get("/disorders", disordersRoute);

cron.schedule("0 0 8,12,16 * * *", () => {
  subscribed.map((chatId) => {
    bot.sendMessage(chatId, "Report!!");
  });
  console.log("Report was sent.");
});

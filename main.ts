import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";

import { currency } from "./services/currencyService";
import { generateReport } from "./reportMaker";
import { getClimateValue } from "./services/climateService";
import { getCurrentDumb, setCurrentDumb } from "./services/bigDumbService";
import { commands } from "./commands";
import { Command } from "./commands/types";

type CommandNames = keyof typeof commands;

dotenv.config();
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

  Object.keys(commands).map(async (commandName) => {
    if (!!command && commandName === command.name) {
      const commandPayload = { bot, chatId, command };

      try {
        await commands[commandName as CommandNames](commandPayload);
      } catch (error) {
        console.log(error);
        bot.sendMessage(chatId, "Comando falhou :X");
      }
    }
  });
  //   if (msg.text === "/get-report") {
  //     bot.sendMessage(chatId, await generateReport());
  //   }

  //   if (command.command === "temp") {
  //     const city = command.args;
  //     try {
  //       const temperature = await getClimateValue(city);
  //       bot.sendMessage(chatId, `Temperatura da cidade: ${temperature}ºC`);
  //     } catch {
  //       bot.sendMessage(chatId, "City nao localizada, cuidado burrao");
  //     }
  //   }

  //   if (command.command === "convertdoll") {
  //     const dollarValue = Number(command.args);
  //     if (isNaN(dollarValue)) {
  //       bot.sendMessage(chatId, "Numero nao invalido");
  //       return;
  //     }
  //     const currentValue = await currency.getCurrencyValue("USD-BRL", false);
  //     const totalDoll = Number(currentValue) * dollarValue;
  //     bot.sendMessage(
  //       chatId,
  //       `Seu valor convertido é: R$${totalDoll.toFixed(2)}`
  //     );
  //   }

  //   if (command.command === "converteuro") {
  //     const euroValue = Number(command.args);
  //     if (isNaN(euroValue)) {
  //       bot.sendMessage(chatId, "Numero nao invalido");
  //       return;
  //     }
  //     const currentValue = await currency.getCurrencyValue("EUR-BRL", false);
  //     const totalEuro = Number(currentValue) * euroValue;
  //     bot.sendMessage(
  //       chatId,
  //       `Seu valor convertido é: R$${totalEuro.toFixed(2)}`
  //     );
  //   }

  //   if (msg.text === "/burrao") {
  //     const responseDumb = await getCurrentDumb(chatId);
  //     bot.sendMessage(chatId, responseDumb);
  //   }

  //   if (command.command === "setBurrao") {
  //     const user = command.args;
  //     const responseDumb = await setCurrentDumb(user, chatId);
  //     bot.sendMessage(chatId, responseDumb);
  //   }

  //   if (msg.text === "/subscribe-news") {
  //     if (subscribed.includes(chatId)) {
  //       bot.sendMessage(chatId, "Already subscribed");
  //       return;
  //     }
  //     subscribed.push(chatId);
  //     bot.sendMessage(chatId, "Subscribed (YATAAA)");
  //   }
});

app.get("/health-check", (_: any, res: any) => {
  res.send("is up!");
});

app.listen(PORT || 5000, () => {
  console.log(`started at http://localhost:${PORT}`);
});

cron.schedule("0 0 8,12,16 * * *", () => {
  subscribed.map((chatId) => {
    bot.sendMessage(chatId, "Report!!");
  });
  console.log("Sended report");
});

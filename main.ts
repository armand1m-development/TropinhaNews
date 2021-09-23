import { getDollarValue } from "./dolarService"
const TelegramBot = require('node-telegram-bot-api');

const token = '2043076845:AAEkmk2HHBqB48vbsf6j7K_U4rrU125PL5U';
const bot = new TelegramBot(token, {polling: true});
const currencyFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })



bot.on('message', async(msg: any) => {
    const chatId = msg.chat.id;
    const dollarValueFormated = currencyFormat.format(await getDollarValue())
  
    if (msg.text === '/dolar') {
        bot.sendMessage(chatId, `Preço dolar atual: ${dollarValueFormated}`)
    }
});
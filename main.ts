import TelegramBot from 'node-telegram-bot-api';
import { currency } from './currencyService';

const token = '2043076845:AAEkmk2HHBqB48vbsf6j7K_U4rrU125PL5U';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async(msg: any) => {
    const chatId = msg.chat.id;

    if (msg.text === '/dolar') {
        const dollarValue = await currency.getDolarValue()
        bot.sendMessage(chatId, `Preço dolar atual: ${dollarValue}`)
    }

    if(msg.text === '/euro'){
        const euroValue = await currency.getEuroValue()
        bot.sendMessage(chatId, `Preço euro atual: ${euroValue}`)
    }
});
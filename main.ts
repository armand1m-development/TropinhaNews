import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv'
import express from 'express'

import { currency } from './currencyService';

dotenv.config()
const app = express()

const { TELEGRAM_TOKEN, PORT } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

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

app.get('/health-check', (req, res) => {
    res.send('is up!')
  })

  app.listen(PORT || 5000, () => {
    console.log(`started at http://localhost:${PORT}`)
  })
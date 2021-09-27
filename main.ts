import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv'
import express from 'express'
import cron from 'node-cron'
import { currency } from './currencyService';
import { generateReport } from './reportMaker';
import {city, getClimateValue } from './climateService'


dotenv.config()
const app = express()

const { TELEGRAM_TOKEN, PORT } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN || '', {polling: true});

const subscribed:Array<number> = []

bot.on('message', async(msg: any) => {
    const chatId = msg.chat.id;

    if (msg.text === '/dolar') {
        const dollarValue = await currency.getDolarValue()
        bot.sendMessage(chatId, `Preço Dolar atual: ${dollarValue}`)
    }

    if(msg.text === '/euro') {
        const euroValue = await currency.getEuroValue()
        bot.sendMessage(chatId, `Preço Euro atual: ${euroValue}`)
    }

    if(msg.text === '/bitcoin'){
        const bitcoinValue = await currency.getBitcoinValue()
        bot.sendMessage(chatId,`Preço Bitcoin atual: ${bitcoinValue}`)
    }

    if(msg.text === '/get-report') {
        bot.sendMessage(chatId, await generateReport())
    }

    if (msg.text === '/TemperaturaVix'){
        const temperature = await getClimateValue('Vitoria')
        bot.sendMessage(chatId,`Temperatura de Vitoria: ${temperature}`)
    }

    if(msg.text === '/subscribe-news') {
        if (subscribed.includes(chatId)) {
            bot.sendMessage(chatId, 'Already subscribed')
            return
        }
        subscribed.push(chatId)
        bot.sendMessage(chatId, 'Subscribed (YATAAA)')
    }
});

app.get('/health-check', (_: any, res: any) => {
    res.send('is up!')
})

app.listen(PORT || 5000, () => {
    console.log(`started at http://localhost:${PORT}`)
})

cron.schedule('0 0 8,12,16 * * *', () => {
    subscribed.map((chatId) => {
        bot.sendMessage(chatId, 'Report!!') 
    })
    console.log('Sended report');
});
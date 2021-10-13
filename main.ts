import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv'
import express from 'express'
import cron from 'node-cron'
import { currency } from './currencyService';
import { generateReport } from './reportMaker';
import { getClimateValue } from './climateService'
import { getCurrentDumb, setCurrentDumb } from './bigDumbService';


dotenv.config()
const app = express()

const { TELEGRAM_TOKEN, PORT } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN || '', {polling: true});

const subscribed:Array<number> = []
const commandPartsRegex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;

bot.on('message', async(msg: any) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const parts = commandPartsRegex.exec(messageText);

    
    const command = parts === null ? {} :  {
      text: messageText,
      command: parts[1],
      bot: parts[2],
      args: parts[3],
    };
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

    if (command.command === 'temp'){
        const city = command.args
       try {
          const temperature = await getClimateValue(city)
          bot.sendMessage(chatId,`Temperatura da cidade: ${temperature}ºC`)
       } catch {
          bot.sendMessage(chatId,'City nao localizada, cuidado burrao')
       }    
    } 

    if(command.command === 'convertdoll'){
        const dollarValue = Number(command.args); 
        if(isNaN(dollarValue)){
            bot.sendMessage(chatId,'Numero nao invalido')
            return
        }
        const currentValue = await currency.getCurrencyValue('USD-BRL', false)
        const totalDoll = Number(currentValue) * dollarValue
        bot.sendMessage(chatId,`Seu valor convertido é: R$${totalDoll.toFixed(2)}`)
    }

    if(command.command === 'converteuro'){
        const euroValue = Number(command.args);
        if(isNaN(euroValue)){
            bot.sendMessage(chatId,'Numero nao invalido')
            return
        } 
        const currentValue = await currency.getCurrencyValue('EUR-BRL', false)
        const totalEuro = Number(currentValue) * euroValue
        bot.sendMessage(chatId,`Seu valor convertido é: R$${totalEuro.toFixed(2)}`)
    }

    if (msg.text === '/burrao') {
        const responseDumb = await getCurrentDumb(chatId)
        bot.sendMessage(chatId, responseDumb)
    }

    if (command.command === 'setBurrao'){
        const user = command.args
        const responseDumb = await setCurrentDumb(chatId, user)
        bot.sendMessage(chatId, responseDumb)
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
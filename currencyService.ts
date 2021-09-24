import axios from 'axios'

type AvailableCurrency = 'USD-BRL' | 'EUR-BRL'

const currencyIntl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const getCurrencyUrl = (currency: AvailableCurrency) => `https://economia.awesomeapi.com.br/last/${currency}`
export const getCurrencyUrlBitcoin = 'https://www.mercadobitcoin.net/api/BTC/ticker/'
export const getValueName = (currency: AvailableCurrency) => currency.replace('-', '')


const getCurrencyValue = async (currency: AvailableCurrency): Promise<string> => {
    const url = getCurrencyUrl(currency)
    const valueName = getValueName(currency)
    const response = await axios.get(url)

    const currencyValue = Number(response.data[valueName].ask)

    return currencyIntl.format(Math.round(currencyValue * 100) / 100)
}

const getCurrencyValueBitcoin = async ():Promise<string> =>{
    const urlBitcoin = getCurrencyUrlBitcoin
    const responseBitcoin = await axios.get(urlBitcoin)

    const currencyValue = Number(responseBitcoin.data.ticker.sell) 
    
    return currencyIntl.format(Math.round(currencyValue * 100) / 100)
}

export const currency = {
    getDolarValue: () => getCurrencyValue('USD-BRL'),
    getEuroValue: () => getCurrencyValue('EUR-BRL'),
    getBitcoinValue: () => getCurrencyValueBitcoin() 
}
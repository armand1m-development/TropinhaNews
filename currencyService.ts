import axios from 'axios'

type AvailableCurrency = 'USD-BRL' | 'EUR-BRL'

const currencyIntl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const getCurrencyValue = async (currency: AvailableCurrency): Promise<string> => {
    const currencyUrl = `https://economia.awesomeapi.com.br/last/${currency}`
    const valueName = currency.replace('-', '')
    const response = await axios.get(currencyUrl)

    const currencyValue = Number(response.data[valueName].ask)

    return currencyIntl.format(Math.round(currencyValue * 100) / 100)
}

export const currency = {
    getDolarValue: () => getCurrencyValue('USD-BRL'),
    getEuroValue: () => getCurrencyValue('EUR-BRL')
}
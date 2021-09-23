import axios from 'axios'

const GET_DOLLAR_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL'

export const getDollarValue = async (): Promise<number> => {
    const response = await axios.get(GET_DOLLAR_URL)

    const dollarValue = Number(response.data.USDBRL.ask)

    return Math.round(dollarValue * 100) / 100
}
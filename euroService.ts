import axios from "axios";

const GET_EURO_URL = 'https://economia.awesomeapi.com.br/last/EUR-BRL';


export const getEuroValue = async (): Promise<number> =>{
    const response = await axios.get(GET_EURO_URL);

    const euroValue = Number(response.data.EURBRL.ask)

    return Math.round(euroValue * 100) / 100
}
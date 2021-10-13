import axios from 'axios'

const getApiUrl = () => process.env.API_URL;
const getTropinhaToken = () => process.env.TROPINHA_TOKEN;

type User = string
type ChatId = string

export const getCurrentDumb = async (chatId: ChatId) => {

    const url = `${getApiUrl()}/dumb`;

    try {
        const res = await axios.get(url, {
            headers: {
                'Tropinha-token': getTropinhaToken(),
                'Channel-id': chatId
            }
        });


        if(res.data.hasDumb){
            return `Burrão atual: ${res.data.dumb.user} \nFoi burrão: ${res.data.dumbTimes} vez(es)`
        }

        return `${res.data.message}`
        
    } catch {
      return "Deu ruim na Api.";
    }
}
 

export const setCurrentDumb = async (chatId: ChatId, user: User) => {
    const url = `${getApiUrl()}/dumb`;

    let message = '';

    const res = await axios.post(url, {user: user}, {
        headers: {
            'Tropinha-token': getTropinhaToken(),
            'Channel-id': chatId
        }
    }).then((response) => {
        message = `${response.data.message}`
    }).catch((error) => {
        message =  `${error.response.data.message}`
    });

    return message
}

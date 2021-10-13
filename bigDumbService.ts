import axios from 'axios'

const getApiUrl = () => process.env.API_URL;
const getTropinhaToken = () => process.env.TROPINHA_TOKEN;

export const getCurrentDumb = async () => {

    const url = `${getApiUrl()}/dumb`;

    try {
        const res = await axios.get(url, {
            headers: {
                'Tropinha-token': getTropinhaToken()
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

type User = string
 

export const setCurrentDumb = async (user: User) => {
    const url = `${getApiUrl()}/dumb`;

    let message = '';

    const res = await axios.post(url, {user: user}, {
        headers: {
            'Tropinha-token': getTropinhaToken()
        }
    }).then((response) => {
        message = `${response.data.message}`
    }).catch((error) => {
        message =  `${error.response.data.message}`
    });

    return message
}

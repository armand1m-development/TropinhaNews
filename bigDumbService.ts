import axios from 'axios'

const API_URL = 'https://tropinha.herokuapp.com/api'
const TROPINHA_TOKEN = 'b34a580f34774d8e7b8f8f7dbabbc1b70ec779ec010d8765aab2d75698252d2f'

export const getCurrentDumb = async () => {
    const url = `${API_URL}/dumb`;

    try {
        const res = await axios.get(url, {
            headers: {
                'Tropinha-token': TROPINHA_TOKEN
            }
        });


        if(res.data.hasDumb){
            return `Burrão atual: ${res.data.dumb.user}`
        }

        return `${res.data.message}`
        
    } catch {
      return "Deu ruim na Api.";
    }
}

type User = string
 

export const setCurrentDumb = async (user: User) => {
    const url = `${API_URL}/dumb`;

    let message = '';

    const res = await axios.post(url, {user: user}, {
        headers: {
            'Tropinha-token': TROPINHA_TOKEN
        }
    }).then((response) => {
        message = `${response.data.message}`
    }).catch((error) => {
        message =  `${error.response.data.message}`
    });

    return message
}

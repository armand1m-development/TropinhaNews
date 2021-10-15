import axios from 'axios'

const url = `${process.env.API_URL}/disorder`; 
const token = `${process.env.TROPINHA_TOKEN}`;

export const setDisorder = async (chatId: string, username: string) =>{
    try {
        const res = await axios.post(url, {user: username}, {
          headers: {
            "Tropinha-token": token,
            "Channel-id": chatId,
          },
        });

        return `${res.data.message}`;
      } catch {
        return "Deu ruim na Api.";  
    };
}

export const getDisorder = async (chatId: string) =>{
    try {
        const res = await axios.get(url, {
            headers: {
            "Tropinha-token": token,
            "Channel-id": chatId,
          },
        });

        return `Estamos ${res.data.time_without_disorder} sem treta \nNosso recorde é de ${res.data.record_time_without_disorder}`;
      } catch {
        return "Deu ruim na Api.";  
    };
}

import axios from 'axios'

const url = `${process.env.API_URL}/disorder`; 
const token = `${process.env.TROPINHA_TOKEN}`;

export const setDisorder = async (chatId: string, msg: any) =>{
  const username = msg.chat.username || msg.from.username || msg.from.first_name;

  const res = await axios.post(url, {user: username}, {
    headers: {
      "Tropinha-token": token,
      "Channel-id": chatId,
    },
  });

  return `${res.data.message}`;
}

export const getDisorder = async (chatId: string) =>{
  const res = await axios.get(url, {
      headers: {
      "Tropinha-token": token,
      "Channel-id": chatId,
    },
  });

  return `Estamos ${res.data.time_without_disorder} sem treta \nNosso recorde é de ${res.data.record_time_without_disorder}`;
}



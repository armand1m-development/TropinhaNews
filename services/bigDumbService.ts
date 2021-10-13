import axios from "axios";

const API_URL = process.env.API_URL;
const TROPINHA_TOKEN = process.env.TROPINHA_TOKEN;

export const getCurrentDumb = async (chatId: string) => {
  const url = `${API_URL}/dumb`;

  try {
    const res = await axios.get(url, {
      headers: {
        "Tropinha-token": TROPINHA_TOKEN,
        "Channel-id": chatId,
      },
    });

    if (res.data.hasDumb) {
      return `Burrão atual: ${res.data.dumb.user} \nFoi burrão: ${res.data.dumbTimes} vez(es)`;
    }

    return `${res.data.message}`;
  } catch {
    return "Deu ruim na Api.";
  }
};

export const setCurrentDumb = async (user: string, chatId: string) => {
  const url = `${API_URL}/dumb`;

  let message = "";

  const res = await axios
    .post(
      url,
      { user: user },
      {
        headers: {
          "Tropinha-token": TROPINHA_TOKEN,
          "Channel-id": chatId,
        },
      }
    )
    .then((response) => {
      message = `${response.data.message}`;
    })
    .catch((error) => {
      message = `${error.response.data.message}`;
    });

  return message;
};

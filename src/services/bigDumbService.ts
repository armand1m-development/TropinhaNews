import axios from "axios";

const API_URL = `${process.env.API_URL}/dumb`;
const TROPINHA_TOKEN = process.env.TROPINHA_TOKEN;

export const getCurrentDumb = async (chatId: string) => {
  const res = await axios.get(API_URL, {
    headers: {
      "Tropinha-token": TROPINHA_TOKEN,
      "Channel-id": chatId,
    },
  });

  if (res.data.hasDumb) {
    return [
      `Burrão atual: ${res.data.dumb.user} \nFoi burrão ${res.data.dumbTimes} ${
        res.data.dumbTimes > 1 ? "vezes" : "vez"
      }`,
    ];
  }

  return [res.data.message];
};

export const setCurrentDumb = async (chatId: string, bot: any, msg: any) => {
  let avatarUrl = false;

  const username =
    msg.reply_to_message.from.username ?? msg.reply_to_message.from.first_name;
  const profileAvatar = await bot.getUserProfilePhotos(
    msg.reply_to_message.from.id
  );

  if (profileAvatar && profileAvatar.photos[0][0]) {
    const file = profileAvatar.photos[0][2] ?? profileAvatar.photos[0][0];
    const fileId = file.file_id;
    avatarUrl = await bot.getFileStream(fileId);
  }

  return await axios
    .post(
      API_URL,
      { user: username, avatar: avatarUrl },
      {
        headers: {
          "Tropinha-token": TROPINHA_TOKEN,
          "Channel-id": chatId,
        },
      }
    )
    .then((response) => {
      return [response.data.message, avatarUrl];
    })
    .catch((error) => {
      return [error.response.data.message];
    });
};

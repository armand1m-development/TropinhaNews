import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { Readable } from "stream";

const API_URL = `${process.env.API_URL}/dumb`;
const TROPINHA_TOKEN = process.env.TROPINHA_TOKEN;

export const getCurrentDumb = async (chatId: number) => {
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

export const setCurrentDumb = async (
  chatId: number,
  bot: TelegramBot,
  msg: TelegramBot.Message
) => {
  let avatarFileStream: Readable | undefined = undefined;

  const replyUser = msg.reply_to_message?.from;

  if (!replyUser) {
    throw new Error("Failed to find user from reply message");
  }

  const username = replyUser.username ?? replyUser.first_name;

  const profileAvatar = await bot.getUserProfilePhotos(replyUser.id);

  if (profileAvatar && profileAvatar.photos[0][0]) {
    const file = profileAvatar.photos[0][2] ?? profileAvatar.photos[0][0];
    const fileId = file.file_id;
    avatarFileStream = bot.getFileStream(fileId);
  }

  return await axios
    .post(
      API_URL,
      { user: username, avatar: avatarFileStream },
      {
        headers: {
          "Tropinha-token": TROPINHA_TOKEN,
          "Channel-id": chatId,
        },
      }
    )
    .then((response) => {
      return [response.data.message, avatarFileStream];
    })
    .catch((error) => {
      return [error.response.data.message];
    });
};

import { newMessageTypes } from "./types";
import { Message } from "../models/message.model";

const createMessageService = async (input: newMessageTypes) => {
  try {
    const { chatId, userId, text } = input
    const newMessage = await Message.create({ userId, chatId, text })

    return newMessage
  } catch (error: any) {
    throw new Error(error)
  }
}

const getChatMessagesService = async (chatId: number) => {
  try {
    const messages = await Message.findAll({ where: { chatId } })

    return messages;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createMessageService, getChatMessagesService };

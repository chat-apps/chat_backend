import { newMessageTypes } from "./types";
import { Message } from "../models/message.model";

const createMessageService = async (input: newMessageTypes) => {
  try {
    const { roomID, userID, text } = input;

    const newMessage = await Message.create({ userID, roomID, text })

    return newMessage
  } catch (error: any) {
    throw new Error(error)
  }
}

const getRoomMessagesService = async (roomID: number) => {
  try {
    const messages = await Message.findAll({ where: { roomID } })

    return messages;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createMessageService, getRoomMessagesService };

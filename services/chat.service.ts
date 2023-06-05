import { getChatByIdType, newChatTypes } from "./types";
import { Chat } from "../models/chat.model";
import { checkUserExistById } from "./user.service";

const createChatService = async (input: newChatTypes) => {
  try {
    const { linkedUserId, userId } = input

    if (linkedUserId === userId) throw new Error('Something went wrong')
    const linkedUserExist = await checkUserExistById(linkedUserId)
    if (!linkedUserExist) throw new Error('User not exist')

    const newChat = await Chat.create({ userId, linkedUser: linkedUserId })

    return newChat
  } catch (error: any) {
    throw new Error(error)
  }
}

const getUserChatsService = async (userId: number) => {
  try {
    const chats = await Chat.findAll({ where: { userId } })

    return chats;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSpecificChatService = async (input: getChatByIdType) => {
  try {
    const { linkedUserId, userId } = input
    const chat: any = await Chat.findOne({ where: { userId, linkedUser: linkedUserId } })
    if (!chat) throw new Error(`Chat not found`)

    return chat;
  } catch (error: any) {
    throw new Error(error);
  }
};


export { createChatService, getUserChatsService, getSpecificChatService };

import { newMessageTypes } from "./types";
import { Message } from "../models/message.model";
import { Op } from "sequelize";

const createMessageService = async (input: newMessageTypes) => {
  try {
    const { roomID, userID, text, secondRoomID } = input;

    const newMessage = await Message.create({ userID, roomID, secondRoomID, text })

    return newMessage
  } catch (error: any) {
    throw new Error(error)
  }
}

const getRoomMessagesService = async (roomID: number, secondRoomID: number,) => {
  try {
    const messages = await Message.findAndCountAll({
      where: {
        [Op.and]: [
          {
            roomID: {
              [Op.in]: [roomID, secondRoomID],
            }
          },
          {
            secondRoomID: {
              [Op.in]: [roomID, secondRoomID],
            }
          },
        ],
      },
      order: [['createdAt', 'ASC']],
    })

    return messages;
  } catch (error: any) {
    throw new Error(error);
  }
};
const deleteMessageService = async (messageId: number) => {
  try {
    const message = await Message.destroy({ where: { ID: messageId } })

    return message;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createMessageService, getRoomMessagesService, deleteMessageService };

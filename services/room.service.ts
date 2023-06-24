import { getChatByIdType, newChatTypes } from "./types";
import { Room } from "../models/room.model";
import { checkUserExistById } from "./user.service";
import { User } from "../models/user.model";
import { Message } from "../models/message.model";
import { Sequelize, Op } from "sequelize";

const createChatService = async (input: newChatTypes) => {
  try {
    const { linkedUser, userId } = input
    if (linkedUser === userId) throw new Error('Something went wrong')

    const linkedUserExist = await checkUserExistById(linkedUser)
    if (!linkedUserExist) throw new Error('User not exist')

    const newChat = await Room.create({ userID: userId, linkedUserId: linkedUser })

    return newChat
  } catch (error: any) {
    throw new Error(error)
  }
}

const getUserChatsService = async (userId: number) => {
  try {
    const rooms = await Room.findAll({
      where: { userID: userId },
      include: [{ model: User, as: 'linkedUser' }, {
        model: Message,
        order: [['createdAt', 'DESC']],
        limit: 1,
      },],
    });

    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getRoomByIdService = async (roomId: number) => {
  try {
    const rooms = await Room.findOne({
      where: { ID: roomId },
      include: [{ model: User, as: 'linkedUser' }],
    });

    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getRoomByLinkedUserIdService = async (linkedUserId: number, currentUserId: number) => {
  try {
    let ids = [linkedUserId, currentUserId]
    const rooms = await Room.findOne({
      where: {
        linkedUserId: {
          [Op.in]: ids,
        },
        userID: {
          [Op.in]: ids,
        },
      },
      include: [{ model: User, as: 'linkedUser' }],
    });

    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createChatService, getUserChatsService, getRoomByIdService, getRoomByLinkedUserIdService };

import { newChatTypes } from "./types";
import { Room } from "../models/room.model";
import { checkUserExistById } from "./user.service";
import { User } from "../models/user.model";
import { Op } from "sequelize";

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
    return Room.findAll({
      where: {
        userID: userId,
        status: true
      },
      include: [
        {
          model: User,
          as: 'linkedUser',
          required: false
        }
      ],
    });

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

const getRoomsRequestsService = async (userId: number) => {
  try {
    const rooms = await Room.findAll({
      where: {
        linkedUserId: userId,
        status: false
      },
      include: { model: User, as: 'user' },
    });
    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSentRequestsService = async (userId: number) => {
  try {
    const rooms = await Room.findAll({
      where: {
        userID: userId,
        status: false
      },
      include: { model: User, as: 'linkedUser' },
    });
    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

const acceptRoomRequestService = async (userId: number, roomId: number) => {
  try {
    const room: any = await Room.findOne({
      where: {
        linkedUserId: userId,
        id: roomId,
        status: false
      },
    });

    if (!room) throw new Error('Room not found or already accepted.')

    room.status = true;
    await room.save();

    return room.id;
  } catch (error: any) {
    throw new Error(error)
  }
}

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
    });

    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createChatService, getUserChatsService, getSentRequestsService, getRoomByIdService, getRoomsRequestsService, acceptRoomRequestService };

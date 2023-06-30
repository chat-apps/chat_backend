import { newChatTypes } from "./types";
import { Room } from "../models/room.model";
import { checkUserExistById } from "./user.service";
import { User } from "../models/user.model";
import { Op } from "sequelize";

const createChatService = async (input: newChatTypes, status?: boolean) => {
  try {
    const { linkedUserID, userID } = input
    if (linkedUserID === userID) throw new Error('Something went wrong')

    const linkedUserExist = await checkUserExistById(linkedUserID)
    if (!linkedUserExist) throw new Error('User not exist')

    const newChat = await Room.create({ userID, linkedUserID, status })

    return newChat
  } catch (error: any) {
    throw new Error(error)
  }
}

const getUserRoomsService = async (userId: number) => {
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
    const room: any = await Room.findOne({
      where: { ID: roomId },
      include: [{ model: User, as: 'linkedUser' }],
    });

    const usersIdz = [room.linkedUserID, room.userID];

    const secondRoom: any = await Room.findOne({
      where: {
        ID: { [Op.ne]: roomId },
        linkedUserID: {
          [Op.in]: usersIdz,
        },
        userID: {
          [Op.in]: usersIdz,
        },
      },
    });

    const roomCopy: any = { ...room.toJSON() };
    roomCopy.secondRoomID = secondRoom.ID;

    return roomCopy;
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
      include: [{ model: User, as: 'user' }],
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
      include: [{ model: User, as: 'linkedUser' }],
    });
    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

const acceptRoomRequestService = async (userID: number, roomID: number) => {
  try {
    const room: any = await Room.findOne({
      where: {
        linkedUserID: userID,
        ID: roomID,
        status: false
      },
    });

    if (!room) throw new Error('Room not found or already accepted.')

    room.status = true;
    await room.save();

    await createChatService({
      linkedUserID: room.userID,
      userID,
    }, true)

    return room.id;
  } catch (error: any) {
    throw new Error(error)
  }
}

const getRoomByByBothUserIDsService = async (linkedUserId: number, currentUserId: number) => {
  try {
    let ids = [linkedUserId, currentUserId]
    const rooms = await Room.findAll({
      where: {
        linkedUserID: {
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

const checkAllUSersAlreadyHaveRoomWithOtherUser = async (users: typeof User[], userID: number) => {
  try {
    const rooms = await Room.findAll();

    const removedAlreadyLinkedUsers = users.filter((user: any) => {
      const alreadyLinked = rooms.some((room: any) => {
        if (room.userID === userID || room.linkedUserID === userID) {
          return room.linkedUserID === user.ID || room.userID === user.ID
        }
      })
      if (!alreadyLinked) {
        return user
      }
    })

    return removedAlreadyLinkedUsers;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createChatService, getUserRoomsService, getSentRequestsService, getRoomByIdService, getRoomsRequestsService, checkAllUSersAlreadyHaveRoomWithOtherUser, acceptRoomRequestService, getRoomByByBothUserIDsService };

import { validationResult } from "express-validator";
import { Request, Response } from 'express'
import { createChatService, getRoomByIdService, getUserChatsService, getRoomByLinkedUserIdService } from "../services/room.service";

const createChat = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { body } = req
    const { currentUser } = res.locals;
    body.userId = currentUser.ID
    let room = await createChatService(body)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getUserChats = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    let rooms = await getUserChatsService(ID)

    res.status(200).json({ success: true, data: rooms });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getRoomById = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    let room = await getRoomByIdService(+roomId)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
const getRoomByLinkedUserId = async (req: Request, res: Response) => {
  try {
    const { currentUser } = res.locals;
    const { linkedUserId } = req.params;
    let room = await getRoomByLinkedUserIdService(+linkedUserId, currentUser.ID)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { createChat, getUserChats, getRoomById, getRoomByLinkedUserId }
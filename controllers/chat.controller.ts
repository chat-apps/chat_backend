import { validationResult } from "express-validator";
import { Request, Response } from 'express'
import { createChatService, getSpecificChatService, getUserChatsService } from "../services/chat.service";

const createChat = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { body } = req
    const { currentUser } = res.locals;
    body.userId = currentUser.ID
    let chat = await createChatService(body)

    res.status(200).json({ success: true, data: chat });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getUserChats = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    let chats = await getUserChatsService(ID)

    res.status(200).json({ success: true, data: chats });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getSpecificChat = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    const { linkedUserId } = req.params

    let user = await getSpecificChatService({ linkedUserId: +linkedUserId, userId: ID })

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { createChat, getUserChats, getSpecificChat }
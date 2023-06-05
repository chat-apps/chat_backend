import { validationResult } from "express-validator";
import { Request, Response } from 'express'
import { createMessageService, getChatMessagesService } from "../services/message.service";

const createMessage = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { body } = req
    const { currentUser } = res.locals;
    body.userId = currentUser.ID
    let message = await createMessageService(body)

    res.status(200).json({ success: true, data: message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    let chats = await getChatMessagesService(+chatId)

    res.status(200).json({ success: true, data: chats });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/* const getSpecificChat = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    console.log(req);
    const { linkedUserId } = req.params

    let user = await getSpecificChatService({ linkedUserId: +linkedUserId, userId: ID })

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
} */

export { createMessage, getChatMessages }
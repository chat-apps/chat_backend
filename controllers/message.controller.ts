import { validationResult } from "express-validator";
import { Request, Response } from 'express'
import { createMessageService, getRoomMessagesService, deleteMessageService } from "../services/message.service";

const createMessage = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { body } = req
    const { currentUser } = res.locals;
    body.userID = currentUser.ID
    let message = await createMessageService(body)

    res.status(200).json({ success: true, data: message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getRoomMessages = async (req: Request, res: Response) => {
  try {
    const { roomId, secondRoomID } = req.params;
    let messages = await getRoomMessagesService(+roomId, +secondRoomID)

    res.status(200).json({ success: true, data: messages });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    let messages = await deleteMessageService(+messageId)

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export { createMessage, getRoomMessages, deleteMessage }
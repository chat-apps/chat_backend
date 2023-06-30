import { Router } from 'express'
import { createMessage, getRoomMessages, deleteMessage } from '../controllers/message.controller';
import { authenticate } from '../middleware/jwt.middleware';
import { new_message_validator } from '../validator/message.validator';

const router = Router()

router.post("/createMessage", new_message_validator, authenticate, createMessage);
router.get("/getRoomMessages/:roomId/:secondRoomID", authenticate, getRoomMessages);
router.delete("/delete-message/:messageId", authenticate, deleteMessage);

export default router


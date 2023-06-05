import { Router } from 'express'
import { createMessage, getChatMessages } from '../controllers/message.controller';
import { authenticate } from '../middleware/jst.middleware';
import { new_message_validator } from '../validator/message.validator';

const router = Router()

router.post("/createMessage", new_message_validator, authenticate, createMessage);
router.get("/getChatMessages/:chatId", authenticate, getChatMessages);

export default router



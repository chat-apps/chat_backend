import { Router } from 'express'
import { createMessage, getRoomMessages } from '../controllers/message.controller';
import { authenticate } from '../middleware/jst.middleware';
import { new_message_validator } from '../validator/message.validator';

const router = Router()

router.post("/createMessage", new_message_validator, authenticate, createMessage);
router.get("/getRoomMessages/:roomId", authenticate, getRoomMessages);

export default router



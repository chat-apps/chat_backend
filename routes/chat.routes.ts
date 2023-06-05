import { Router } from 'express'
import { createChat, getSpecificChat, getUserChats } from '../controllers/chat.controller';
import { authenticate } from '../middleware/jst.middleware';
import { new_chat_validator } from '../validator/chat.validator';

const router = Router()

router.post("/createChat", new_chat_validator, authenticate, createChat);
router.get("/getUserChats", authenticate, getUserChats);
router.get("/getSpecificChat/:linkedUserId", authenticate, getSpecificChat);

export default router



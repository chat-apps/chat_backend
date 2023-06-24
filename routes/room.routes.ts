import { Router } from 'express'
import { createChat, getRoomById, getUserChats, getRoomByLinkedUserId } from '../controllers/room.controller';
import { authenticate } from '../middleware/jst.middleware';
import { new_chat_validator } from '../validator/room.validator';

const router = Router()

router.post("/createChat", new_chat_validator, authenticate, createChat);
router.get("/getUserChats", authenticate, getUserChats);
router.get("/getRoomById/:roomId", authenticate, getRoomById);
router.get("/getRoomByLinkedUserId/:linkedUserId", authenticate, getRoomByLinkedUserId);

export default router



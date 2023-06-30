import { Router } from 'express'
import { createRoom, getRoomsRequests, getSentRequests, getRoomById, getUserChats, acceptRoomRequest } from '../controllers/room.controller';
import { authenticate } from '../middleware/jwt.middleware';
import { new_chat_validator } from '../validator/room.validator';

const router = Router()

router.get("/get-user-rooms", authenticate, getUserChats);
router.get("/getRoomById/:roomId", authenticate, getRoomById);
router.get("/get-rooms-requests", authenticate, getRoomsRequests);
router.get("/get-sent-requests", authenticate, getSentRequests);
router.post("/create-room", new_chat_validator, authenticate, createRoom);
router.patch("/accept-room-request/:roomId", authenticate, acceptRoomRequest);

export default router



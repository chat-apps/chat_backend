import { validationResult } from "express-validator";
import { Request, Response } from 'express'
import { createChatService, getRoomsRequestsService, getRoomByIdService, getSentRequestsService, getUserRoomsService, acceptRoomRequestService } from "../services/room.service";

const createRoom = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { body } = req
    const { currentUser } = res.locals;
    body.userID = currentUser.ID
    let room = await createChatService(body)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getUserChats = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    let rooms = await getUserRoomsService(ID)

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

const getRoomsRequests = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    let room = await getRoomsRequestsService(+ID)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getSentRequests = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    let room = await getSentRequestsService(+ID)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const acceptRoomRequest = async (req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    const { roomId } = req.params;
    let room = await acceptRoomRequestService(+ID, +roomId)

    res.status(200).json({ success: true, data: room });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { createRoom, getUserChats, getRoomById, getRoomsRequests, getSentRequests, acceptRoomRequest }
import { validationResult } from "express-validator";
import { createUserService, getAllUsersService, loginUserService } from "../services/user.service";
import { Request, Response } from 'express'
import { generateToken } from "../utils";

const createUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { body } = req

    let user = await createUserService(body)
    let token = generateToken(user)

    res.status(200).json({ success: true, data: user, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { body } = req

    let user = await loginUserService(body)
    let token = generateToken(user)

    res.status(200).json({ success: true, data: user, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const { ID } = res.locals.currentUser;
    let users = await getAllUsersService(+ID)

    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { createUser, loginUser, getAllUsers }
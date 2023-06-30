import { Router } from 'express'
import { login_validator, register_validator } from '../validator/user.validator';
import { createUser, getAllUsers, loginUser } from '../controllers/user.controller';
import { authenticate } from '../middleware/jwt.middleware';

const router = Router()

router.post("/register", register_validator, createUser);
router.post("/login", login_validator, loginUser);
router.get("/getAllUsers", authenticate, getAllUsers);


export default router



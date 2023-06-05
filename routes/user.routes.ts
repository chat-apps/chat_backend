import { Router } from 'express'
import { login_validator, register_validator } from '../validator/user.validator';
import { createUser, loginUser } from '../controllers/user.controller';

const router = Router()

router.post("/register", register_validator, createUser);
router.post("/login", login_validator, loginUser);


export default router



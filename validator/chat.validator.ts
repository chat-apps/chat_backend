import { body } from "express-validator";

const new_chat_validator = [
  body('linkedUserId').not().isEmpty().withMessage('linkedUserId must be specified'),
];

export { new_chat_validator }
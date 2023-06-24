import { body } from "express-validator";

const new_chat_validator = [
  body('linkedUser').not().isEmpty().withMessage('linkedUser must be specified'),
];

export { new_chat_validator }
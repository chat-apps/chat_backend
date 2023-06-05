import { body } from "express-validator";

const new_message_validator = [
  body('chatId').not().isEmpty().withMessage('chatId must be specified'),
  body('text').not().isEmpty().withMessage('text must be specified'),
];

export { new_message_validator } 
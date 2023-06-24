import { body } from "express-validator";

const new_message_validator = [
  body('roomID').not().isEmpty().withMessage('roomID must be specified'),
  body('text').not().isEmpty().withMessage('text must be specified'),
];

export { new_message_validator } 
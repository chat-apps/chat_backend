import { default as express } from 'express';
import { default as UserRouter } from '../routes/user.routes'
import { default as ChatRouter } from '../routes/room.routes'
import { default as MessageRouter } from '../routes/message.routes'
import "../models/associations";
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/user', UserRouter)
app.use('/room', ChatRouter)
app.use('/message', MessageRouter)


export { app }
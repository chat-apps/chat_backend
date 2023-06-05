import { default as http } from 'http';
import dotenv from 'dotenv';
import { app } from '.';
import { sequelize } from '../database';

dotenv.config();

const port = process.env.PORT || 8081;
const server = http.createServer(app)

sequelize.authenticate().then(() => {
  server.listen(port, () => console.log(`Server is running on port ${port}`));
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
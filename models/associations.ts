import { User } from "./user.model";
import { Room } from "./room.model";
import { Message } from "./message.model";

User.hasMany(Message);
User.hasMany(Room);

Room.hasMany(Message);
Room.belongsTo(User, { foreignKey: 'userID', as: 'user' });
Room.belongsTo(User, { foreignKey: 'linkedUserID', as: 'linkedUser' });

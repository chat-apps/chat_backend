import { User } from "./user.model";
import { Room } from "./room.model";
import { Message } from "./message.model";

User.hasMany(Message);
User.hasMany(Room);

Message.belongsTo(User);
Message.belongsTo(Room);

Room.hasMany(Message);
Room.belongsTo(User);
Room.belongsTo(User, { foreignKey: 'linkedUserId', as: 'linkedUser' });

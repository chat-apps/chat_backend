import { User } from "./user.model";
import { Chat } from "./chat.model";
import { Message } from "./message.model";

User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
User.hasMany(Chat, { foreignKey: 'userId', as: 'chats' });
Chat.hasMany(Message, { foreignKey: 'chatId', as: 'messages' });

Chat.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Message.belongsTo(Chat, { foreignKey: 'chatId', as: 'chat' });

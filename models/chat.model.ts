import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Chat = sequelize.define('chats', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  linkedUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
  indexes: [{
    unique: true,
    fields: ['userId', 'linkedUser']
  }]
});

export { Chat };

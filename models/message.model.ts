import { DataTypes } from "sequelize"
import { sequelize } from "../database"

const Message = sequelize.define('message', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING
  },
  roomID: {
    type: DataTypes.INTEGER
  },
  userID: {
    type: DataTypes.INTEGER
  },
  secondRoomID: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true,
})

export { Message } 

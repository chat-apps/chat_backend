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
}, {
  timestamps: true,
})

export { Message } 

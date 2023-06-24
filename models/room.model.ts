import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Room = sequelize.define('rooms', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  timestamps: true,
  indexes: [{
    unique: true,
    fields: ['userID', 'linkedUserId']
  }]
});

export { Room };

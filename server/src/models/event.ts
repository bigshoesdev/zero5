import { DataTypes, Model } from "sequelize";
import db from "../config/database";

export interface EventAttributes {
  id: string;
  device_id: string;
  device_location: string;
  license_plate_number: string;
  timestamp: number;
  img: string;
  location: string;
}

export class EventInstance extends Model<EventAttributes> {}

EventInstance.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    device_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    device_location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    license_plate_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    img: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "events",
  }
);

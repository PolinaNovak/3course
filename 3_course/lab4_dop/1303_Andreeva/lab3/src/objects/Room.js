import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";
import {Floor} from "./Floor.js";

export const Room = sequelize.define('Room', {
    roomNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER
    },
    floorNumber: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: Floor,
            key: 'floorNumber'
        },
        onDelete: 'CASCADE'
    },
})

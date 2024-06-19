import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";
import {Client} from "./Client.js";
import {Room} from "./Room.js";

export const ClientRoom = sequelize.define('ClientRoom', {
    passportNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Client,
            key: 'passportNumber'
        }
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Room,
            key: 'roomNumber'
        }
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
})

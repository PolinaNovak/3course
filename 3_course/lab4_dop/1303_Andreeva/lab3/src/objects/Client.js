import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";

export const Client = sequelize.define('Client', {
    passportNumber : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    secondName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    patronymic: {
        type: DataTypes.TEXT,
    },
    city: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

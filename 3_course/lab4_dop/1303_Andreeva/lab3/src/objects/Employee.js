import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";

export const Employee = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    secondName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    patronymic: {
        type: DataTypes.TEXT
    }
})

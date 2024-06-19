import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";
import {Floor} from "./Floor.js";
import {CleaningDay} from "./CleaningDay.js";
import {Employee} from "./Employee.js";

export const EmployeeCleaning = sequelize.define('EmployeeCleaning', {
    employeeCleaningId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    floorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Floor,
            key: 'floorNumber'
        },
        onDelete: 'CASCADE',
    },
    day: {
        type: DataTypes.INTEGER,
        references: {
            model: CleaningDay,
            key: 'day'
        },
        onDelete: 'SET NULL',
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'employeeId'
        },
        onDelete: 'SET NULL',
    },
})

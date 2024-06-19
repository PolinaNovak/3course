import sequelize from "../index.js"
import DataTypes from 'sequelize';
import Faculty from "./faculty.js";
import { degrees, ranks } from '../enums.js';

const Department = sequelize.define('Department', {
    dep_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(70),
    },
    faculty_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Faculty,
            key: 'faculty_id',
        },
    },
    head_name: {
        type: DataTypes.STRING(70),
    },
    head_degree: {
        type: DataTypes.ENUM(...degrees),
    },
    head_rank: {
        type: DataTypes.ENUM(...ranks),
    },
}, {
    tableName: 'department',
    timestamps: false
});

export default Department
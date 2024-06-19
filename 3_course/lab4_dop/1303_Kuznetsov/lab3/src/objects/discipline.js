import sequelize from "../index.js"
import DataTypes from "sequelize";
import {reportTypes} from "../enums.js";

const Discipline = sequelize.define('Discipline', {
    discipline_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    discipline_name: {
        type: DataTypes.STRING(70),
    },
    semesters: {
        type: DataTypes.INTEGER,
    },
    lection_hours: {
        type: DataTypes.DECIMAL(3, 1),
    },
    practice_hours: {
        type: DataTypes.DECIMAL(3, 1),
    },
    lab_hours: {
        type: DataTypes.DECIMAL(3, 1),
    },
    cw_hours: {
        type: DataTypes.DECIMAL(3, 1),
    },
    report_type: {
        type: DataTypes.ENUM(...reportTypes),
    },
}, {
    tableName: 'discipline',
    timestamps: false
});

export default Discipline;
import sequelize from "../index.js"
import DataTypes from 'sequelize';
import Department from "./department.js";
import {studyForms} from "../enums.js";

const Specialization = sequelize.define('Specialization', {
    specialization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    specialization_name: {
        type: DataTypes.STRING(70),
    },
    dep_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'dep_id',
        },
    },
    specialization_code: {
        type: DataTypes.STRING(20),
    },
    qualification: {
        type: DataTypes.STRING(70),
    },
    duration: {
        type: DataTypes.DECIMAL(3, 2),
    },
    study_form: {
        type: DataTypes.ENUM(...studyForms),
    },
}, {
    tableName: 'specialization',
    timestamps: false
});

export default Specialization
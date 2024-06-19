import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';
import {doctor} from "./doctor.js";

export const registrationWorker = sequelize.define('registrationWorker', {
    id_reg_worker: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_doctor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: doctor,
            key: 'id_doctor',
        },
        onDelete: 'CASCADE',
    },
});


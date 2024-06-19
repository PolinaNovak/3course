import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';
import {mainer} from "./mainer.js";
import {doctor} from "./doctor.js";

export const doctorDismissal = sequelize.define('doctorDismissal', {
    id_mainer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: mainer,
            key: 'id_mainer',
        },
    },
    id_doctor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: doctor,
            key: 'id_doctor',
        },
    },
});


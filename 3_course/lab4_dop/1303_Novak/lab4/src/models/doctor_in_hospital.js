import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';
import {doctor} from "./doctor.js";
import {hospital} from "./hospital.js";

export const doctorInHospital = sequelize.define('doctorInHospital', {
    hospital_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: hospital,
            key: 'hospital_number',
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



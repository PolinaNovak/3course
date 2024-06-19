import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';
import {doctor} from "./doctor.js";
import {mainer} from "./mainer.js";

export const patientCard = sequelize.define('patientCard', {
    id_card: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    SNILS: {
        type: DataTypes.INTEGER,
    },
    first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    second_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    surname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sex: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    id_mainer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: mainer,
            key: 'id_mainer',
        },
        onDelete: 'CASCADE',
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
}
,{
    indexes: [
        {
            fields: ['id_card'],
        },
        {
            fields: ['id_doctor'],
        },
        {
            fields: ['id_mainer'],
        },
        {
            fields: ['SNILS'],
        },
        {
            fields: ['first_name'],
        },
        {
            fields: ['second_name'],
        },
        {
            fields: ['surname'],
        },
        {
            fields: ['address'],
        },
        {
            fields: ['sex'],
        },
        {
            fields: ['age'],
        },
    ]
}
);


import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';

export const doctor = sequelize.define('doctor', {
    id_doctor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    category: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER,
    },
    date_of_birth: {
        type: DataTypes.DATE,
    },
    visitors_day: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    visitors_hour: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cabinet: {
        type: DataTypes.INTEGER,
    },
    end_day: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}
,{
    indexes: [
        {
            fields: ['id_doctor'],
        },
        {
            fields: ['visitors_day'],
        },
        {
            fields: ['visitors_hour'],
        },
        {
            fields: ['cabinet'],
        },
        {
            fields: ['end_day'],
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
            fields: ['category'],
        },
        {
            fields: ['experience'],
        },
        {
            fields: ['date_of_birth'],
        },
    ]
}
);


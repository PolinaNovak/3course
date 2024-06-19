import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';
import {doctor} from "./doctor.js";

export const note = sequelize.define('note', {
    id_note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    visit_date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    complaint: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    diagnose: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    appointment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sick_list: {
        type: DataTypes.BOOLEAN,
    },
    term: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    completion_date: {
        type: DataTypes.TEXT,
        allowNull: false,
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
            fields: ['id_note'],
        },
        {
            fields: ['id_doctor'],
        },
        {
            fields: ['visit_date'],
        },
        {
            fields: ['complaint'],
        },
        {
            fields: ['diagnose'],
        },
        {
            fields: ['appointment'],
        },
        {
            fields: ['sick_list'],
        },
        {
            fields: ['term'],
        },
        {
            fields: ['completion_date'],
        },
    ]
}
);


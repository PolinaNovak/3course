import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'


export const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    patronymic: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: false,
    indexes: [
        {
            fields: ['firstName']
        },
        {
            fields: ['lastName']
        },
        {
            fields: ['patronymic']
        },
    ]
});
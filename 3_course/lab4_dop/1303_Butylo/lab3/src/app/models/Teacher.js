import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'


export const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    patronymic: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'
import {Class} from "./Class.js";


export const Student = sequelize.define('Student', {
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
    },
    className: {
        type: DataTypes.TEXT,
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
            model: Class,
            key: 'className',
        }
    }
}, {
    timestamps: false
});


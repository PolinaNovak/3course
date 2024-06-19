import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'


export const Class = sequelize.define('Class', {
    className: {
        type: DataTypes.TEXT,
        primaryKey: true
    }
}, {
    timestamps: false
});

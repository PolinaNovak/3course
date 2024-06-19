import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'


export const Subject = sequelize.define('Subject', {
    subjectName: {
        type: DataTypes.TEXT,
        primaryKey: true
    }
}, {
    timestamps: false
});


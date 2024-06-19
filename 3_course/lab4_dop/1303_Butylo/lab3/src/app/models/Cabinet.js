import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'


export const Cabinet = sequelize.define('Cabinet', {
    cabinetNumber: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    }
}, {
    timestamps: false
});

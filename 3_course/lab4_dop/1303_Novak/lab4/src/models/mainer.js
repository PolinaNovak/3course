import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';

export const mainer = sequelize.define('mainer', {
    id_mainer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});


import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';

export const hospital = sequelize.define('hospital', {
    hospital_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});




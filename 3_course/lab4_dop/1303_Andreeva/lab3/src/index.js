import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('hotel', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres',
});

import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize(
    'postman',
    'postgres',
    '0000', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    })
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', '1234',{
    dialect: 'postgres',
    host: 'localhost',
});

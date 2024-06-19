import {Sequelize} from 'sequelize'

const dbName = 'db-lab3'
export const sequelize = new Sequelize(dbName, 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}



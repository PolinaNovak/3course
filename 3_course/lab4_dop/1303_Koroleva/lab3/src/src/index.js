import {Sequelize} from 'sequelize'

const name = 'lab3'
export const sequelize = new Sequelize(name, 'postgres', 'localdbpass', {
    host: 'localhost',
    dialect: 'postgres'
});

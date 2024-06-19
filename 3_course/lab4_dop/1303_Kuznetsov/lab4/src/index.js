import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('university', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        allowNull: false,
    },
    logging: false,
});

export default sequelize
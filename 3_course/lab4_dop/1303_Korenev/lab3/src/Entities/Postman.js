import { sequelize } from "../createSchemas.js"
import {Sequelize} from "sequelize";

export const Postman = sequelize.define('postman', {
    postmanid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    middlename: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});


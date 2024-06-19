import { sequelize } from "../createSchemas.js"
import {Sequelize} from "sequelize";

export const Publication = sequelize.define('publication', {
    publicationid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    index: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2)
    }
});




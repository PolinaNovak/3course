import { sequelize } from "../createSchemas.js"
import {Sequelize} from "sequelize";

export const Subscription = sequelize.define('subscription', {
    subscriptionid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publicationid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subscriberid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    startdate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});



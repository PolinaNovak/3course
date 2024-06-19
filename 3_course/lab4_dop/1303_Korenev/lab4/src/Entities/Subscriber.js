import { sequelize } from "../createSchemas.js"
import {Sequelize} from "sequelize";

export const Subscriber = sequelize.define('subscriber', {
    subscriberid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    houseid: {
        type: Sequelize.INTEGER,
        allowNull: false
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
},{
    timestamps: false,
    // indexes: [
    //     {
    //         fields: ['houseid']
    //     },
    //     {
    //         fields: ['firstname']
    //     },
    //     {
    //         fields: ['middlename']
    //     },
    //     {
    //         fields: ['lastname']
    //     }
    // ]
});


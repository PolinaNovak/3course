import { sequelize } from "../createSchemas.js"
import {Sequelize} from "sequelize";

export const District = sequelize.define('district', {
    districtid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postmanid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},{
    timestamps: false,
    // indexes: [
    //     {
    //         fields: ['postmanid']
    //     },
    //     {
    //         fields: ['name']
    //     }
    // ]
});
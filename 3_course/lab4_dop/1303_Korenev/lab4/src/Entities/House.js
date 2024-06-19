import { sequelize } from "../createSchemas.js"
import {Sequelize} from "sequelize";

export const House = sequelize.define('house', {
    houseid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    districtid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},{
    timestamps: false,
    // indexes: [
    //     {
    //         fields: ['districtid']
    //     },
    //     {
    //         fields: ['address']
    //     }
    // ]
});
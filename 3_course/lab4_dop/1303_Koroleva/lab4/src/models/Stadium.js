import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Stadium = sequelize.define("Stadium",
{
    stadiumName: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    city:{
        type: DataTypes.TEXT,
    },
    capacity: {
        type: DataTypes.INTEGER,
    }},{
        freezeTableName: true,
        // indexes: [{
        //     fields: ["city"]
        // },
        // {
        //     fields: ["stadiumName"]
        // }]
})
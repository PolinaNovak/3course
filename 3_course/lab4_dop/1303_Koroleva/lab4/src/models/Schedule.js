import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Schedule = sequelize.define("Schedule",
    {
        id_game: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        score1: {
            type: DataTypes.SMALLINT,
        },
        score2: {
            type: DataTypes.SMALLINT,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        stadiumName: {
            type: DataTypes.TEXT,
        },
        sponsorName: {
            type: DataTypes.TEXT,
        }
    }, {
    freezeTableName: true,
    // indexes: [{
    //     fields: ["date"]
    // },
    // {
    //     fields: ["stadiumName"]
    // },
    // {
    //     fields: ["score1"]
    // },
    // {
    //     fields: ["score2"]
    // },
    // {
    //     fields: ["price"]
    // },
    // {
    //     fields: ["id_game"]
    // }]
})
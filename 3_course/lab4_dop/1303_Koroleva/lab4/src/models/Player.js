import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Player = sequelize.define("Player",
    {
        id_player: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        teamName: {
            type: DataTypes.TEXT,
        },
        lastName: {
            type: DataTypes.TEXT,
        },
        firstName: {
            type: DataTypes.TEXT,
        },
        age: {
            type: DataTypes.SMALLINT,
        },
        role: {
            type: DataTypes.TEXT,
        },
        number: {
            type: DataTypes.INTEGER,
        },
        goals: {
            type: DataTypes.SMALLINT,
        }
    }, {
    freezeTableName: true,
    // indexes: [{
    //     fields: ["age"]
    // },
    // {
    //     fields: ["goals"]
    // },
    // {
    //     fields: ["teamName"]
    // },
    // {
    //     fields: ["number"]
    // },
    // {
    //     fields: ["lastName"]
    // },
    // {
    //     fields: ["firstName"]
    // }]
})
import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Player = sequelize.define("Player",
{
    id_player: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    teamName: {
        type: DataTypes.TEXT,
    },
    lastName:{
        type: DataTypes.TEXT,
    },
    firstName:{
        type: DataTypes.TEXT,
    },
    age: {
        type: DataTypes.SMALLINT,
    },
    role: {
        type: DataTypes.TEXT,
    },
    number: {
        type: DataTypes.SMALLINT,
    },
    goals: {
        type: DataTypes.SMALLINT,
    }},{
        freezeTableName: true
})
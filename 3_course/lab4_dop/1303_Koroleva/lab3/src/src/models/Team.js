import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Team = sequelize.define("Team",
{
    teamName: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    city:{
        type: DataTypes.TEXT,
    },
    coach:{
        type: DataTypes.TEXT,
    },
    place: {
        type: DataTypes.SMALLINT,
    }},{
        freezeTableName: true
})
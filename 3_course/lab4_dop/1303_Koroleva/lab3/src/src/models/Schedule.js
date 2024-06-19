import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Schedule = sequelize.define("Schedule",
{
    id_game: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
    },
    score1:{
        type: DataTypes.SMALLINT,
    },
    score2:{
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
    }},{
        freezeTableName: true
})
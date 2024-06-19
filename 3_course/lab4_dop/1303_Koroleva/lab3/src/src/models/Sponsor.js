import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";

export const Sponsor = sequelize.define("Sponsor",
{
    sponsorName: {
        type: DataTypes.TEXT,
        primaryKey: true
    }},{
        freezeTableName: true
})
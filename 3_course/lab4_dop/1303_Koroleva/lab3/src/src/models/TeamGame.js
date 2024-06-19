import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";
import { Schedule } from "./Schedule.js";
import { Team } from "./team.js";

export const TeamGame = sequelize.define("TeamGame",
{
    teamName1: {
        type: DataTypes.TEXT,
        references: {
            model: Team,
            key: "teamName"
        }
    },
    teamName2:{
        type: DataTypes.TEXT,
        references: {
            model: Team,
            key: "teamName"
        }
    },
    id_game: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        references: {
            model: Schedule,
            key: "id_game"
        }
    }},{
        freezeTableName: true
})
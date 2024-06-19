import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";

export const CleaningDay = sequelize.define('CleaningDay', {
    day: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    }
})
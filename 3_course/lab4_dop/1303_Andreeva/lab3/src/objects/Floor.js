import {sequelize} from "../index.js";
import {DataTypes} from "sequelize";

export const Floor = sequelize.define('Floor', {
    floorNumber: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    }
})

import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'
import {Teacher} from "./Teacher.js";
import {Cabinet} from "./Cabinet.js";


export const TeacherCabinet = sequelize.define('Teacher-Cabinet', {
    teacherId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
            model: Teacher,
            key: 'id'
        }
    },
    cabinetNumber: {
        type: DataTypes.SMALLINT,
        onDelete: 'CASCADE',
        references: {
            model: Cabinet,
            key: 'cabinetNumber'
        }
    }
}, {
    timestamps: false
});

import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'
import {Class} from "./Class.js";
import {Subject} from "./Subject.js";
import {Teacher} from "./Teacher.js";
import {Cabinet} from "./Cabinet.js";


export const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    day: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    className: {
        type: DataTypes.TEXT,
        onDelete: 'CASCADE',
        references: {
            model: Class,
            key: 'className'
        }
    },
    subjectName: {
        type: DataTypes.TEXT,
        onDelete: 'CASCADE',
        references: {
            model: Subject,
            key: 'subjectName'
        }
    },
    teacherId: {
        type: DataTypes.SMALLINT,
        onDelete: 'SET NULL',
        references: {
            model: Teacher,
            key: 'id'
        }
    },
    cabinetNumber: {
        type: DataTypes.SMALLINT,
        onDelete: 'SET NULL',
        references: {
            model: Cabinet,
            key: 'cabinetNumber'
        }
    }
}, {
    timestamps: false
});

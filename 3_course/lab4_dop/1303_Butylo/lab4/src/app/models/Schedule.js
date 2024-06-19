import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'
import {Class} from "./Class.js";
import {Subject} from "./Subject.js";
import {Teacher} from "./Teacher.js";
import {Cabinet} from "./Cabinet.js";


export const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    day: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    className: {
        type: DataTypes.TEXT,
        onDelete: 'CASCADE',
        references: {
            model: Class,
            key: 'className'
        },
    },
    subjectName: {
        type: DataTypes.TEXT,
        onDelete: 'CASCADE',
        references: {
            model: Subject,
            key: 'subjectName'
        },
    },
    teacherId: {
        type: DataTypes.INTEGER,
        onDelete: 'SET NULL',
        references: {
            model: Teacher,
            key: 'id'
        },
    },
    cabinetNumber: {
        type: DataTypes.INTEGER,
        onDelete: 'SET NULL',
        references: {
            model: Cabinet,
            key: 'cabinetNumber'
        },
    }
}, {
    timestamps: false,
    indexes: [
        {
            fields: ['orderNumber'],
        },
        {
            fields: ['className'],
        },
        {
            fields: ['subjectName'],
        },
        {
            fields: ['teacherId'],
        },
        {
            fields: ['cabinetNumber'],
        },
        {
            fields: ['day'],
        },
    ]
});


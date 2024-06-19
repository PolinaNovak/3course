import {DataTypes} from 'sequelize'
import {sequelize} from '../index.js'
import {Student} from "./Student.js";
import {Subject} from "./Subject.js";


export const Grade = sequelize.define('Grade', {
    studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: Student,
            key: 'id'
        }
    },
    subjectName: {
        type: DataTypes.TEXT,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
            model: Subject,
            key: 'subjectName'
        }
    },
    grade: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
}, {
    timestamps: false
});


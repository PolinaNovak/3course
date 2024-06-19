import sequelize from "../index.js"
import DataTypes from 'sequelize';
import Discipline from "./discipline.js";
import Specialization from "./specialization.js";

const DisciplineSpecialization = sequelize.define('DisciplineSpecialization', {
    discipline_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Discipline,
            key: 'discipline_id',
        },
    },
    specialization_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Specialization,
            key: 'specialization_id',
        },
    },
}, {
    tableName: 'discipline_specialization',
    timestamps: false,
    indexes: [
        {
            fields: ['discipline_id'],
        },
        {
            fields: ['specialization_id'],
        }
    ],
});

export default DisciplineSpecialization;
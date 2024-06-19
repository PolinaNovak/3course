import sequelize from "../index.js"
import DataTypes from 'sequelize';

const Faculty = sequelize.define('Faculty', {
    faculty_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    faculty_name: {
        type: DataTypes.STRING(70),
    },
}, {
    tableName: 'faculty',
    timestamps: false
});

export default Faculty
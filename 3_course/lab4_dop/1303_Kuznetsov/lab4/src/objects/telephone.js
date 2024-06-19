import sequelize from "../index.js"
import DataTypes from 'sequelize';
import Department from "./department.js";

const Telephone = sequelize.define('Telephone', {
    telephone_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    telephone_number: {
        type: DataTypes.STRING(120),
    },
    dep_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'dep_id',
        },
    },
}, {
    tableName: 'telephone',
    timestamps: false
});

export default Telephone

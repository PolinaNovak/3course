const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {

    const Teacher = require("./Teacher.js")(sequelize)
    const Cabinet = require("./Cabinet.js")(sequelize)

    return sequelize.define('Teacher-Cabinet', {
        teacherId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            onDelete: 'CASCADE',
            references: {
                model: Teacher,
                key: 'id'
            }
        },
        cabinetNumber: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: Cabinet,
                key: 'cabinetNumber'
            }
        }
    }, {
        timestamps: false
    });
};
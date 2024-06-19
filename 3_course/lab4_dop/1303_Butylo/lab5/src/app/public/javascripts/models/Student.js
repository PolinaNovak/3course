const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {

    const Class = require("./Class.js")(sequelize)

    return sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        patronymic: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        className: {
            type: DataTypes.TEXT,
            allowNull: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            references: {
                model: Class,
                key: 'className',
            }
        }
    }, {
        timestamps: false
    });
};


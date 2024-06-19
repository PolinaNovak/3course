const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
    return sequelize.define('Cabinet', {
        cabinetNumber: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false
    });
};
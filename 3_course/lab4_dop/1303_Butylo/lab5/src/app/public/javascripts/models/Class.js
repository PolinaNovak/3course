const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
    return sequelize.define('Class', {
        className: {
            type: DataTypes.TEXT,
            primaryKey: true
        }
    }, {
        timestamps: false
    });
};
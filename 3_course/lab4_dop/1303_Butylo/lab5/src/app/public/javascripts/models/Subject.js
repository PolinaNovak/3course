const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
    return sequelize.define('Subject', {
        subjectName: {
            type: DataTypes.TEXT,
            primaryKey: true
        }
    }, {
        timestamps: false
    });
};

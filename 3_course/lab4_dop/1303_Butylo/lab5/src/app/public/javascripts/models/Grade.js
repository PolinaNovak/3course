const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {

    const Student = require("./Student.js")(sequelize)
    const Subject = require("./Subject.js")(sequelize)

    return sequelize.define('Grade', {
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
};


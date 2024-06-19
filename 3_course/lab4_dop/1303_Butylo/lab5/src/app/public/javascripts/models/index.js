const {Sequelize} = require("sequelize");


const dbName = 'db-lab3'
const sequelize = new Sequelize(dbName, 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres'
});


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.cabinet = require('./Cabinet.js')(sequelize)
db.class = require('./Class.js')(sequelize)
db.subject = require('./Subject.js')(sequelize)
db.teacher = require('./Teacher.js')(sequelize)
db.teacher_cabinet = require('./Teacher-Cabinet.js')(sequelize)
db.student = require('./Student.js')(sequelize)
db.grade = require('./Grade.js')(sequelize)
db.schedule = require('./Schedule.js')(sequelize)


module.exports = db

import { Sequelize } from "sequelize-typescript";
import { Faculty } from "./models/faculty.model";
import { Department } from "./models/department.model";
import { Group } from "./models/group.model";
import { Student } from "./models/student.model";
import { Stream } from "./models/stream.model";
import { ExaminationSheet } from "./models/examinationSheet.model";
import { Subject } from "./models/subject.model";
import { Exam } from "./models/exam.model";
import { Consultation } from "./models/consultation.model";
import { fillTable } from "./queries/fillTable";
import { makeTasks } from "./queries/task";


let sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    username: 'postgres',
    password: '12345',
    port: 1488,
    database: 'Приёмная_комиссия_sequelize',
});

sequelize.addModels([
    Faculty,
    Department,
    Group,
    Student,
    Stream,
    ExaminationSheet,
    Subject,
    Exam,
    Consultation
]);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({force: true});
    console.log('All models were synchronized successfully.');
    await fillTable(sequelize);
    console.log('Fill the tables');
    await makeTasks(sequelize);
    console.log('Make tasks');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

await sequelize.close();
console.log('Connection has been closed successfully.');
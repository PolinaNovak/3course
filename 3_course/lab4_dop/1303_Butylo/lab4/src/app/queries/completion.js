import {Cabinet, Class, Student, Subject, Grade, Teacher, TeacherCabinet, Schedule} from '../models/indexModels.js'

import {StudentController} from "../controllers/studentController.js"
import {TeacherController} from "../controllers/teacherController.js"
import {ClassController} from "../controllers/classController.js"

import {sequelize} from "../index.js";


const count = 1000000
const studentController = new StudentController(count)
const teacherController = new TeacherController(count)
const classController = new ClassController(count)


function randomGrade() {
    return Math.floor(Math.random() * (10 - 1) + 1);
}

function randomCabinet() {
    return Math.floor(Math.random() * (count - 1) + 1);
}


await Schedule.belongsTo(Teacher, {foreignKey: 'teacherId'})
await Teacher.hasMany(Schedule, {foreignKey: 'teacherId'})

await sequelize.sync({force: true}).then(() => {
    console.log("\nAll models were synchronized successfully.");
});
await fill()

async function fill() {
    await Cabinet.bulkCreate(Array.from({length: count}, (v, k) =>
        ({cabinetNumber: k + 1})), {logging: false});
    console.log("\nCabinet model was filled successfully.");

    await Teacher.bulkCreate(teacherController.teachers, {logging: false});
    console.log("\nTeacher model was filled successfully.");

    await TeacherCabinet.bulkCreate(Array.from({length: count}, (v, k) =>
        ({teacherId: k + 1, cabinetNumber: k + 1})), {logging: false});
    console.log("\nTeacher-Cabinet model was filled successfully.");

    await Class.bulkCreate(classController.class_names.map((className) =>
        ({className: className})), {logging: false});
    console.log("\nClass model was filled successfully.");

    await Student.bulkCreate(studentController.students.map((student) =>
        ({
            firstName: student.firstName,
            lastName: student.lastName,
            patronymic: student.patronymic,
            className: classController.randomClass()
        })
    ), {logging: false});
    console.log("\nStudent model was filled successfully.");

    const subjectList = ['Математика', 'Физика', 'Русский язык', 'География', 'Химия', 'Биология', 'Физкультура']

    function randomSubject() {
        return subjectList[Math.floor(Math.random() * (subjectList.length - 1))];
    }

    await Subject.bulkCreate(subjectList.map((name) =>
        ({subjectName: name})), {logging: false});
    console.log("\nSubject model was filled successfully.");

    console.log()
    const [res, _] = await sequelize.query(
        'SELECT "id", "subjectName" FROM "Students" CROSS JOIN "Subjects";'
    );

    if (count > 100000) {
        let part = res.splice(0, 100000)
        while (part.length) {
            await Grade.bulkCreate(part.map((pair) =>
                ({
                    studentId: pair.id,
                    subjectName: pair.subjectName,
                    grade: randomGrade()
                })
            ), {logging: false});

            part = res.splice(0, 100000)
        }
    } else {
        await Grade.bulkCreate(res.map((pair) =>
            ({
                studentId: pair.id,
                subjectName: pair.subjectName,
                grade: randomGrade()
            })
        ), {logging: false});
    }
    console.log("Grade model was filled successfully.");


// const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']
    await Schedule.bulkCreate(classController.class_names.map((name) =>
        ({
            orderNumber: 1,
            day: 'Среда',
            className: name,
            subjectName: randomSubject(),
            teacherId: randomCabinet(), // generates a number in a suitable range
            cabinetNumber: randomCabinet()
        })), {logging: false});

    await Schedule.bulkCreate(classController.class_names.map((name) =>
        ({
            orderNumber: 5,
            day: 'Среда',
            className: name,
            subjectName: randomSubject(),
            teacherId: randomCabinet(), // generates a number in a suitable range
            cabinetNumber: randomCabinet()
        })), {logging: false});

    await Schedule.bulkCreate(
        [{
            orderNumber: 2,
            day: 'Среда',
            className: '15737J',
            subjectName: 'Математика',
            teacherId: 1,
            cabinetNumber: randomCabinet()
        }], {logging: false});
    console.log("\nSchedule model was filled successfully.");
}
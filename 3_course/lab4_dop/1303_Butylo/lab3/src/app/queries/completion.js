import {Cabinet, Class, Student, Subject, Grade, Teacher, TeacherCabinet, Schedule} from '../models/indexModels.js'

import {sequelize} from "../index.js";


function randomGrade() {
    return Math.floor(Math.random() * (10 - 1) + 1);
}

await Schedule.belongsTo(Teacher, {foreignKey: 'teacherId'})
await Teacher.hasMany(Schedule, {foreignKey: 'teacherId'})


await sequelize.sync({force: true}).then(() => {
    console.log("All models were synchronized successfully.");
});

await Cabinet.bulkCreate([
    {cabinetNumber: 11},
    {cabinetNumber: 12},
    {cabinetNumber: 13}, // free
    {cabinetNumber: 14},
    {cabinetNumber: 15},
    {cabinetNumber: 16},
    {cabinetNumber: 17}
]);

await Teacher.bulkCreate([
    {lastName: 'Иванов', firstName: 'Иван', patronymic: 'Иванович'},
    {lastName: 'Забудь', firstName: 'Светлана', patronymic: 'Ивановна'},
    {lastName: 'Макаревич', firstName: 'Андрей', patronymic: 'Игоревич'},
    {lastName: 'Семашко', firstName: 'Зинаида', patronymic: 'Климовна'}, // free
    {lastName: 'Попова', firstName: 'Ульяна', patronymic: 'Владиславовна'},
    {lastName: 'Вечёрко', firstName: 'Анастасия', patronymic: 'Дмитриевна'},
    {lastName: 'Ожог', firstName: 'Николай', patronymic: 'Витальевич'},
]);

await TeacherCabinet.bulkCreate([
    {teacherId: 1, cabinetNumber: 11},
    {teacherId: 2, cabinetNumber: 12},
    {teacherId: 3, cabinetNumber: 14},
    {teacherId: 5, cabinetNumber: 15},
    {teacherId: 6, cabinetNumber: 16},
    {teacherId: 7, cabinetNumber: 17}
]);

await Class.bulkCreate([
    {className: '4В'},
    {className: '7А'},
    {className: '7Б'},
    {className: '9Б'},
    {className: '11А'}
]);

await Student.bulkCreate([
    {className: '4В', lastName: 'Степанов', firstName: 'Василий', patronymic: 'Анатольевич'},
    {className: '4В', lastName: 'Авдеев', firstName: 'Георгий', patronymic: 'Фёдорович'},
    {className: '7А', lastName: 'Виноградов', firstName: 'Анатолий', patronymic: 'Алексеевич'},
    {className: '7А', lastName: 'Кузнецов', firstName: 'Илья', patronymic: 'Михайлович'},
    {className: '7Б', lastName: 'Смирнов', firstName: 'Николай', patronymic: 'Денисовчи'},
    {className: '7Б', lastName: 'Назарова', firstName: 'Мария', patronymic: 'Михайловна'},
    {className: '9Б', lastName: 'Михеева', firstName: 'Елизавета', patronymic: 'Алексеевна'},
    {className: '9Б', lastName: 'Ковалева', firstName: 'Анастасия', patronymic: 'Сегреевна'},
    {className: '11А', lastName: 'Анисимов', firstName: 'Ярослав', patronymic: 'Юрьевич'},
    {className: '11А', lastName: 'Нечаева', firstName: 'Светлана', patronymic: 'Генадьевна'}
]);

await Subject.bulkCreate([
    {subjectName: 'Математика'},
    {subjectName: 'Физика'},
    {subjectName: 'Русский язык'},
    {subjectName: 'География'},
    {subjectName: 'Химия'},
    {subjectName: 'Биология'},
    {subjectName: 'Физкультура'}
]);

let grade_filling = []
await sequelize.query(
    'SELECT "id" AS "studentId", "subjectName" FROM "Students" CROSS JOIN "Subjects";'
).then( ([res, _]) => {
    res.forEach( (elem, i) => {
         res[i] = {
            'studentId': elem.studentId,
            'subjectName': elem.subjectName,
            'grade': randomGrade()
        }
    });

    grade_filling = res
});
await Grade.bulkCreate(grade_filling)

await Schedule.bulkCreate([
    {orderNumber: 1, day: 'Понедельник', className: '4В', subjectName: 'Математика', teacherId: 1, cabinetNumber: 17},
    {orderNumber: 1, day: 'Вторник', className: '4В', subjectName: 'Физика', teacherId: 2, cabinetNumber: 12},
    {orderNumber: 1, day: 'Среда', className: '4В', subjectName: 'Математика', teacherId: 1, cabinetNumber: 17},
    {orderNumber: 2, day: 'Среда', className: '4В', subjectName: 'Физика', teacherId: 1, cabinetNumber: 12},
    {orderNumber: 3, day: 'Среда', className: '4В', subjectName: 'Физкультура', teacherId: 5, cabinetNumber: 16},
    {orderNumber: 4, day: 'Среда', className: '4В', subjectName: 'География', teacherId: 3, cabinetNumber: 14},
    {orderNumber: 5, day: 'Среда', className: '4В', subjectName: 'Химия', teacherId: 4, cabinetNumber: 12},
    {orderNumber: 1, day: 'Четверг', className: '4В', subjectName: 'Русский язык', teacherId: 7, cabinetNumber: 11},
    {orderNumber: 1, day: 'Пятница', className: '4В', subjectName: 'Математика', teacherId: 1, cabinetNumber: 17},
    {orderNumber: 1, day: 'Среда', className: '9Б', subjectName: 'Математика', teacherId: 1, cabinetNumber: 13},
]);

import './completion.js';
import {sequelize} from "../index.js";
import 'fs';
import * as fs from "fs";
import {Schedule, Student, Teacher} from "../models/indexModels.js";

console.time()

console.log('\n')
await Schedule.findAll({
    attributes: ['subjectName'],
    where: {
        className: '12123B',
        day: 'Среда',
        orderNumber: 5
    },
    limit: 1,
}).then((res) => {
    let text = 'Какой предмет будет в заданном классе, в заданный день недели на заданном уроке?\n'
    fs.writeFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

// console.log('\n')
// await Teacher.findAll({
//     attributes: [[sequelize.fn('concat', sequelize.col('lastName'), ' ', sequelize.col('firstName'), ' ', sequelize.col('patronymic')), 'teacher' ]],
//     include: {
//         model: Schedule,
//         attributes: [],
//         required: true,
//         where: {
//             className: '25448F'
//         }
//     },
//     limit: 1,
// }).then((res) => {
//     let text = '\n\n\nКто из учителей преподает в заданном классе?\n'
//     fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
// })

console.log('\n')
await Schedule.findAll({
    attributes: [],
    include: {
        model: Teacher,
        required: true,
    },
    where: {
        className: '25448F'
    },
    limit: 1,
}).then((res) => {
    let text = '\n\n\nКто из учителей преподает в заданном классе?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

console.log('\n')
await Schedule.findAll({
    attributes: ['cabinetNumber'],
    where: {
        className: '26604Z',
        day: 'Среда',
        orderNumber: 5
    },
    limit: 1,
}).then((res) => {
    let text = '\n\n\nВ каком кабинете будет 5-й урок в среду у некоторого класса?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

console.log('\n')
await Schedule.findAll({
    attributes: ['className'],
    raw: true,
    include: {
        model: Teacher,
        attributes: [],
        required: true,
        where: {
            lastName: 'Шашков',
            firstName: 'Поликарп',
            patronymic: 'Иосифович'
        },
    },
    where: {
        subjectName: 'Математика'
    },
    limit: 1,
}).then((res) => {
    let text = '\n\n\nВ каких классах преподает заданный предмет заданный учитель?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

// console.log('\n')
// await Schedule.findAll({
//     attributes: ['orderNumber', ['subjectName', 'subject'], ['cabinetNumber', 'cabinet']],
//     include: {
//         model: Teacher,
//         required: true,
//         attributes: [[sequelize.fn('concat', sequelize.col('lastName'), ' ', sequelize.col('firstName'), ' ', sequelize.col('patronymic')), 'teacher' ]]
//     },
//     where: {
//         className: '15737J',
//         day: 'Среда',
//     },
//     order: [['orderNumber', 'ASC']],
//     limit: 1,
// }).then((res) => {
//     let text = '\n\n\nРасписание на заданный день недели для указанного класса?\n'
//     fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
// })

console.log('\n')
await Schedule.findAll({
    attributes: ['orderNumber', 'subjectName', 'cabinetNumber'],
    include: {
        model: Teacher,
        required: true,
    },
    where: {
        className: '15737J',
        day: 'Среда',
    },
    limit: 1,
}).then((res) => {
    let text = '\n\n\nРасписание на заданный день недели для указанного класса?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

console.log('\n')
await Student.count({
    group: 'className',
    where: {
        className: '34243H'
    },
}).then( (res) => {
    let text = '\n\n\nСколько учеников в указанном классе?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

console.timeEnd()


sequelize.close().then(() => console.log('\n\nConnection has been closed successfully.'))

import './completion.js';
import {sequelize} from "../index.js";
import 'fs';
import * as fs from "fs";
import {Schedule, Student, Teacher} from "../models/indexModels.js";


console.log('\n')
await Schedule.findAll({
    attributes: ['subjectName'],
    where: {
        className: '4В',
        day: 'Среда',
        orderNumber: 2
    }
}).then(([res, _]) => {
    let text = 'Какой предмет будет в заданном классе, в заданный день недели на заданном уроке?\n'
    fs.writeFileSync('./queries/result.txt', text + JSON.stringify(res.dataValues, null, 2))
})

console.log('\n')
await Teacher.findAll({
    include: {
        model: Schedule,
        where: {
            className: '4В'
        }
    },
    attributes: [[sequelize.fn('concat', sequelize.col('lastName'), ' ', sequelize.col('firstName'), ' ', sequelize.col('patronymic')), 'teacher' ]]
}).then((res) => {
    let temp = []
    res.forEach( (elem) => {
        temp.push({
            'teacher' : elem.dataValues.teacher,
        })
    })
    let text = '\n\n\nКто из учителей преподает в заданном классе?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(temp, null, 2))
})

console.log('\n')
await Schedule.findAll({
    attributes: [['cabinetNumber', 'cabinet']],
    where: {
        className: '4В',
        day: 'Среда',
        orderNumber: 5
    }
}).then(([res, _]) => {
    let text = '\n\n\nВ каком кабинете будет 5-й урок в среду у некоторого класса?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res.dataValues, null, 2))
})

console.log('\n')
await Schedule.findAll({
    include: {
        model: Teacher,
        where: {
            lastName: 'Иванов',
            firstName: 'Иван',
            patronymic: 'Иванович'
        },
    },
    where: {
        subjectName: 'Математика'
    },
    attributes: [['className', 'class']]
}).then((res) => {
    let temp = []
    let buff = []
    res.forEach( (elem) => {
        temp.push(
            elem.dataValues.class,
        )
    })
    new Set(temp).forEach( (elem) => {
        buff.push({
            'class' : elem
        })
    })
    let text = '\n\n\nВ каких классах преподает заданный предмет заданный учитель?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(buff, null, 2))
})

console.log('\n')
await Schedule.findAll({
    attributes: ['orderNumber', ['subjectName', 'subject'], ['cabinetNumber', 'cabinet']],
    include: {
        model: Teacher,
        attributes: [[sequelize.fn('concat', sequelize.col('lastName'), ' ', sequelize.col('firstName'), ' ', sequelize.col('patronymic')), 'teacher' ]]
    },
    where: {
        className: '4В',
        day: 'Среда',
    },
    order: [['orderNumber', 'ASC']]
}).then((res) => {
    let text = '\n\n\nРасписание на заданный день недели для указанного класса?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res, null, 2))
})

await Student.findAndCountAll({
    where: {
        className: '4В'
    }
}).then( (res) => {
    let text = '\n\n\nСколько учеников в указанном классе?\n'
    fs.appendFileSync('./queries/result.txt', text + JSON.stringify(res.count, null, 2))
})


sequelize.close().then(() => console.log('\n\nConnection has been closed successfully.'))

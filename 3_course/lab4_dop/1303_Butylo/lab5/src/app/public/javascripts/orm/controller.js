const db = require("../models/index.js");

const Student = db.student
const Teacher = db.teacher
const Schedule = db.schedule

class OrmController {

    async getSubject(className, day, orderNumber) {
        const subject = await Schedule.findAll({
            attributes: ['subjectName'],
            where: {
                className: className,
                day: day,
                orderNumber: orderNumber
            },
            limit: 1,
        })

        let text = 'Какой предмет будет в заданном классе, в заданный день недели на заданном уроке?\n'
        return {text: text, answer: JSON.stringify(subject, null, 2)}
    }

    async getTeacher(className) {
        const teacher = await Schedule.findAll({
            attributes: [],
            include: {
                model: Teacher,
                required: true,
            },
            where: {
                className: className
            },
        })

        let text = 'Кто из учителей преподает в заданном классе?\n'
        return {text: text, answer: JSON.stringify(teacher, null, 2)}
    }

    async getCabinetOnW5(className) {
        const cabinet = await Schedule.findAll({
            attributes: ['cabinetNumber'],
            where: {
                className: className,
                day: 'Среда',
                orderNumber: 5
            },
            limit: 1,
        })

        let text = 'В каком кабинете будет 5-й урок в среду у некоторого класса?\n'
        return {text: text, answer: JSON.stringify(cabinet, null, 2)}
    }

    async getClassByTeacher(subjectName, lastName, firstName, patronymic) {
        const className = await Schedule.findAll({
            attributes: ['className'],
            raw: true,
            include: {
                model: Teacher,
                attributes: [],
                required: true,
                where: {
                    lastName: lastName,
                    firstName: firstName,
                    patronymic: patronymic
                },
            },
            where: {
                subjectName: subjectName
            },
            limit: 1,
        })

        let text = '\n\n\nВ каких классах преподает заданный предмет заданный учитель?\n'
        return {text: text, answer: JSON.stringify(className, null, 2)}
    }

    async getSchedule(className, day) {
        const schedule = await Schedule.findAll({
            attributes: ['orderNumber', 'subjectName', 'cabinetNumber'],
            include: {
                model: Teacher,
                required: true,
            },
            where: {
                className: className,
                day: day,
            },
        })

        let text = '\n\n\nРасписание на заданный день недели для указанного класса?\n'
        return {text: text, answer: JSON.stringify(schedule, null, 2)}
    }

    async getCountStudents(className) {
        const count = await Student.count({
            group: 'className',
            where: {
                className: className
            },
        })

        let text = '\n\n\nСколько учеников в указанном классе?\n'
        return {text: text, answer: JSON.stringify(count, null, 2)}
    }
}

const controller = new OrmController()

module.exports = controller
import { Faculty } from "../models/faculty.model";
import { Department } from "../models/department.model";
import { Group } from "../models/group.model";
import { Student } from "../models/student.model";
import { Stream } from "../models/stream.model";
import { Exam } from "../models/exam.model";
import { Subject } from "../models/subject.model";
import { Consultation } from "../models/consultation.model";
import { ExaminationSheet } from "../models/examinationSheet.model";
import { Sequelize } from "sequelize-typescript";
import * as fs from "fs";

let task : String;

export async function makeTasks(sequelize: Sequelize){

    console.time();
    task = 'Список абитуриентов на заданный факультет?\n';
    const res1 = await Student.findAll({
        attributes: [
            'uniqueNumber',
            'lastName',
            'firstName',
            'middleName',
            [Sequelize.col('department.faculty.name'), 'facultyName']
        ],
        include: [{
            model: Department,
            required: true,
            attributes: [],
            include: [{
                model: Faculty,
                required: true,
                attributes: [],
                where: { name: 'ФААААЭ' }
            }]
        }],
        // order: Sequelize.literal('1'),
        limit: 1
    });
    console.timeEnd()
    fs.writeFileSync('taskResult.txt', task + JSON.stringify(res1, null, 2));

    console.time();
    task = '\n\nОценки, полученные указанным абитуриентом?\n'
    const res2 = await ExaminationSheet.findAll({
        attributes: [
            [Sequelize.col('student.lastName'), 'lastName'],
            [Sequelize.col('student.firstName'), 'firstName'],
            [Sequelize.col('student.middleName'), 'middleName'],
            [Sequelize.col('exam.subject.name'), 'subjectName'],
            'grade'
        ],
        raw: true,
        include: [{
            model: Student,
            required: true,
            attributes: [],
            where: {uniqueNumber: 10},
        }, {
            model: Exam,
            required: true,
            attributes: [],
            include: [{
                model: Subject,
                required: true,
                attributes: []
            }]
        }],
        // order: Sequelize.literal('1'),
        limit: 1
    });
    console.timeEnd();
    fs.appendFileSync('taskResult.txt', task + JSON.stringify(res2, null, 2));

    console.time();
    task = '\n\nКогда и в какой аудитории будет консультация и экзамен у заданного абитуриента' + 
        ' по указанному предмету?\n'
    const res3 = await Student.findAll({
        attributes: [
            'uniqueNumber',
            'lastName',
            'firstName',
            'middleName',
            [Sequelize.col('group.stream.exams.subject.name'), 'subjectName'],
            [Sequelize.col('group.stream.exams.date'), 'examDate'],
            [Sequelize.col('group.stream.exams.time'), 'examTime'],
            [Sequelize.col('group.stream.exams.auditorium'), 'examAuditorium'],
            [Sequelize.col('group.stream.exams.consultations.date'), 'consultationDate'],
            [Sequelize.col('group.stream.exams.consultations.time'), 'consultationTime'],
            [Sequelize.col('group.stream.exams.consultations.auditorium'), 'consultationAuditorium'],
        ],
        include: [{
            attributes: [],
            required: true,
            model: Group,
            include: [{
                attributes: [],
                required: true,
                model: Stream,
                include: [{
                    attributes: [],
                    required: true,
                    model: Exam,
                    include: [{
                        attributes: [],
                        required: true,
                        model: Subject,
                        where: { name: 'where' },
                    }, {
                        attributes: [],
                        required: true,
                        model: Consultation
                    }]
                }]
            }]
        }],
        where: { uniqueNumber: 10 },
        // order: Sequelize.literal('1'),
        limit: 1,
        subQuery: false
    });
    console.timeEnd();
    fs.appendFileSync('taskResult.txt', task + JSON.stringify(res3, null, 2));

    console.time();
    task = '\n\nГде, когда и по каким предметам будут проходить экзамены у заданной группы?\n'
    const res4 = await Group.findAll({
        attributes: [
            'groupNumber',
            [Sequelize.col('stream.exams.subject.name'), 'subjectName'],
            [Sequelize.col('stream.exams.date'), 'date'],
            [Sequelize.col('stream.exams.time'), 'time'],
            [Sequelize.col('stream.exams.auditorium'), 'auditorium']
        ],
        raw: true,
        where: { groupNumber: 50 },
        include: [{
            attributes: [],
            model: Stream,
            include: [{
                attributes: [],
                model: Exam,
                include: [{
                    attributes: [],
                    model: Subject
                }]
            }]
        }],
        // order: Sequelize.literal('1'),
        limit: 1,
        subQuery: false
    });
    console.timeEnd();
    fs.appendFileSync('taskResult.txt', task + JSON.stringify(res4, null, 2));

    console.time();
    task = '\n\nКонкурс на каждый факультет?\n'
    const res5 = await Student.findAll({
        attributes: [
            [Sequelize.col('department.faculty.name'), 'facultyName'],
            [Sequelize.fn('COUNT', Sequelize.col('uniqueNumber')), 'competition']
        ],
        include: [{
            attributes: [],
            model: Department,
            include: [{
                attributes: [],
                model: Faculty,
            }]
        }],
        group: [Sequelize.col('department.faculty.name')],
        raw: true,
        // order: Sequelize.literal('1'),
        limit: 1
    });
    console.timeEnd();
    fs.appendFileSync('taskResult.txt', task + JSON.stringify(res5, null, 2));

    console.time();
    task = '\n\nСредний балл по каждому предмету на каждом факультете?\n'
    const res6 = await Student.findAll({
        attributes: [
            [Sequelize.col('department.faculty.name'), 'facultyName'],
            [Sequelize.col('examinationSheets.exam.subject.name'), 'subjectName'],
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('examinationSheets.grade')), 2), 'averageScore']
        ],
        raw: true,
        include: [{
            attributes: [],
            model: Department,
            include: [{
                attributes: [],
                model: Faculty
            }]
        }, {
            attributes: [],
            model: ExaminationSheet,
            include: [{
                attributes: [],
                model: Exam,
                include: [{
                    attributes: [],
                    model: Subject
                }]
            }]
        }],
        group: ['facultyName', 'subjectName'],
        // order: Sequelize.literal('1'),
        limit: 1,
        subQuery: false
    });
    console.timeEnd();
    fs.appendFileSync('taskResult.txt', task + JSON.stringify(res6, null, 2))
}
import { sequelize } from './config/database.js';
import {doctor} from './models/doctor.js';
import {hospital} from './models/hospital.js';
import {mainer} from './models/mainer.js';
import {note} from './models/note.js';
import {patientCard} from './models/patient_card.js';
import {doctorInHospital} from './models/doctor_in_hospital.js';
import {doctorDismissal} from './models/doctor_dismissal.js';
import {noteInCard} from './models/note_in_card.js';
import {registrationWorker}  from './models/registration_worker.js';
import {Sequelize} from "sequelize";
import * as fs from "fs";

const amount=100000;
const doctorsData = JSON.parse(fs.readFileSync('./data/doctors.json', 'utf-8'));
const notesData = JSON.parse(fs.readFileSync('./data/notes.json', 'utf-8'));
const patientCards = JSON.parse(fs.readFileSync('./data/patientCards.json', 'utf-8'));

const doctorsNew = doctorsData.slice(0, amount);
const notesNew = notesData.slice(0, amount);
const patientsNew = patientCards.slice(0, amount);

export async function fill() {
    try {

        doctor.hasMany(note, {foreignKey: 'id_doctor'});
        note.belongsTo(doctor, { foreignKey: 'id_doctor'});

        doctor.hasMany(patientCard, {foreignKey: 'id_doctor'});
        patientCard.belongsTo(doctor, { foreignKey: 'id_doctor'});

        patientCard.hasMany(noteInCard, { foreignKey: 'id_card', sourceKey: 'id_card' });
        noteInCard.belongsTo(patientCard, { foreignKey: 'id_card', targetKey: 'id_card' });

        noteInCard.belongsTo(note, { foreignKey: 'id_note', targetKey: 'id_note' });
        note.hasMany(noteInCard, { foreignKey: 'id_note', sourceKey: 'id_note'});

        await doctor.bulkCreate(doctorsNew, {logging: false});

        let array = createArray(amount);

        await hospital.bulkCreate(
            array.map((num) => ({
                hospital_number: num,
            }))
            , {logging: false});

        await mainer.bulkCreate(
            array.map((num) => ({
                id_mainer: num,
            }))
            , {logging: false});

        await doctorInHospital.bulkCreate(
            array.map((num) => ({
                hospital_number: num,
                id_doctor: num
            }))
            , {logging: false});

        await doctorDismissal.bulkCreate(
            array.map((num) => ({
                id_mainer: num,
                id_doctor: num
            }))
            , {logging: false});

        await note.bulkCreate(notesNew, {logging: false});

        await patientCard.bulkCreate(patientsNew, {logging: false});

        await noteInCard.bulkCreate(
            array.map((num) => ({
                id_card: num,
                id_note: num
            }))
            , {logging: false});

        await registrationWorker.bulkCreate(
            array.map((num) => ({
                id_reg_worker: num,
                id_doctor: num
            }))
            , {logging: false});

        console.log('Заполнение успешно');
    }catch (error) {
        console.error('Ошибка при заполнении:', error);
    }
}

async function tasks() {

    //1
    noteInCard.findAll({
        attributes: [],
        include: [
            {
                model: patientCard,
                attributes: [['address', 'Адрес'],
                [sequelize.literal('"note"."visit_date"'), 'Дата_последнего_посещения'],
                [sequelize.literal('"note"."diagnose"'), 'Диагноз'],
                ],
                where: {
                    SNILS: 123454789,
                },
            },
            {
                model: note,
                attributes: [],
            },
        ],
        order: [[sequelize.literal('visit_date'), 'DESC']],
        limit: 1,
    }, {logging: false}).then((res) => {
        // console.log("\n\nАдрес, дата последнего посещения и диагноз:\n", JSON.stringify(res, null, 2), "\n");
    });


    //2

     patientCard.findAll({
        attributes: [],
        where: {id_card: 4},
        include: {
            model: doctor,
            attributes: ['surname', 'first_name', 'second_name'],
        },
         limit: 1,
    }, {logging: false}).then((res) => {
         // console.log('Врач:', JSON.stringify(res, null, 2));
     });



    //3

    doctor.findOne({
        attributes: ['cabinet', 'visitors_day', 'visitors_hour', 'end_day'],
        where: { id_doctor: 1 },
    }, {logging: false}).then((res) => {
        // console.log("\n\nНомер кабинета, дни и часы приема врача 1:\n", JSON.stringify(res, null, 2), "\n");
    });

    //4

    noteInCard.findAll({
        attributes: [],
        include: [
            {
                model: patientCard,
                attributes: [['second_name', 'Имя_пациента'],
                    ['first_name', 'Фамилия_пациента'],],
            },
            {
                model: note,
                attributes: [],
                where: {
                    id_doctor: 2,
                    sick_list: true,
                },
            },
        ],
        limit: 1,
    }, {logging: false}).then((res) => {
        // console.log(`Активные больные:`, JSON.stringify(res, null, 2), "\n");
    });

    //5

    doctor.findAll({
        attributes: [
            ['first_name', 'Имя_врача'],
            ['surname', 'Фамилия_врача'],
            [sequelize.literal('"notes"."appointment"'), 'Назначение'],
            [sequelize.literal('"notes"."diagnose"'), 'Диагноз'],
        ],
        include: [
            {
                model: note,
                attributes: [],
                where: {
                    diagnose: 'ОРЗ',
                },
            },
        ],
    }, {logging: false}).then((res) => {
            // console.log(`Назначения при ОРЗ:`, JSON.stringify(res, null, 2), "\n");
        });


    //6

    doctor.findAll({
        attributes: [['first_name', 'Имя_врача'],
                    ['second_name', 'Фамилия_врача'],
                    ],
        where: {
            cabinet: 23,
            visitors_day: 'Понедельник',
            visitors_hour: {
                [Sequelize.Op.lte]: '13:00',
            },
            end_day: {
                [Sequelize.Op.gte]: '14:00',
            },
        },
        limit: 1,
    }, {logging: false}).then((res) => {
        // console.log(`Доктор, работающий в кабинете 23:`, JSON.stringify(res, null, 2), "\n");
    });

    //7
    noteInCard.findAll({
        attributes: [[Sequelize.fn('COUNT', Sequelize.literal('*')), 'Количество_посещений'],],
        include: [
            {
                model: patientCard,
                attributes: [['second_name', 'Имя'],
                    ['first_name', 'Фамилия'],
                    ['surname', 'Отчество'],],
            },
            {
                model: note,
                attributes: [],
                where: {
                    visit_date: {
                        [Sequelize.Op.gte]: '15.10.2023'
                    },
                },
            },
        ],
        where: {
            id_card: 1,
        },
        group: ['patientCard.id_card'],
        limit: 1,
    }, {logging: false}).then((res) => {
        // console.log(`Больной обращался в поликлинику столько раз:`, JSON.stringify(res, null, 2), "\n");
    });

    //8
    doctor.findAll({
        attributes: [
            ['first_name', 'Имя_врача'],
            ['surname', 'Фамилия_врача'],
            [Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('notes.id_note')), 0), 'Количество_пациентов']
        ],
        include: [
            {
                model: note,
                attributes: [],
                where: {
                    visit_date: {
                        [Sequelize.Op.gte]: '15.10.2023'
                    }
                },
                required: false,
            },
        ],
        group: ['doctor.id_doctor', 'Имя_врача', 'Фамилия_врача'],
    }, {logging: false}).then((res) => {
        // console.log(`Сколько пациентов принял каждый врач за месяц:`,JSON.stringify(res, null, 2), "\n");
    });

}

function createArray(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
}

try {
    await sequelize.authenticate();
    console.log('Success.');

    await sequelize.sync({force: true, logging: false});
    await fill();
    console.time();
    await tasks();
    console.timeEnd();

    // await sequelize.close()
    //     .then(() => console.log('Connection closed successfully.'));
} catch (e) {
    console.error('Failed: ', e);
}
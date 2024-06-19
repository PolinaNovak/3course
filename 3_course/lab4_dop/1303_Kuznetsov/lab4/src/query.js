import sequelize from "./index.js";
import Department from "./objects/department.js";
import Faculty from "./objects/faculty.js";
import Telephone from "./objects/telephone.js";
import Specialization from "./objects/specialization.js";
import DisciplineSpecialization from "./objects/discipline_specialization.js";
import Discipline from "./objects/discipline.js";
import {col, fn, literal, Op, QueryTypes} from 'sequelize';
import generateDiscipline from "./faker/discipline.js";
import generateSpecialization from "./faker/spec.js";
import faker from "faker";
import specialization from "./objects/specialization.js";
import faculty from "./objects/faculty.js";
import generateDepartment from "./faker/department.js";
import generateFaculty from "./faker/faculty.js";
import generateTelephones from "./faker/telephone.js";
const N = 100000

try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно установлено.');

    await sequelize.sync({force: true});

    set_connections()
        .then(() => {
            console.log("Связи заданы")
            fill_tables()
                .then(() => {
                    console.log("Таблицы заполнены")
                    console.time('requests');
                    requires()
                        .then(() => {
                            console.timeEnd('requests');
                            console.log("Запросы выполнены")
                        })
            })
        })


} catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
}

async function set_connections(){
    await Department.belongsTo(Faculty, {foreignKey: 'faculty_id'});
    await Faculty.hasMany(Department, {foreignKey: 'faculty_id'});

    await Telephone.belongsTo(Department, {foreignKey: 'dep_id'});
    await Department.hasMany(Telephone, {foreignKey: 'dep_id'});

    await Specialization.belongsTo(Department, {foreignKey: 'dep_id'});
    await Department.hasMany(Specialization, {foreignKey: 'dep_id'});

    await DisciplineSpecialization.belongsTo(Specialization, {foreignKey: 'specialization_id'});
    await Specialization.hasMany(DisciplineSpecialization, {foreignKey: 'specialization_id'});

    await DisciplineSpecialization.belongsTo(Discipline, {foreignKey: 'discipline_id'});
    await Discipline.hasMany(DisciplineSpecialization, {foreignKey: 'discipline_id'});
}

async function fill_tables(){
    await Faculty.bulkCreate(generateFaculty(N));

    await Department.bulkCreate(generateDepartment(N));

    await Telephone.bulkCreate(generateTelephones(N));
    
    await Specialization.bulkCreate(generateSpecialization(N))

    await Discipline.bulkCreate(generateDiscipline(N));

    const disciplineSpecializationData = []
    for(let i = 1; i < N+1; i++){
        disciplineSpecializationData.push({ discipline_id: faker.datatype.number({ min: 1, max: N }), specialization_id: faker.datatype.number({ min: 1, max: N }) })
    }

    await DisciplineSpecialization.bulkCreate(disciplineSpecializationData);
}

async function requires(){
    await Discipline.findAll({
        attributes: ['discipline_name'],
        where: {
            semesters: {[Op.gt]: 1}
        },
        limit: 1,
    })
    console.log('\n', "1) Названия дисциплин, которые читаются более одного семестра?")


    await sequelize.query('' +
        'SELECT SUM(discipline.lab_hours) AS "lab_hours", department.name\n' +
        'FROM discipline\n' +
        '    JOIN discipline_specialization on discipline.discipline_id = discipline_specialization.discipline_id\n' +
        '    JOIN specialization on discipline_specialization.specialization_id = specialization.specialization_id\n' +
        '    JOIN department on specialization.dep_id = department.dep_id\n' +
        'GROUP BY department.name\n' +
        //'ORDER BY department.name\n' +
        'LIMIT 1\n',
        {type: QueryTypes.SELECT}
    )
    console.log('\n', '2) Общее количество часов, отводимых на лабораторные работы в одном из семестров, проведение которых обеспечивает определенная кафедра?');


    await Discipline.findAll({
        attributes: ["discipline_name"],
        where: {lab_hours: {[Op.gt]: 0}},
        limit: 1,
        include: [{
            model: DisciplineSpecialization,
            attributes: [],
            include: [{
                model: Specialization,
                include: [{
                    model: Department,
                    include: [{
                        model: Faculty,
                    }]
                }]
            }]
        }],
    })
    console.log('\n', "3) Название дисциплин, по которым проводятся лабораторные работы на факультете?")

    await sequelize.query(`
        SELECT
        discipline_name,
        ABS(lab_hours - practice_hours) AS difference
    FROM discipline
        JOIN discipline_specialization on discipline.discipline_id = discipline_specialization.discipline_id
        JOIN specialization on discipline_specialization.specialization_id = specialization.specialization_id
        JOIN department on specialization.dep_id = department.dep_id
        JOIN faculty on department.dep_id = faculty.faculty_id
    LIMIT 1
    `    , { type: QueryTypes.SELECT });
    console.log('\n', "4) Разница в часах, отведенных по каждой дисциплине на лабораторные и практические занятия в одном из семестров на заданном факультете?")


    await sequelize.query(`
    SELECT discipline_name 
    FROM discipline
        JOIN discipline_specialization ON discipline.discipline_id = discipline_specialization.discipline_id
        JOIN specialization on discipline_specialization.specialization_id = specialization.specialization_id
    WHERE cw_hours > 0
    AND specialization.specialization_name IN ('ПИ', 'ПМИ')
    LIMIT 1
    `, {type: QueryTypes.SELECT,});
    console.log('\n', "5) Дисциплины, по которым выполняют курсовые работы студенты указанной специальности?")


    await sequelize.query(`
    SELECT discipline.discipline_name, discipline_specialization.discipline_id, specialization.specialization_name
    FROM discipline
        JOIN discipline_specialization ON discipline.discipline_id = discipline_specialization.discipline_id
        JOIN specialization on discipline_specialization.specialization_id = specialization.specialization_id
    WHERE discipline.discipline_name IN ('WEB-технологии', 'Математический анализ')
    LIMIT 1
    `, {type: QueryTypes.SELECT,});
    console.log('\n', "6) Для каких специальностей читается указанная дисциплина?")


    await sequelize.query(`
    SELECT discipline.discipline_name, specialization.specialization_name, specialization.duration
    FROM discipline
        JOIN discipline_specialization ON discipline.discipline_id = discipline_specialization.discipline_id
        JOIN specialization on discipline_specialization.specialization_id = specialization.specialization_id
    WHERE specialization.specialization_name IN ('ПИ')
    LIMIT 1
    `, {type: QueryTypes.SELECT,});
    console.log('\n', "7) Какое количество дисциплин входит в учебный план подготовки студентов по указанной специальности, и сколько лет осуществляется подготовка?")
}
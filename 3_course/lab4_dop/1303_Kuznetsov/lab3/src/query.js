import sequelize from "./index.js";
import Department from "./objects/department.js";
import Faculty from "./objects/faculty.js";
import Telephone from "./objects/telephone.js";
import Specialization from "./objects/specialization.js";
import DisciplineSpecialization from "./objects/discipline_specialization.js";
import Discipline from "./objects/discipline.js";
import {col, fn, literal, Op, QueryTypes} from 'sequelize';
import specialization from "./objects/specialization.js";
import faculty from "./objects/faculty.js";

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
                    requires()
                        .then(() => {
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
    const facultyData = [
        { faculty_name: 'ФКТИ' },
        { faculty_name: 'ФЭЛ' },
        { faculty_name: 'ФЭА' },
        { faculty_name: 'ФРТ' },
        { faculty_name: 'ИНПРОТЕХ' },
        { faculty_name: 'ГФ' },
    ];
    await Faculty.bulkCreate(facultyData);

    const departmentData = [
        { name: 'МОЭВМ', faculty_id: 1, head_name: 'Иванов И.И.', head_degree: 'Доктор наук', head_rank: 'Профессор' },
        { name: 'МСК', faculty_id: 5, head_name: 'Егорова Е.Е.', head_degree: 'Кандидат наук', head_rank: 'Доцент' },
        { name: 'РЭС', faculty_id: 4, head_name: 'Борисов Б.В.', head_degree: 'Доктор наук', head_rank: 'Профессор' },
        { name: 'МВЭ', faculty_id: 2, head_name: 'Алексеев А.А.', head_degree: 'Кандидат наук', head_rank: 'Доцент' },
        { name: 'САПР', faculty_id: 1, head_name: 'Николаева Е.Н.', head_degree: 'Доктор наук', head_rank: 'Профессор' },
        { name: 'САУ', faculty_id: 3, head_name: 'Иванов М.И.', head_degree: 'Кандидат наук', head_rank: 'Доцент' },
        { name: 'СО', faculty_id: 6, head_name: 'Смирнов С.С.', head_degree: 'Доктор наук', head_rank: 'Профессор' },
    ];
    await Department.bulkCreate(departmentData);

    const telephoneData = [
        { telephone_number: '+7 (111) 111-1111', dep_id: 1 },
        { telephone_number: '+7 (222) 222-2222', dep_id: 2 },
        { telephone_number: '+7 (333) 333-3333', dep_id: 3 },
        { telephone_number: '+7 (444) 444-4444', dep_id: 4 },
        { telephone_number: '+7 (555) 555-5555', dep_id: 5 },
        { telephone_number: '+7 (666) 666-6666', dep_id: 6 },
        { telephone_number: '+7 (777) 777-7777', dep_id: 1 },
        { telephone_number: '+7 (888) 888-8888', dep_id: 2 },
    ];
    await Telephone.bulkCreate(telephoneData);

    const specializationData = [
        { specialization_name: 'ПИ', dep_id: 1, specialization_code: '09.03.04', qualification: 'Бакалавр', duration: 4, study_form: 'Очная' },
        { specialization_name: 'ПМИ', dep_id: 1, specialization_code: '01.04.02', qualification: 'Магистр', duration: 2, study_form: 'Заочная' },
        { specialization_name: 'РПА', dep_id: 2, specialization_code: '2.03.04', qualification: 'Бакалавр', duration: 4, study_form: 'Очно-заочная' },
        { specialization_name: 'ВАП', dep_id: 3, specialization_code: '8.04.05', qualification: 'Магистр', duration: 2, study_form: 'Очная' },
        { specialization_name: 'ВАРВ', dep_id: 4, specialization_code: '6.03.06', qualification: 'Бакалавр', duration: 4, study_form: 'Заочная' },
        { specialization_name: 'ПВК', dep_id: 5, specialization_code: '3.04.03', qualification: 'Магистр', duration: 2, study_form: 'Очно-заочная' },
        { specialization_name: 'АВКП', dep_id: 6, specialization_code: '8.03.09', qualification: 'Бакалавр', duration: 4, study_form: 'Очная' },
        { specialization_name: 'АВ', dep_id: 7, specialization_code: '10.04.00', qualification: 'Магистр', duration: 2, study_form: 'Заочная' },
    ];
    await Specialization.bulkCreate(specializationData);

    const disciplineData = [
        { discipline_name: 'Математический анализ', lection_hours: 40.0, practice_hours: 30.0, lab_hours: 40.0, cw_hours: 50.0, report_type: 'Зачет', semesters: 3 },
        { discipline_name: 'Физика', lection_hours: 35.0, practice_hours: 25.0, lab_hours: 0, cw_hours: 55.0, report_type: 'Экзамен', semesters: 2 },
        { discipline_name: 'Теория электрических цепей', lection_hours: 45.0, practice_hours: 25.0, lab_hours: 30.0, cw_hours: 60.0, report_type: 'Зачет', semesters: 1 },
        { discipline_name: 'Программирование на C++', lection_hours: 30.0, practice_hours: 20.0, lab_hours: 40.0, cw_hours: 0, report_type: 'Диф. зачет', semesters: 2 },
        { discipline_name: 'Инженерная графика', lection_hours: 20.0, practice_hours: 25.0, lab_hours: 35.0, cw_hours: 80.0, report_type: 'Экзамен', semesters: 1 },
        { discipline_name: 'Электроника и микроэлектроника', lection_hours: 50.0, practice_hours: 15.0, lab_hours: 35.0, cw_hours: 60.0, report_type: 'Зачет', semesters: 1 },
        { discipline_name: 'Механика сплошных сред', lection_hours: 40.0, practice_hours: 20.0, lab_hours: 50.0, cw_hours: 0, report_type: 'Экзамен', semesters: 1 },
        { discipline_name: 'Основы автоматизации и управления', lection_hours: 20.0, practice_hours: 15.0, lab_hours: 30.0, cw_hours: 95.0, report_type: 'Диф. зачет', semesters: 1 },
        { discipline_name: 'Базы данных', lection_hours: 20.0, practice_hours: 15.0, lab_hours: 30.0, cw_hours: 0, report_type: 'Диф. зачет', semesters: 1 },
        { discipline_name: 'WEB-технологии', lection_hours: 50.0, practice_hours: 15.0, lab_hours: 35.0, cw_hours: 60.0, report_type: 'Диф. зачет', semesters: 1 },
    ];
    await Discipline.bulkCreate(disciplineData);

    const disciplineSpecializationData = [
        { discipline_id: 1, specialization_id: 1 },
        { discipline_id: 2, specialization_id: 2 },
        { discipline_id: 3, specialization_id: 6 },
        { discipline_id: 4, specialization_id: 8 },
        { discipline_id: 5, specialization_id: 3 },
        { discipline_id: 6, specialization_id: 4 },
        { discipline_id: 7, specialization_id: 7 },
        { discipline_id: 8, specialization_id: 5 },
        { discipline_id: 9, specialization_id: 1 },
        { discipline_id: 10, specialization_id: 2 },
    ];
    await DisciplineSpecialization.bulkCreate(disciplineSpecializationData);
}

async function requires(){
    Discipline.findAll({
        attributes: ['discipline_name'],
        where: {
            semesters: {[Op.gt]: 1}
        },
    })
        .then((res) => {
        console.log('\n', "1) Названия дисциплин, которые читаются более одного семестра?")
        console.log(JSON.stringify(res, null, 2), "\n")
        })

    sequelize.query('' +
        'SELECT SUM(discipline.lab_hours) AS "lab_hours", department.name\n' +
        'FROM discipline\n' +
        '    JOIN discipline_specialization on discipline.discipline_id = discipline_specialization.discipline_id\n' +
        '    JOIN specialization on discipline_specialization.specialization_id = specialization.specialization_id\n' +
        '    JOIN department on specialization.dep_id = department.dep_id\n' +
        'GROUP BY department.name\n',
        {type: QueryTypes.SELECT}
    )
        .then(res => {
            console.log('\n', '2) Общее количество часов, отводимых на лабораторные работы в одном из семестров, проведение которых обеспечивает определенная кафедра?');
            console.log(JSON.stringify(res, null, 2), "\n")
        })

    Discipline.findAll({
        attributes: ["discipline_name"],
        where: {lab_hours: {[Op.gt]: 0}},
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
        }]
    })
        .then((res) => {
            console.log('\n', "3) Название дисциплин, по которым проводятся лабораторные работы на факультете?")
            console.log(JSON.stringify(res, null, 2), "\n")
        })

    Discipline.findAll({
        attributes: ["discipline_name", [fn('ABS', sequelize.literal('lab_hours - practice_hours')), 'difference']],
        include: [{
            attributes: [],
            model: DisciplineSpecialization,
            required: true,
            include: [{
                model: Specialization,
                required: true,
                include: [{
                    model: Department,
                    required: true,
                    include: [{
                        model: Faculty,
                        where: {faculty_name: {[Op.like]: "ФКТИ"}},
                    }]
                }]
            }]
        }]
    })
        .then((res) => {
            console.log('\n', "4) Разница в часах, отведенных по каждой дисциплине на лабораторные и практические занятия в одном из семестров на заданном факультете?")
            console.log(JSON.stringify(res, null, 2), "\n")
        })

    Discipline.findAll({
        attributes: ["discipline_name"],
        where: {
            cw_hours: { [Op.gt]: 0 },
        },
        include: [{
            attributes: [],
            required: true,
            model: DisciplineSpecialization,
            include: [{
                model: Specialization,
                required: true,
                where: {
                    specialization_name: {[Op.in]: ['ПИ', 'ПМИ'] },
                },
            }]
        }]
    })
        .then((res) => {
            console.log('\n', "5) Дисциплины, по которым выполняют курсовые работы студенты указанной специальности?")
            console.log(JSON.stringify(res, null, 2), "\n")
        })

    Discipline.findAll({
        attributes: ["discipline_name"],
        where: {
            discipline_name: {[Op.in]: ['WEB-технологии', 'Математический анализ'] },
        },
        include: [{
            attributes: ["id"],
            model: DisciplineSpecialization,
            include: [{
                model: Specialization,
                attributes: ["specialization_name"],
            }]
        }]
    })
        .then((res) => {
            console.log('\n', "6) Для каких специальностей читается указанная дисциплина?")
            console.log(JSON.stringify(res, null, 2), "\n")
        })

    Discipline.findAll({
        attributes: ["discipline_name"],
        include: [{
            model: DisciplineSpecialization,
            attributes: ["id"],
            required: true,
            include: [{
                model: Specialization,
                required: true,
                where: {
                    specialization_name: {[Op.in]: ['ПИ']},
                },
                attributes: ["specialization_name", "duration"],
            }]
        }]
    })
        .then((res) => {
            console.log('\n', "7) Какое количество дисциплин входит в учебный план подготовки студентов по указанной специальности, и сколько лет осуществляется подготовка?")
            console.log(JSON.stringify(res, null, 2), "\n")
        })
}

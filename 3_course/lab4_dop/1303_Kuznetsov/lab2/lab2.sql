DROP TABLE IF EXISTS faculty, department, discipline,
    specialization, telephone, discipline_specialization;
DROP TYPE IF EXISTS ranks, degrees, study_forms, report_types, qualifications;

CREATE TYPE degrees AS ENUM ('Кандидат наук', 'Доктор наук');
CREATE TYPE ranks AS ENUM ('Доцент', 'Профессор');
CREATE TYPE study_forms AS ENUM ('Очная', 'Заочная', 'Очно-заочная');
CREATE TYPE report_types AS ENUM ('Зачет', 'Экзамен', 'Диф. зачет');
CREATE TYPE qualifications AS ENUM ('Бакалавар', 'Магистр');

CREATE TABLE faculty(
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(70) NOT NULL
);

CREATE TABLE department(
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(70),
    faculty_id INTEGER REFERENCES faculty(faculty_id),
    head_name VARCHAR(70),
    head_degree degrees,
    head_rank ranks
);

CREATE TABLE telephone(
    telephone_id SERIAL PRIMARY KEY,
    telephone_number VARCHAR(20),
    department_id INTEGER REFERENCES department(department_id)
);

CREATE TABLE specialization(
    specialization_id SERIAL PRIMARY KEY,
    specialization_name VARCHAR(70),
    department_id INTEGER REFERENCES department(department_id),
    specialization_code VARCHAR(20),
    qualification VARCHAR(70),
    duration DECIMAL(3, 2),
    study_form study_forms
);

CREATE TABLE discipline(
    discipline_id SERIAL PRIMARY KEY,
    discipline_name VARCHAR(70),
    semesters INTEGER,
    lection_hours DECIMAL(3,1),
    practice_hours DECIMAL(3,1),
    lab_hours DECIMAL(3,1),
    cw_hours DECIMAL(3,1),
    report_type report_types
);

CREATE TABLE discipline_specialization(
    discipline_id INTEGER REFERENCES discipline(discipline_id),
    specialization_id INTEGER REFERENCES specialization(specialization_id)
);

INSERT INTO faculty (faculty_name)
    VALUES
    ('ФКТИ'),
    ('ФЭЛ'),
    ('ФЭА'),
    ('ФРТ'),
    ('ИНПРОТЕХ'),
    ('ГФ');

INSERT INTO department (department_name, faculty_id, head_name, head_degree, head_rank)
    VALUES
    ('МОЭВМ', 1, 'Иванов И.И.', 'Доктор наук', 'Профессор'),
    ('МСК', 5, 'Егорова Е.Е.', 'Кандидат наук', 'Доцент'),
    ('РЭС', 4, 'Борисов Б.В.', 'Доктор наук', 'Профессор'),
    ('МВЭ', 2, 'Алексеев А.А.', 'Кандидат наук', 'Доцент'),
    ('САПР', 1, 'Николаева Е.Н.', 'Доктор наук', 'Профессор'),
    ('САУ', 3, 'Иванов М.И.', 'Кандидат наук', 'Доцент'),
    ('СО', 6, 'Смирнов С.С.', 'Доктор наук', 'Профессор');

INSERT INTO telephone(telephone_number, department_id)
    VALUES
    ('+7 (111) 111-1111', 1),
    ('+7 (222) 222-2222', 2),
    ('+7 (333) 333-3333', 3),
    ('+7 (444) 444-4444', 4),
    ('+7 (555) 555-5555', 5),
    ('+7 (666) 666-6666', 6),
    ('+7 (777) 777-7777', 1),
    ('+7 (888) 888-8888', 2);

INSERT INTO specialization(specialization_name, department_id, specialization_code,
                           qualification, duration, study_form)
    VALUES
        ('ПИ', 1, '09.03.04', 'Бакалавр', 4, 'Очная'),
        ('ПМИ', 1, '01.04.02', 'Магистр', 2, 'Заочная'),
        ('РПА', 2, '2.03.04', 'Бакалавр', 4, 'Очно-заочная'),
        ('ВАП', 3, '8.04.05', 'Магистр', 2, 'Очная'),
        ('ВАРВ', 4, '6.03.06', 'Бакалавр', 4, 'Заочная'),
        ('ПВК', 5, '3.04.03', 'Магистр', 2, 'Очно-заочная'),
        ('АВКП', 6, '8.03.09', 'Бакалавр', 4, 'Очная'),
        ('АВ', 7, '10.04.00', 'Магистр', 2, 'Заочная');

INSERT INTO discipline(discipline_name, lection_hours,
                       practice_hours, lab_hours, cw_hours, report_type, semesters)
    VALUES
    ('Математический анализ', 40.0, 30.0, 40.0, 50.0, 'Зачет', 3),
    ('Физика', 35.0, 25.0, 0, 55.0, 'Экзамен', 2),
    ('Теория электрических цепей', 45.0, 25.0, 30.0, 60.0, 'Зачет', 1),
    ('Программирование на C++', 30.0, 20.0, 40.0, 0, 'Диф. зачет', 2),
    ('Инженерная графика', 20.0, 25.0, 35.0, 80.0, 'Экзамен', 1),
    ('Электроника и микроэлектроника', 50.0, 15.0, 35.0, 60.0, 'Зачет', 1),
    ('Механика сплошных сред', 40.0, 20.0, 50.0, 0, 'Экзамен', 1),
    ('Основы автоматизации и управления', 20.0, 15.0, 30.0, 95.0, 'Диф. зачет', 1),
    ('Базы данных', 20.0, 15.0, 30.0, 0, 'Диф. зачет', 1),
    ('WEB-технологии', 50.0, 15.0, 35.0, 60.0, 'Диф. зачет', 1);

INSERT INTO discipline_specialization(discipline_id, specialization_id)
    VALUES
    (1, 1),
    (2, 2),
    (3, 6),
    (4, 8),
    (5, 3),
    (6, 4),
    (7, 7),
    (8, 5),
    (9, 1),
    (10, 2);

--Названия дисциплин, которые читаются более одного семестра?
SELECT discipline_name
FROM discipline
WHERE semesters > 1;


--Общее количество часов, отводимых на лабораторные работы в одном из семестров, проведение которых обеспечивает определенная кафедра?
SELECT SUM(discipline.lab_hours) AS "lab_hours", department.department_name
FROM discipline
        JOIN discipline_specialization USING(discipline_id)
        JOIN specialization USING(specialization_id)
        JOIN department USING(department_id)
GROUP BY department.department_name;

--Название дисциплин, по которым проводятся лабораторные работы на факультете?
SELECT faculty.faculty_name, discipline.discipline_name
FROM discipline
        JOIN discipline_specialization USING(discipline_id)
        JOIN specialization USING(specialization_id)
        JOIN department USING(department_id)
        JOIN faculty USING(faculty_id)
WHERE discipline.lab_hours > 0;

--Разница в часах, отведенных по каждой дисциплине на лабораторные и практические занятия в одном из семестров на заданном факультете?
SELECT faculty.faculty_name, discipline.discipline_name,
       ABS(discipline.lab_hours - discipline.practice_hours) AS "Разница"
FROM discipline
        JOIN discipline_specialization USING(discipline_id)
        JOIN specialization USING(specialization_id)
        JOIN department USING(department_id)
        JOIN faculty USING(faculty_id);

--Дисциплины, по которым выполняют курсовые работы студенты указанной специальности?
SELECT specialization.specialization_name, discipline.discipline_name
FROM discipline
        JOIN discipline_specialization USING(discipline_id)
        JOIN specialization USING(specialization_id)
WHERE cw_hours > 0 AND
      specialization.specialization_name IN ('ПИ', 'ПМИ');

--Для каких специальностей читается указанная дисциплина?
SELECT specialization.specialization_name, discipline.discipline_name
FROM discipline
        JOIN discipline_specialization USING(discipline_id)
        JOIN specialization USING(specialization_id)
WHERE discipline.discipline_name LIKE 'WEB-технологии'
  OR discipline.discipline_name LIKE 'Математический анализ';

--Какое количество дисциплин входит в учебный план подготовки студентов по указанной специальности, и сколько лет осуществляется подготовка?
SELECT specialization.specialization_name AS "Специальность", COUNT(discipline.discipline_name) AS "Количество",
       specialization.duration AS "Срок обучения"
FROM discipline
        JOIN discipline_specialization USING(discipline_id)
        JOIN specialization USING(specialization_id)
GROUP BY specialization.specialization_name, specialization.duration
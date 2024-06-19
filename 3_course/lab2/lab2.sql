CREATE TABLE doctor
(
    id_doctor       INTEGER PRIMARY KEY,
    first_name      TEXT not null,
    second_name     TEXT not null,
    surname         TEXT not null,
    category        TEXT not null,
    experience      INTEGER,
    date_of_birth   DATE,
    visitors_day    TEXT not null,
    visitors_hour   TEXT not null,
    cabinet         INTEGER,
  	end_day			TEXT not null
);

INSERT INTO doctor
    (id_doctor, first_name, second_name, surname, category, experience, date_of_birth, visitors_day, visitors_hour, cabinet, end_day)
VALUES (1, 'Ольга', 'Филевская', 'Алексеевна', 'Акушер', 2, '2000-03-12', 'Понедельник', '13:00', 23, '15:00'),
       (2, 'Алина', 'Филевская', 'Алексеевна', 'Акушер', 2, '2000-03-12', 'Вторник', '14:00', 24, '16:00'),
       (3, 'Олекса', 'Филевская', 'Алексеевна', 'Акушер', 2, '2000-03-12', 'Понедельник', '13:00', 25, '15:00'),
       (4, 'Алевтина', 'Филевская', 'Алексеевна', 'Акушер', 2, '2000-03-12', 'Среда', '13:00', 26, '19:00'),
       (5, 'Анастасия', 'Филевская', 'Алексеевна', 'Акушер', 2, '2000-03-12', 'Пятница', '15:00', 27, '20:00'),
       (6, 'Елена', 'Филевская', 'Алексеевна', 'Акушер', 2, '2000-03-12', 'Понедельник', '13:00', 28, '19:00');

CREATE TABLE hospital
(
    hospital_number INTEGER PRIMARY KEY 
);

INSERT INTO hospital
    (hospital_number)
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6);

CREATE TABLE mainer
(
    id_mainer       INTEGER PRIMARY KEY
);

INSERT INTO mainer
    (id_mainer)
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6);

CREATE TABLE doctor_in_hospital
(
    hospital_number INTEGER,
    id_doctor INTEGER,
    PRIMARY KEY (hospital_number, id_doctor),

    CONSTRAINT composite_foreign_key
    FOREIGN KEY (hospital_number) REFERENCES hospital (hospital_number),
    FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
);

INSERT INTO doctor_in_hospital
    (hospital_number, id_doctor)
VALUES (1, 2),
       (2, 3),
       (3, 5),
       (4, 4),
       (5, 6),
       (6, 1);

CREATE TABLE doctor_dismissal
(
    id_mainer INTEGER,
    id_doctor INTEGER,
    PRIMARY KEY (id_mainer, id_doctor),

    CONSTRAINT composite_foreign_key1
    FOREIGN KEY (id_mainer) REFERENCES mainer (id_mainer),
    FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
);

INSERT INTO doctor_dismissal
    (id_mainer, id_doctor)
VALUES (1, 3),
       (2, 4),
       (4, 1),
       (3, 6),
       (6, 2);

CREATE TABLE patient_card
(
    id_card         INTEGER PRIMARY KEY,
    SNILS           INTEGER,
    first_name      TEXT not null,
    second_name     TEXT not null,
    surname         TEXT not null,
    address         TEXT not null,
    sex             TEXT not null,
    age             INTEGER,
    id_mainer       SMALLINT not null REFERENCES mainer (id_mainer) ON DELETE CASCADE,
    id_doctor       SMALLINT not null REFERENCES doctor (id_doctor) ON DELETE CASCADE
);

INSERT INTO patient_card
    (id_card, SNILS, first_name, second_name, surname, address, sex, age, id_mainer, id_doctor)
VALUES (1, 123454789, 'Авьгинья','Александра', 'Александровна', 'Торжковская 15', 'Женский', 28, 1, 2),
       (2, 123356789, 'Шмек','Полина', 'Игоревна', 'Торжковская 16', 'Женский', 35, 2, 4),
       (3, 123459789, 'Чон','Алёна', 'Алексеевна', 'Торжковская 17', 'Женский', 48, 3, 1),
       (4, 123456779, 'Хачмеле','Олег', 'Романович', 'Торжковская 18', 'Мужской', 18, 4, 5),
       (5, 123456700, 'Рожовская','Роман', 'Олегович', 'Торжковская 19', 'Мужской', 19, 5, 6),
       (6, 123406789, 'Дубен','Егор', 'Никитич', 'Торжковская 20', 'Мужской', 25, 6, 3);

CREATE TABLE note
(
    id_note         INTEGER PRIMARY KEY,
    visit_date      TEXT not null,
    complaint       TEXT not null,
    diagnose        TEXT not null,
    appointment     TEXT not null,
    sick_list       BOOLEAN,
    term            TEXT not null,
    completion_date TEXT not null,
    id_doctor       SMALLINT not null REFERENCES doctor (id_doctor) ON DELETE CASCADE

);

INSERT INTO note
    (id_note, visit_date, complaint, diagnose, appointment, sick_list, term, completion_date, id_doctor)
VALUES (1, '12.03.2022', 'Плохое самочувствие', 'ОРЗ', 'Супрастин', true, '12.03.2024', '12.03.2022', 3),
       (2, '15.03.2022', 'Отсуствие запаха', 'ОРВИ', 'Флюрография', true, '26.12.2024', '15.03.2022', 5),
       (3, '21.03.2022', 'Плохое самочувствие', 'ОРВИ', 'Иммунал', true, '30.03.2024', '14.03.2022', 4),
       (4, '13.03.2022', 'Плохое самочувствие', 'ОРЗ', 'Витамин С', true, '20.12.2024', '13.03.2022', 1),
       (5, '16.03.2022', 'Онемение ноги', 'Анемия', 'Пройти обследование', true, '30.03.2024', '16.03.2022', 2),
       (6, '17.03.2022', 'Плохое самочувствие', 'ОРЗ', 'Витамин С', true, '25.03.2024', '17.03.2022', 6);

CREATE TABLE note_in_card
(
    id_card       INTEGER not null REFERENCES patient_card (id_card),
    id_note       INTEGER PRIMARY KEY
);

INSERT INTO note_in_card
    (id_card, id_note)
VALUES (1, 2),
       (5, 3),
       (3, 1),
       (2, 5),
       (5, 6),
       (6, 4);

CREATE TABLE registration_worker
(
    id_reg_worker INTEGER PRIMARY KEY,
    id_doctor     SMALLINT not null REFERENCES doctor (id_doctor) ON DELETE CASCADE
);

INSERT INTO registration_worker
    (id_reg_worker, id_doctor)
VALUES (1, 2),
       (2, 3),
       (3, 1),
       (4, 5),
       (5, 6),
       (6, 4);


-- 1 вопрос
WITH LastVisit AS (
    SELECT
        pc.address AS Адрес,
        n.visit_date AS Дата_последнего_посещения,
        n.diagnose AS Диагноз
    FROM patient_card AS pc
    INNER JOIN note_in_card AS nic ON pc.id_card = nic.id_card
    INNER JOIN note AS n ON nic.id_note = n.id_note
    WHERE pc.SNILS = 123454789
    ORDER BY to_date(n.visit_date, 'DD.MM.YYYY') DESC
)

SELECT Адрес, Дата_последнего_посещения, Диагноз
FROM LastVisit
LIMIT 1;

-- 2 вопрос
SELECT d.surname || ' ' || LEFT(d.first_name, 1) || '.' || LEFT(d.second_name, 1) || '.' AS Лечащий_врач
FROM doctor AS d
INNER JOIN patient_card AS pc ON d.id_doctor = pc.id_doctor
WHERE pc.id_card = 1;

-- 3 вопрос
SELECT d.cabinet AS Номер_кабинета,
       d.visitors_day AS День_приема,
       CONCAT(d.visitors_hour, ' - ', d.end_day) AS Часы_приема
FROM doctor AS d
WHERE d.id_doctor = 5;

-- 4 вопрос
SELECT pc.second_name AS Имя_пациента, pc.first_name AS Фамилия_пациента, n.visit_date AS Дата_посещения, n.sick_list AS Наличие_больничного_листа
FROM patient_card AS pc
INNER JOIN note_in_card AS nic ON pc.id_card = nic.id_card
INNER JOIN note AS n ON nic.id_note = n.id_note
WHERE n.id_doctor = 3
    AND n.sick_list = true
    AND to_date(n.term, 'DD.MM.YYYY') >= current_date;

-- 5 вопрос
SELECT d.first_name AS Имя_врача, d.surname AS Фамилия_врача, n.appointment AS Назначение, n.diagnose AS Диагноз
FROM doctor AS d
INNER JOIN note AS n ON d.id_doctor = n.id_doctor
WHERE n.diagnose = 'ОРЗ';


-- 6 вопрос
SELECT
    d.first_name AS Имя_врача,
    d.surname AS Фамилия_врача
FROM
    doctor AS d
WHERE
    d.cabinet = 28
    AND d.visitors_day = 'Среда'
    AND '13:30' BETWEEN d.visitors_hour AND d.end_day;

-- 7 вопрос
SELECT
    pc.second_name AS Имя,
    pc.first_name AS Фамилия,
    pc.surname AS Отчество,
    COUNT(*) AS Количество_посещений
FROM patient_card AS pc
INNER JOIN note_in_card AS nic ON pc.id_card = nic.id_card
INNER JOIN note AS n ON nic.id_note = n.id_note
WHERE pc.id_card = 3
    AND to_date(n.visit_date, 'DD.MM.YYYY') >= (CURRENT_DATE - INTERVAL '1 month')
GROUP BY pc.second_name, pc.first_name, pc.surname;

-- 8 вопрос
SELECT d.first_name AS Имя_врача, d.surname AS Фамилия_врача, COALESCE(COUNT(n.id_note), 0) AS Количество_пациентов
FROM doctor AS d
LEFT JOIN note AS n ON d.id_doctor = n.id_doctor AND to_date(n.visit_date, 'DD.MM.YYYY') >= (CURRENT_DATE - INTERVAL '1 month')
GROUP BY d.first_name, d.surname, d.id_doctor
ORDER BY d.id_doctor;

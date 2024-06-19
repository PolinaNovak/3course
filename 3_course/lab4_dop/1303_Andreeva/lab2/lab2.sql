CREATE TABLE client
(
    passport_number INTEGER PRIMARY KEY,
    second_name     TEXT not null,
    first_name      TEXT not null,
    patronymic      TEXT,
    city            TEXT not null
);

INSERT INTO client
    (passport_number, second_name, first_name, patronymic, city)
VALUES (234115, 'Андреева', 'Елизавета', 'Алексеевна', 'Брест'),
       (127891, 'Козловская', 'Ольга', 'Александровна', 'Минск'),
       (458720, 'Бутыло', 'Егор', 'Алексеевич', 'Брест'),
       (392749, 'Григорьев', 'Вячеслав', 'Станиславович', 'Екатеринбург'),
       (478302, 'Афанасьева', 'Анна', 'Васильевна', 'Калининград'),
       (652035, 'Калинин', 'Григорий', 'Александрович', 'Омск');

CREATE TABLE cleaning_day
(
    day SMALLINT primary key
);

INSERT INTO cleaning_day
    (day)
VALUES (1),
       (2),
       (3),
       (4),
       (5);

CREATE TABLE employee
(
    employee_id SERIAL PRIMARY KEY,
    second_name TEXT not null,
    first_name  TEXT not null,
    patronymic  TEXT
);

INSERT INTO employee
    (second_name, first_name, patronymic)
VALUES ('Алексеев', 'Сергей', 'Андреевич'),
       ('Осипова', 'Алина', 'Сергеевна'),
       ('Сергеева', 'Татьяна', 'Олеговна'),
       ('Иванов', 'Олег', 'Геннадьевич'),
       ('Сомова', 'Елена', 'Павловна');


CREATE TABLE floor
(
    floor_number SMALLINT PRIMARY KEY
);

INSERT INTO floor
    (floor_number)
VALUES (1),
       (2),
       (3),
       (4),
       (5);

CREATE TABLE employee_cleaning
(
    employee_cleaning_id SERIAL PRIMARY KEY,
    floor_number         INTEGER not null REFERENCES floor (floor_number) ON DELETE CASCADE,
    day                  INTEGER REFERENCES cleaning_day (day) ON DELETE SET NULL,
    employee_id          INTEGER REFERENCES employee (employee_id) ON DELETE SET NULL
);

INSERT INTO employee_cleaning (floor_number, day, employee_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 4),
       (5, 5, 5);

CREATE TABLE room
(
    room_number  INTEGER PRIMARY KEY,
    type         TEXT     not null,
    price        INTEGER  not null,
    phone_number INTEGER,
    floor_number SMALLINT not null REFERENCES floor (floor_number) ON DELETE CASCADE
);

INSERT INTO room
    (room_number, type, price, phone_number, floor_number)
VALUES (121, 'single', 12000, 2030121, 1),
       (223, 'double', 22000, 2030223, 2),
       (343, 'double', 22000, 2030343, 3),
       (457, 'triple', 32000, 2030457, 4),
       (555, 'triple', 50000, 2030555, 5),
       (539, 'double', 32000, 2030539, 5);

CREATE TABLE client_room
(
    passport_number INTEGER not null REFERENCES client (passport_number),
    room_number     INTEGER not null REFERENCES room (room_number),
    check_in_date   DATE    not null,
    check_out_date  DATE    not null,
    PRIMARY KEY (passport_number, room_number)
);

INSERT INTO client_room
    (passport_number, room_number, check_in_date, check_out_date)
VALUES (234115, 121, '2020-01-08', '2020-01-18'),
       (127891, 223, '2021-11-20', '2021-11-23'),
       (458720, 343, '2023-10-15', '2023-10-20'),
       (392749, 457, '2021-04-08', '2021-04-20'),
       (478302, 555, '2021-01-28', '2021-02-01');


SELECT c.second_name, c.first_name, c.patronymic
FROM client c
        JOIN
    client_room cr on c.passport_number = cr.passport_number
WHERE cr.room_number = 555;

SELECT second_name, first_name, patronymic
FROM client
WHERE city = 'Брест';

SELECT e.second_name, e.first_name, e.patronymic
FROM employee e
         JOIN
     employee_cleaning ec ON e.employee_id = ec.employee_id
         JOIN
     cleaning_day cd ON ec.day = cd.day
         JOIN
     floor f ON ec.floor_number = f.floor_number
         JOIN
     room r ON f.floor_number = r.floor_number
         JOIN
     client_room cr on r.room_number = cr.room_number
WHERE cr.passport_number = 392749
  AND cd.day = 4;


SELECT COUNT(*) AS свободные_номера
FROM room r
        JOIN client_room cr on r.room_number = cr.room_number
WHERE (cr.check_in_date >= CURRENT_DATE OR cr.check_out_date <= CURRENT_DATE);


INSERT INTO employee
    (second_name, first_name, patronymic)
VALUES ('Петрова', 'Александра', 'Ивановна');


DELETE
FROM employee
WHERE second_name = 'Осипова'
  AND first_name = 'Алина'
  AND patronymic = 'Сергеевна';
SELECT * FROM employee;


UPDATE employee_cleaning
SET day = 3
WHERE employee_id IN
      (SELECT employee_id
       FROM employee
       WHERE second_name = 'Сомова'
         AND first_name = 'Елена'
         AND patronymic = 'Павловна');
SELECT * FROM employee_cleaning;


INSERT INTO client_room
    (passport_number, room_number, check_in_date, check_out_date)
VALUES (652035, 539, '2023-10-20', '2023-10-25');
SELECT * FROM client_room;


UPDATE client_room
SET check_out_date = CURRENT_DATE
WHERE passport_number = 458720;
SELECT * FROM client_room;

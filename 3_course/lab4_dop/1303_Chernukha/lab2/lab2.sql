
create table ReadingRoom(
    id serial primary key NOT NULL,
    name varchar(50) NOT NULL,
    capacity int NOT NULL
);

create table Book(
    ISBN int primary key NOT NULL,
    publisher varchar(50) NOT NULL,
	author varchar(50) NOT NULL,
    title varchar(70) NOT NULL,
    year varchar(4) NOT NULL
);

create table Reader(
    library_card serial primary key NOT NULL,
    full_name varchar(30) NOT NULL,
    passport varchar(11) NOT NULL,
    birthday date NOT NULL,
    address varchar(50) NOT NULL,
    phone varchar(11) NOT NULL,
    education varchar(30) NOT NULL,
    academic_degree bool NOT NULL
);

create table ReaderRoom(
    visitor_id int NOT NULL,
    hall_id int NOT NULL,
    foreign key (visitor_id) references Reader(library_card) on delete cascade,
    foreign key (hall_id) references ReadingRoom(id) on delete cascade,
    primary key (visitor_id, hall_id)
);

create table BookRoom(
    hall_id int NOT NULL,
    ISBN int NOT NULL,
	code varchar(7) NOT NULL,
    foreign key (hall_id) references ReadingRoom(id) on delete cascade,
    foreign key (ISBN) references Book(ISBN) on delete cascade,
	--primary key (hall_id, ISBN),
	primary key (hall_id, code)
);

create table ReaderBook(
    visitor_id int NOT NULL,
    code varchar(7) NOT NULL,
    foreign key (visitor_id) references Reader(library_card) on delete cascade,
    booked_at date NOT NULL
);


insert into Book(ISBN, publisher,author, title, year) values
    (123456, 'Нобель Прес', 'Шевченко Т.Г.' ,'Кобзарь', '1840'),
    (234567,'Литера', 'Сковорода Г.С.' ,'Харьковские басни. Афоризмы', '1774'),
    (345678,'АСТ', 'Эрих Мария Ремарк' ,'На Западном фронте без перемен', '1929'),
    (456788,'АСТ', 'Эрих Мария Ремарк' ,'Триумфальная арка', '1945'),
	(567897,'Питер', 'Моро М.И.' ,'Математика. 2 класс. Учебник.', '2007'),
    (678966,'Азбука', 'Гоголь Н.В.' ,'Тарас Бульба', '1835'),
	(789878,'Tbilisi State University', 'Сковорода Г.С.' ,'Сочинения', '1894');
	
insert into ReadingRoom(name, capacity) values
    ('Общий читальный зал', 50), ('Научный читальный зал', 25), ('Отдел редких книг', 15);
	
insert into Reader(full_name, passport, birthday, address, phone, education , academic_degree) values
    ( 'Гололобов И.В.', '1337 22890', '2003-01-29', 'ул. Чебышевская, 3', '89215526212', 'Высшее', true),
    ( 'Могилёвцев М.С.', '1448 10050', '2003-01-25', 'ул. Суворовская, 3', '89657896362', 'Высшее', false),
    ( 'Самохин К.А.', '1213 01020', '2004-05-19', 'ул. Вертолётчиков, 2', '89639498100', 'Высшее', true),
    ( 'Кожевников В.И.', '7776 66666', '2003-06-19', 'пр. Стачек, 32', '89216342025', 'Среднее', false),
    ( 'Коренченко И.С.', '9876 12345', '2002-11-01', 'ул. Комсомольская, 54', '89092461513', 'Высшее', true),
	( 'Драбкин А.В.', '4234 12345', '1986-02-02', 'пр. Луначарского, 54', '85464564565', 'Высшее', true);

insert into ReaderRoom(visitor_id, hall_id) values
    (1, 2), (2, 3), (3, 2), (4, 1), (5, 1), (6, 1);

insert into BookRoom(hall_id, ISBN, code) values
    (1, 123456, '24B-57' ),
    (3, 234567, '24H-22'),
    (1, 345678, '21K-14'),
    (1, 456788, '56B-27'),
	(2, 567897, '24B-57'),
    (1, 678966, '81L-65'),
	(3, 789878, '23L-61'),
	(1, 123456, '25B-57' ),
	(1, 123456, '26B-57' ),
    (1, 456788, '56B-28');

insert into ReaderBook(visitor_id, code,  booked_at) values
    (1, '24B-57',  '2023-10-15' ),
    (2, '24H-22',  '2023-9-25'),
    (2, '23L-61',  '2023-8-07'),
    (5, '24B-57', '2023-10-26'),
    (4, '56B-27',  '2023-9-02'),
    (6, '56B-28', '2023-9-03');


SELECT title FROM ReaderBook
	inner join Reader on ReaderBook.visitor_id = Reader.library_card
	left join BookRoom on ReaderBook.code = BookRoom.code
	inner join Book on BookRoom.ISBN = Book.ISBN
    inner join ReaderRoom on Reader.library_card = ReaderRoom.visitor_id
where full_name = 'Драбкин А.В.' AND BookRoom.hall_id = ReaderRoom.hall_id;

SELECT title FROM BookRoom
	inner join Book on BookRoom.ISBN = Book.ISBN
where code = '25B-57';

SELECT code FROM BookRoom
	inner join Book on BookRoom.ISBN = Book.ISBN
where title = 'Математика. 2 класс. Учебник.';

SELECT title,  ReaderBook.code ,booked_at  FROM ReaderBook
	inner join BookRoom on ReaderBook.code = BookRoom.code
	inner join Book on BookRoom.ISBN = Book.ISBN
    inner join Reader on Reader.library_card = ReaderBook.visitor_id
    inner join ReaderRoom on Reader.library_card = ReaderRoom.visitor_id
where  title = 'Кобзарь'  AND BookRoom.hall_id = ReaderRoom.hall_id;

SELECT full_name, booked_at  FROM ReaderBook
	inner join Reader on ReaderBook.visitor_id = Reader.library_card
where (select current_date - booked_at) > 30;

SELECT title, full_name FROM BookRoom
	inner join ReaderBook on ReaderBook.code = BookRoom.code
	inner join Reader on ReaderBook.visitor_id = Reader.library_card
	inner join Book on BookRoom.ISBN = Book.ISBN
    inner join ReaderRoom on Reader.library_card = ReaderRoom.visitor_id
	where BookRoom.hall_id = ReaderRoom.hall_id AND title IN (
	SELECT title FROM BookRoom
	inner join Book on BookRoom.ISBN = Book.ISBN
GROUP BY title
HAVING COUNT(title) < 3
);

SELECT count(full_name) AS Количество FROM Reader;

SELECT count(full_name) AS Количество FROM Reader
where extract(year from age(current_date, birthday)) < 20;

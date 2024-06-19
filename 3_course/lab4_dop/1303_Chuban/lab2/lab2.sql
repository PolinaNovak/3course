create schema if not exists librarySchema;

create table librarySchema.Publisher(
    id serial primary key,
    name varchar(50)
);

create table librarySchema.Author(
    author_id serial primary key,
    name varchar(30)
);

create table librarySchema.Book(
    book_id serial primary key,
    publisher_id int not null,
    foreign key (publisher_id) references librarySchema.Publisher(id) on delete cascade,
    title varchar(50),
    year varchar(4),
    amount integer
);

create table librarySchema.AuthorBook(
    author_id int,
    book_id int,
    foreign key (author_id) references librarySchema.Author(author_id) on delete cascade,
    foreign key (book_id) references librarySchema.Book(book_id) on delete cascade,
    primary key (author_id, book_id)
);

create table librarySchema.LibraryHall(
    hall_id serial primary key,
    name varchar(30),
    capacity int
);

create table librarySchema.Visitor(
    visitor_id serial primary key,
    library_ticket int,
    surname varchar(30),
    passport varchar(11),
    birthday date,
    address varchar(50),
    phone varchar(11),
    education varchar(30),
    academic_degree bool,
    hall_id integer,
    foreign key (hall_id) references librarySchema.LibraryHall(hall_id)
);

create table librarySchema.BookAtHall(
    hall_id int,
    book_id int,
    foreign key (hall_id) references librarySchema.LibraryHall(hall_id) on delete cascade,
    foreign key (book_id) references librarySchema.Book(book_id) on delete cascade,
    visitor_id int,
    foreign key (visitor_id) references librarySchema.Visitor(visitor_id) on delete set null,
    code int,
    received date,
    returned date
);

insert into librarySchema.Publisher(name) values
    ('Азбука-Аттикус'), ('Эксмо'), ('АСТ'), ('Альпина Паблишер'), ('МИФ');

insert into librarySchema.Author(name) values
    ('Толстой Л.Н.'),
    ('Достоевский Ф.М.'),
    ('Оруэлл Д.'),
    ('Остин Д.'),
    ('Хемингуэй Э.');

insert into librarySchema.Book(publisher_id, title, year, amount) values
    (1, 'Война и мир', '1869', 10),
(1, 'Анна Каренина', '1877', 20),
(2, 'Преступление и наказание', '1866', 2),
(2, 'Братья Карамазовы', '1880', 5),
(3, 'Гордость и предубеждение', '1813', 8),
(3, 'Эмма', '1815', 14),
(4, '1984', '1949', 1),
(4, 'Скотный двор', '1945', 9),
(5, 'Старик и море', '1952', 13),
(5, 'Прощай, оружие', '1929', 17);


insert into librarySchema.AuthorBook(author_id, book_id) values
    (1,1), (1,2), (2,3), (2,4), (3,5), (3,6), (4,7), (4,8), (5,9), (5,10);

insert into librarySchema.LibraryHall(name, capacity) values
    ('Красный', 25), ('Синий', 20), ('Зеленый', 25);

insert into librarySchema.Visitor(library_ticket, surname, passport, birthday, address, phone, education, academic_degree, hall_id) values
    (1001, 'Иванов', '1234 678901', '2010-05-15', 'ул. Ленина, 123', '89205678901', 'Высшее', true, 1),
    (1002, 'Петров', '2345 789012', '1985-12-10', 'ул. Пушкина, 45', '89066789012', 'Среднее', false, 2),
    (1003, 'Сидорова', '3456 890123', '1995-03-25', 'пр. Гагарина, 67', '89217890123', 'Высшее', true, 3),
    (1004, 'Козлов', '4567 901234', '1982-08-03', 'ул. Маяковского, 56', '89208901234', 'Среднее', false, 1),
    (1005, 'Михайлова', '5678 012345', '1998-07-18', 'ул. Кирова, 89', '89219012345', 'Высшее', false, 2);

insert into librarySchema.BookAtHall(hall_id, book_id, visitor_id, code, received) values
    (1, 1, 1, 1121, '2023-08-08'),
    (2, 2, 2, 2222, '2023-10-20'),
    (3, 3, 3, 3333, '2023-10-15'),
    (2, 4, 4, 2444, '2023-08-22'),
    (1, 7, 5, 1755, '2023-10-19');

select title from
    librarySchema.Book
        inner join librarySchema.BookAtHall on librarySchema.Book.book_id = librarySchema.BookAtHall.book_id
        inner join librarySchema.Visitor on librarySchema.BookAtHall.visitor_id = librarySchema.Visitor.visitor_id
    where library_ticket = 1001;

select title from
    librarySchema.Book
        inner join librarySchema.BookAtHall BAH on librarySchema.book.book_id = BAH.book_id
    where code = 1755;


select code from
    librarySchema.BookAtHall
        inner join librarySchema.Book b on b.book_id = librarySchema.BookAtHall.book_id
    where title = '1984';

select title, received from
    librarySchema.BookAtHall
        inner join librarySchema.Book b on b.book_id = librarySchema.BookAtHall.book_id
    where received is not null
    order by title;

select surname, library_ticket, title from
    librarySchema.Visitor
        inner join librarySchema.BookAtHall b on librarySchema.Visitor.visitor_id = b.visitor_id
        inner join librarySchema.Book b2 on b2.book_id = b.book_id
    where (select current_date - received) > 30;

select library_ticket, surname, title from
    librarySchema.Visitor
        inner join librarySchema.BookAtHall b on Visitor.visitor_id = b.visitor_id
        inner join librarySchema.Book on b.book_id = Book.book_id
    where amount <=2;

select count(visitor_id) from librarySchema.Visitor;

select count(*) from librarySchema.Visitor
where extract(year from age(current_date, birthday)) < 20
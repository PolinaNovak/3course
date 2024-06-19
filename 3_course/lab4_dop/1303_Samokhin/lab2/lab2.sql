CREATE TABLE Страна(
	id_страны SMALLSERIAL PRIMARY KEY,
	Название_страны TEXT NOT NULL
);

CREATE TABLE Группа(
	id_группы SMALLSERIAL PRIMARY KEY,
	Название_группы TEXT NOT NULL,
	Год_создания SMALLINT NOT NULL,
	id_страны SMALLINT,
	Положение_в_хит_параде SMALLSERIAL NOT NULL,
	FOREIGN KEY (id_страны) REFERENCES Страна(id_страны) ON DELETE SET NULL
);

CREATE TABLE Человек(
	id_человека SMALLSERIAL PRIMARY KEY,
	ФИО TEXT NOT NULL
);

CREATE TABLE Песня(
	id_песни SMALLSERIAL PRIMARY KEY,
	Название_песни TEXT NOT NULL,
	Композитор SMALLINT,
	FOREIGN KEY (Композитор) REFERENCES Человек(id_человека) ON DELETE SET NULL,
	Автор_песни SMALLINT,
	FOREIGN KEY (Автор_песни) REFERENCES Человек(id_человека) ON DELETE SET NULL,
	id_группы SMALLINT,
	FOREIGN KEY (id_группы) REFERENCES Группа(id_группы) ON DELETE CASCADE,
	Дата_написания DATE NOT NULL
);

CREATE TABLE Артист(
	id_артиста SMALLSERIAL PRIMARY KEY,
	Возраст INTEGER NOT NULL,
	Амплуа TEXT NOT NULL,
	id_человека SMALLINT,
	FOREIGN KEY (id_человека) REFERENCES Человек(id_человека) ON DELETE CASCADE
);

CREATE TABLE Город(
	id_города SMALLSERIAL PRIMARY KEY,
	Название_города TEXT NOT NULL
);

CREATE TABLE Артист_группа(
	id_группы SMALLINT,
	id_артиста SMALLINT,
	PRIMARY KEY (id_группы, id_артиста)
);

CREATE TABLE Гастроли(
	id_выступления SMALLSERIAL PRIMARY KEY,
	Название_программы TEXT NOT NULL,
	id_города SMALLINT,
	Дата_начала DATE NOT NULL,
	Дата_окончания DATE NOT NULL,
	Дата_выступления DATE NOT NULL,
	Цена_билета NUMERIC NOT NULL,
	id_группы SMALLINT,
	FOREIGN KEY (id_города) REFERENCES Город(id_города) ON DELETE CASCADE,
	FOREIGN KEY (id_группы) REFERENCES Группа(id_группы) ON DELETE CASCADE
);

INSERT INTO Страна(Название_страны) VALUES
	('Россия'),
	('Германия'),
	('Ведикобритания');

INSERT INTO Человек(ФИО) VALUES
	('Баранов Сергей Михайлович'),
	('Иванов Георгий Алексеевич'),
	('Michael Walter'),
	('Hans Schwarz'),
	('Peter Schmidt'),
	('John Smith'),
	('Thomas Davies'),
	('Henry Walker');
    
INSERT INTO Город(Название_города) VALUES
	('Москва'),
	('Санкт-Петербург'),
	('Краснодар'),
	('Новосибирск'),
	('Мюнхен'),
	('Берлин'),
	('Лондон'),
	('Манчестер');

INSERT INTO Группа(Название_группы, Год_создания, id_страны, Положение_в_хит_параде) VALUES
	('Dead end', 1997, 3, 2),
	('Арт-обстрел', 2000, 1, 3),
	('Wolpertinger', 1995, 2, 1),
	('Мираж', 2004, 1, 4);   

INSERT INTO Песня(Название_песни, Композитор, Автор_песни, id_группы, Дата_написания) VALUES
	('Rainy Day', 2, 1, 4, '2009-03-25'),
	('Time Bomb', 2, 1, 4, '2010-01-17'),
	('Auslander', 3, 4, 3, '2000-09-12'),
	('Sonne', 3, 4, 3, '2003-11-04'),
	('Amnesia', 6, 5, 1, '2001-06-15'),
	('After Dark', 6, 5, 1, '2008-10-20'),
	('Мой друг', 8, 7, 2, '2010-08-18'),
	('Тепло', 8, 7, 2, '2019-04-24');
    
INSERT INTO Артист(Возраст, Амплуа, id_человека) VALUES
	(22, 'Вокалист', 1),
	(20, 'Гитарист', 2),
	(24, 'Волкалист', 8),
	(21, 'Басист', 7),
	(25, 'Вокалист', 3),
	(24, 'Барабанщик', 4),
	(23, 'Гитарист', 5),
	(27, 'Барабанщик', 6);

INSERT INTO Артист_группа (id_группы, id_артиста) VALUES
	(4, 1),
	(4, 2),
	(1, 5),
	(1, 6),
	(2, 7),
	(2, 8),
	(3, 3),
	(3, 4);

INSERT INTO Гастроли(Название_программы, id_города, Дата_начала, Дата_окончания, Дата_выступления, Цена_билета, id_группы) VALUES
	('Tour', 7, '2023-04-12', '2023-04-22', '2023-04-15', 999.99, 1),
	('Tour', 8, '2023-04-12', '2023-04-22', '2023-04-19', 899.99, 1),
	('Я русский!', 4, '2023-06-23', '2023-07-05', '2023-06-27', 499.99, 2),
	('Я русский!', 3, '2023-06-23', '2023-07-05', '2023-07-01', 399.99, 2),
	('Flugzeug', 5, '2023-02-03', '2023-02-10', '2023-02-04', 1199.99, 3),
	('Flugzeug', 6, '2023-02-03', '2023-02-10', '2023-02-08', 1399.99, 3),
	('Малый тур', 2, '2023-09-10', '2023-09-21', '2023-09-13', 799.99, 4),
	('Малый тур', 1, '2023-09-10', '2023-09-21', '2023-02-19', 799.99, 4);

SELECT Название_песни, Композитор.ФИО AS Композитор, Автор.ФИО AS Автор_текста, Дата_написания, Название_группы FROM Песня
	JOIN Группа ON Группа.id_группы = Песня.id_группы
	JOIN Человек AS Композитор ON Песня.Композитор = Композитор.id_человека
	JOIN Человек AS Автор ON Песня.Автор_песни = Автор.id_человека
WHERE Название_песни = 'Auslander';

SELECT Название_песни FROM Песня
	JOIN Группа ON Группа.id_группы = Песня.id_группы
WHERE Положение_в_хит_параде = 1;

SELECT Название_группы, Название_программы, Дата_выступления, Цена_билета FROM Гастроли
	JOIN Группа ON Группа.id_группы = Гастроли.id_группы
WHERE Название_группы = 'Wolpertinger' AND Дата_выступления IN (SELECT MAX(Дата_выступления) FROM Гастроли GROUP BY id_группы);

SELECT Название_группы, ФИО, Возраст, Амплуа FROM Артист_группа
	JOIN Группа ON Группа.id_группы = Артист_группа.id_группы
	JOIN Артист ON Артист.id_артиста = Артист_группа.id_артиста
	JOIN Человек ON Артист.id_человека = Человек.id_человека
WHERE Название_группы = 'Dead end'
ORDER BY ФИО ASC;

SELECT Название_группы, Название_программы, Название_города, Дата_окончания - Дата_начала AS Продолжительность FROM Гастроли
	JOIN Город ON Город.id_города = Гастроли.id_города
	JOIN Группа ON Группа.id_группы = Гастроли.id_группы
WHERE Название_группы = 'Арт-обстрел';

SELECT Название_группы, Год_создания FROM Группа
WHERE CAST((DATE_PART('year', CURRENT_DATE) - Год_создания) AS INTEGER)%5 = 0;

SELECT Название_группы, ФИО, Возраст FROM Артист_группа
	JOIN Группа ON Группа.id_группы = Артист_группа.id_группы
	JOIN Артист ON Артист.id_артиста = Артист_группа.id_артиста
	JOIN Человек ON Артист.id_человека = Человек.id_человека
WHERE Возраст IN (SELECT MIN(Возраст) FROM Артист WHERE Амплуа = 'Вокалист');
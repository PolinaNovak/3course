CREATE TABLE Команда(
    Название_команды TEXT  PRIMARY KEY,
	Город_команды TEXT,
	Тренер TEXT,
	Место_в_прошлом_сезоне SMALLSERIAL
);

CREATE TABLE Игрок(
    id_игрока SERIAL PRIMARY KEY,
    Название_команды TEXT,
	Фамилия TEXT,
	Имя TEXT,
	Возраст SMALLSERIAL,
	Амплуа TEXT,
	Номер SMALLSERIAL,
	Забитые_голы SMALLSERIAL,
	FOREIGN KEY (Название_команды) REFERENCES Команда(Название_команды)
);

CREATE TABLE Стадион(
    Название_стадиона TEXT  PRIMARY KEY,
	Город_стадиона TEXT,
	Вместимость SERIAL
);

CREATE TABLE Организатор(
    Название_организации TEXT  PRIMARY KEY
);

CREATE TABLE Расписание_игр(
	id_игры SERIAL PRIMARY KEY,
	Дата date,
	Счет1 SMALLSERIAL,
	Счет2 SMALLSERIAL,
	Цена_на_билет SERIAL,
	Название_стадиона TEXT,
	Название_организации TEXT,
	FOREIGN KEY (Название_стадиона) REFERENCES Стадион(Название_стадиона),
	FOREIGN KEY (Название_организации) REFERENCES Организатор(Название_организации)
);


CREATE TABLE Команды_в_игре(
    Название_команды1 TEXT,
	Название_команды2 TEXT,
	id_игры SERIAL PRIMARY KEY,
	FOREIGN KEY (Название_команды1) REFERENCES Команда(Название_команды),
	FOREIGN KEY (Название_команды2) REFERENCES Команда(Название_команды),
	FOREIGN KEY (id_игры) REFERENCES Расписание_игр(id_игры)
);

	


INSERT INTO Команда(Название_команды, Город_команды, Тренер, Место_в_прошлом_сезоне ) VALUES
	('Балтика', 'Калининград', 'Королев А.Л.', 1),
	('Зенит', 'Санкт-Петербург', 'Гирман А.В.', 2),
	('Динамо', 'Москва', 'Смирнов Д.Ю.', 3),
	('Локомотив', 'Москва', 'Королева П.А.', 4),
	('Рубин', 'Казань', 'Иевлев Е.А.', 5);
	
INSERT INTO Игрок(Название_команды, Фамилия, Имя, Возраст, Амплуа, Номер, Забитые_голы) VALUES
	('Балтика', 'Лазарев', 'Владислав', 21, 'Полузащитник', 89, 1),
	('Балтика', 'Шишкин', 'Федор', 20, 'Нападающий', 52, 7),
	('Зенит', 'Мостовой', 'Андрей', 25, 'Полузащитник', 17, 0),
	('Зенит', 'Самохин', 'Кирилл', 22, 'Нападающий', 8, 12),
	('Динамо', 'Смолов', 'Фёдор', 33, 'Нападающий', 10, 5),
	('Динамо', 'Дудко', 'Максим', 33, 'Вратарь', 2, 28),
	('Локомотив', 'Дзюба', 'Артём', 35, 'Нападающий', 7, 3),
	('Локомотив', 'Баринов', 'Дмитрий', 27, 'Полузащитник', 6, 0),
	('Рубин', 'Рыбус', 'Мацей', 30, 'Защитник', 31, 0),
	('Рубин', 'Кашуба', 'Данил', 19, 'Нападающий', 37, 5);
	
INSERT INTO Организатор(Название_организации) VALUES
	('Fonbet'),
	('Мир Российская Премьер Лига'),
	('ЧЕ-2024'),
	('Лига Чемпионов'),
	('OLIMPBET');
	
INSERT INTO Стадион(Название_стадиона, Город_стадиона, Вместимость) VALUES
	('Лужники', 'Москва', 	76880),
	('Газпром Арена', 'Санкт-Петербург', 	64448),
	('Динамо', 'Воронеж', 	10880),
	('Сибсельмаш', 'Новосибирск', 	13000),
	('Барс', 'Казань', 	45379);
	
INSERT INTO Расписание_игр(id_игры, Дата, Счет1, Счет2, Цена_на_билет, Название_стадиона, Название_организации) VALUES
	(1, '2023-12-13', 3, 1, 7000, 'Лужники', 'Fonbet'),
	(2, '2023-12-17', 1, 0, 7000, 'Лужники', 'Fonbet'),
	(3, '2024-02-05', 2, 7, 3000, 'Газпром Арена', 'ЧЕ-2024'),
	(4, '2024-03-01', 0, 1, 3000, 'Газпром Арена', 'ЧЕ-2024'),
	(5, '2024-04-10', 6, 9, 1000, 'Динамо', 'OLIMPBET');

INSERT INTO Команды_в_игре(id_игры, Название_команды1, Название_команды2) VALUES
	(1, 'Балтика', 'Зенит'),
	(2, 'Зенит', 'Локомотив'),
	(3, 'Локомотив', 'Рубин'),
	(4, 'Рубин', 'Динамо'),
	(5, 'Динамо', 'Балтика');
	
*/
--Даты встреч команды, ее противники и счет
--Команда Локомотив
SELECT Дата, Команды_в_игре.Название_команды1 as Команда1, Команды_в_игре.Название_команды2 as Команда2, Счет1, Счет2
FROM Расписание_игр
JOIN Команды_в_игре ON Команды_в_игре.id_игры = Расписание_игр.id_игры
WHERE Команды_в_игре.Название_команды1 = 'Локомотив' OR Команды_в_игре.Название_команды2 = 'Локомотив';

--Номера и Фамилии игроков команд, участвовахших во встрече, которая проходила в указанный день в указанном городе
--День 2024-02-05, город Санкт-Петербург
SELECT Номер, Фамилия
FROM Игрок
JOIN Команды_в_игре ON Команды_в_игре.Название_команды1 = Игрок.Название_команды OR Команды_в_игре.Название_команды2 = Игрок.Название_команды 
JOIN Расписание_игр ON Команды_в_игре.id_игры = Расписание_игр.id_игры
JOIN Стадион ON Расписание_игр.Название_стадиона = Стадион.Название_стадиона
WHERE Стадион.Город_стадиона = 'Санкт-Петербург' AND Расписание_игр.Дата = '2024-02-05';

--Цена билета на матч между указанными командами
--Команды 'Балтика' и 'Динамо'
SELECT Цена_на_билет
FROM Расписание_игр
JOIN Команды_в_игре ON Команды_в_игре.id_игры = Расписание_игр.id_игры
WHERE Команды_в_игре.Название_команды1 = 'Балтика' AND  Команды_в_игре.Название_команды2 = 'Динамо'
   OR Команды_в_игре.Название_команды1 = 'Динамо' AND Команды_в_игре.Название_команды2 = 'Балтика';

--Игрок, забивший в турнире наибольшее количество мячей
SELECT Имя, Фамилия, Забитые_голы
FROM Игрок
WHERE Забитые_голы = (SELECT MAX(Забитые_голы) FROM Игрок);

--Самый молодой участник турнира
SELECT Имя, Фамилия, Возраст
FROM Игрок
WHERE Возраст = (SELECT MIN(Возраст) FROM Игрок);


--Команды, занявшие призовые места
SELECT Название_команды, Место_в_прошлом_сезоне AS Место
FROM Команда
WHERE Место_в_прошлом_сезоне < 4;


--Комманды с наилучшей и наихудшей разницей забитых и пропущенных мячей

CREATE TEMPORARY TABLE Разница AS
SELECT Название_команды1  AS Команда, (Расписание_игр.Счет1 - Расписание_игр.Счет2) AS Разница_забитых_и_пропущенных
FROM Команды_в_игре
JOIN Расписание_игр ON Команды_в_игре.id_игры = Расписание_игр.id_игры
UNION
SELECT Название_команды2   AS Команда, (Расписание_игр.Счет2 - Расписание_игр.Счет1) AS Разница_забитых_и_пропущенных
FROM Команды_в_игре
JOIN Расписание_игр ON Команды_в_игре.id_игры = Расписание_игр.id_игры;


SELECT Команда, Разница_забитых_и_пропущенных
FROM Разница
WHERE Разница_забитых_и_пропущенных =
	 (SELECT MIN(Разница_забитых_и_пропущенных) FROM Разница)
	 OR
	  Разница_забитых_и_пропущенных =
	 (SELECT MAX(Разница_забитых_и_пропущенных) FROM Разница);
	 



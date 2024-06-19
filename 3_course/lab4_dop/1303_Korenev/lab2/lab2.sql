--почтальон
CREATE TABLE postman (
    postmanid SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    middlename TEXT,
    lastname TEXT
);

--район
CREATE TABLE district (
    districtid SERIAL PRIMARY KEY,
    postmanid INTEGER NOT NULL,
    FOREIGN KEY (postmanid) REFERENCES postman(postmanid) ON DELETE CASCADE,
    name TEXT NOT NULL
);

--дом
CREATE TABLE house (
    houseid SERIAL PRIMARY KEY,
    districtid INTEGER NOT NULL,
    address TEXT NOT NULL,
    FOREIGN KEY (districtid) REFERENCES district(districtid) ON DELETE CASCADE
);

--подписчик
CREATE TABLE subscriber (
    subscriberid SERIAL PRIMARY KEY,
    houseid INTEGER NOT NULL,
    firstname TEXT NOT NULL,
    middlename TEXT,
    lastname TEXT,
    FOREIGN KEY (houseid) REFERENCES house(houseid) ON DELETE CASCADE
);

--публикация
CREATE TABLE publication (
    publicationid SERIAL PRIMARY KEY,
    index INTEGER NOT NULL,
    title TEXT NOT NULL,
    price NUMERIC(10,2)
);

--подписка
CREATE TABLE subscription (
    subscriptionid SERIAL PRIMARY KEY,
    publicationid INTEGER NOT NULL,
    subscriberid INTEGER NOT NULL,
    startdate DATE NOT NULL,
    duration INTEGER NOT NULL,
    FOREIGN KEY (publicationid) REFERENCES publication(publicationid) ON DELETE CASCADE,
    FOREIGN KEY (subscriberid) REFERENCES subscriber(subscriberid) ON DELETE CASCADE
);

INSERT INTO postman (firstname, middlename, lastname) VALUES 
    ('Рубеус', NULL, 'Хагрид'),
    ('Букля', NULL, NULL),
    ('Альбус', 'Персиваль', 'Дамблдор'),
    ('Миневра', NULL, 'МакГонагалл'),
    ('Северус', NULL, 'Снегг');

INSERT INTO district (postmanid, name) VALUES 
    (3, 'Хогвартс'),
    (4, 'Косой Переулок'),
    (1, 'Хогсмид'),
    (5, 'Азкабан'),
    (1, 'Литтл Уингин'),
    (2, 'Оттери-Сент-Кэчпоул');

INSERT INTO house (districtid, address) VALUES 
    (3, 'Хогсмид, Три Метлы'),
    (3, 'Хогсмид, Волшебные палочки от Олливандера'),
    (5, 'Литтл Уингин, Тисовая улица, дом 4'),
    (4, 'Азкабан, 7 камера'),
    (6, 'Оттери-Сент-Кэчпоул, Нора'),
    (2, 'Косой Переулок, Гринготтс'),
    (2, 'Косой Переулок, Лавка Олливандера'),
    (1, 'Хогвартс, Башня Гриффиндор');

INSERT INTO subscriber (houseid, firstname, middlename, lastname) VALUES 
    (1, 'Мадам', NULL, 'Розмерта'),
    (2, 'Гаррик', NULL, 'Олливандер'),
    (3, 'Гарри', 'Джеймс', 'Поттер'),
    (4, 'Сириус', NULL, 'Блэк'),
    (5, 'Молли', NULL, 'Уизли'),
    (6, 'Гринготт', NULL, NULL),
    (7, 'Джервейс', NULL, 'Олливандер'),
    (8, 'Гермиона', NULL, 'Грейнджер'),
    (8, 'Рон', NULL, 'Уизли');

INSERT INTO publication (index, title, price) VALUES 
    (93, 'Загадки Темного Искусства', 10.49),
    (89, 'Энциклопедия Зельеварения', 13.79),
    (88, 'Дейли Профет', 10.99),
    (96, 'Тайные Существа и Где Они Обитают', 8.99),
    (83, 'Заклинания для Начинающих', 6.99),
    (84, 'Колдовство в Повседневной Жизни', 9.99),
    (91, 'Путеводитель по Магическим Местам', 12.99);


INSERT INTO subscription (publicationid, subscriberid, startdate, duration) VALUES 
    (3, 6, '2022-11-01', 365),
    (6, 5, '2023-03-20', 300),
    (1, 4, '2020-06-15', 90),
    (4, 1, '2022-04-12', 1000),
    (3, 2, '2023-01-01', 365),
    (1, 3, '2023-10-10', 180),
    (2, 8, '2023-08-21', 90),
    (5, 9, '2023-03-15', 120),
    (7, 7, '2023-05-13', 150),
    (3, 3, '2023-10-09', 90);

--1.Определить наименование и количество экземпляров всех изданий, получаемых отделением связи.
SELECT title FROM publication

--2.По заданному адресу определить фамилию почтальона, обслуживающего подписчика.
SELECT lastname FROM postman
where postmanid = (
	SELECT postmanid
	FROM district
	WHERE districtid = (
		SELECT districtid
		FROM house
		WHERE address = 'Хогсмид, Три Метлы'
		)
)

--3.Какие газеты выписывает гражданин с указанной фамилией, именем, отчеством?
SELECT title
FROM publication
	INNER JOIN subscription ON subscription.publicationid = publication.publicationid
	INNER JOIN subscriber ON subscriber.subscriberid = subscription.subscriberid
	WHERE
		firstname = 'Гарри' AND
		middlename = 'Джеймс' AND
		lastname = 'Поттер'

--4.Сколько почтальонов работает в почтовом отделении?
SELECT Count(*) FROM postman

--5.На каком участке количество экземпляров подписных изданий максимально?
WITH MaxSubscriptionCount AS (
    SELECT MAX(subscription_count) AS max_count
    FROM (
        SELECT COUNT(*) AS subscription_count
        FROM district d
        JOIN house h ON d.districtid = h.districtid
        JOIN subscriber s ON h.houseid = s.houseid
        JOIN subscription sub ON s.subscriberid = sub.subscriberid
        GROUP BY d.name
    ) AS counts
)
SELECT d.name AS district_name, COUNT(*) AS subscription_count
FROM district d
JOIN house h ON d.districtid = h.districtid
JOIN subscriber s ON h.houseid = s.houseid
JOIN subscription sub ON s.subscriberid = sub.subscriberid
GROUP BY d.name
HAVING COUNT(*) = (SELECT max_count FROM MaxSubscriptionCount);

--6.Каков средний срок подписки по каждому изданию?
--Для всех существующих подписок:
SELECT round(avg(duration), 2) FROM subscription

--6.Каков средний срок подписки по каждому изданию?
--Только для действующих подписок:
SELECT round(avg(duration), 2) FROM subscription
WHERE startdate + interval '1 day' * duration >= NOW();

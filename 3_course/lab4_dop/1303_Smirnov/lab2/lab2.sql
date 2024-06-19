CREATE TYPE instance_status AS ENUM('есть', 'утерян');

CREATE TABLE shelf(
  shelf_id SERIAL PRIMARY KEY,
  unique_shelf_number INTEGER UNIQUE CHECK(unique_shelf_number > 0) NOT NULL
);

CREATE TABLE rack(
    rack_id SERIAL PRIMARY KEY,
  	shelf_id INTEGER NOT NULL,
 	unique_rack_number INTEGER UNIQUE CHECK(unique_rack_number > 0) NOT NULL,
  	FOREIGN KEY (shelf_id) REFERENCES shelf(shelf_id) ON DELETE RESTRICT
);

CREATE TABLE cell(
    cell_id SERIAL PRIMARY KEY,
	rack_id INTEGER NOT NULL,
 	unique_cell_number INTEGER UNIQUE CHECK(unique_cell_number > 0) NOT NULL,
  	FOREIGN KEY (rack_id) REFERENCES rack(rack_id) ON DELETE RESTRICT
);

CREATE TABLE document(
	document_id SERIAL PRIMARY KEY,
  	theme_name VARCHAR(100) NOT NULL,
  	document_title VARCHAR(250) NOT NULL,
  	inventory_number VARCHAR(14) UNIQUE NOT NULL,
  	cell_id INTEGER NOT NULL,
  	FOREIGN KEY (cell_id) REFERENCES cell(cell_id) ON DELETE RESTRICT
);

CREATE TABLE instance(
	instance_id SERIAL PRIMARY KEY,
    inventory_number VARCHAR(14) UNIQUE NOT NULL,
  	status instance_status NOT NULL,
  	title VARCHAR(250) NOT NULL,
  	document_id INTEGER NOT NULL,
  	FOREIGN KEY (document_id) REFERENCES document(document_id) ON DELETE CASCADE
);

CREATE TABLE department(
	department_id SERIAL PRIMARY KEY,
  	department_name VARCHAR(100) NOT NULL,
  	department_number VARCHAR(50) NOT NULL
);

CREATE TABLE abonent(
	abonent_id SERIAL PRIMARY KEY,
  	phone_number VARCHAR(50) NOT NULL,
  	name VARCHAR(100) NOT NULL,
  	surname VARCHAR(100),
  	middle_name VARCHAR(100),
  	department_id INTEGER NOT NULL,
  	FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE issues(
	instance_id INTEGER,
  	abonent_id INTEGER,
	PRIMARY KEY(instance_id, abonent_id),
	date_of_issue DATE NOT NULL,
  	FOREIGN KEY (instance_id) REFERENCES instance(instance_id) ON DELETE CASCADE,
	FOREIGN KEY (abonent_id) REFERENCES abonent(abonent_id) ON DELETE CASCADE
);

CREATE TABLE issues_archive(
  	issues_archive_id SERIAL PRIMARY KEY,
	document_id INTEGER NOT NULL,
  	date_of_issue DATE NOT NULL,
  	name VARCHAR(100) NOT NULL,
  	surname VARCHAR(100),
  	middle_name VARCHAR(100),
  	FOREIGN KEY (document_id) REFERENCES document(document_id) ON DELETE CASCADE
);

INSERT INTO shelf(unique_shelf_number) VALUES
	(1789131),
    (2124789),
    (3247893),
    (4489534),
    (5526783),
    (6890146);

INSERT INTO rack(shelf_id, unique_rack_number) VALUES
	(1, 1247890),
    (1, 1589161),
    (2, 2781313),
    (2, 2894131),
    (3, 3471123),
    (3, 3857841),
    (4, 4938732),
    (4, 4538713),
    (5, 5982412),
    (5, 5001378),
    (6, 6982412),
    (6, 6001378);
    
 INSERT INTO cell(rack_id, unique_cell_number) VALUES
	(1, 1189313),
    (1, 1289431),
    (2, 2178941),
    (2, 2278914),
    (3, 3178913),
    (3, 3289234),
    (4, 4138732),
    (5, 5182412),
    (6, 6182412),
    (7, 7178123),
    (8, 8189723),
    (9, 9136781),
    (10, 8901331),
    (11, 1678921),
    (12, 8913124);
    
INSERT INTO document(theme_name, document_title, inventory_number, cell_id) VALUES
	('учет инвентаря', 'Учтенный инвентарь за 2023', '01000000012023', 1),
    ('документация', 'Правила инвентаризации', '01000100012023', 4),
    ('отчеты экономистов', 'План экономического развития на 2024', '02000020242023', 5),
    ('налоговая', 'Результаты налоговой инспекции за 2022', '02000011112022', 7),
    ('документация', 'Комплектная документация на станки от Bosh', '03000019982019', 8),
    ('история предприятия', 'История предприятия с момента октябрьской революции', '07108104522010', 9),
    ('охрана труда', 'Политика организации по охране труда', '08000035642010', 10);
    
INSERT INTO instance(title, inventory_number, status, document_id) VALUES
	('Учтенные станки', '000000010001', 'есть', 1),
    ('Правила инвентаризации экз.1', '000100010001', 'есть', 2),
    ('Правила инвентаризации экз.2', '000100010002', 'есть', 2),
    ('Новый экономический план на предприятии', '000020240001', 'есть', 3),
    ('Документация на станок BOSH №313ADC31', '000019980001', 'есть', 5);
    
INSERT INTO department(department_name, department_number) VALUES
	('материально-технического снабжения', '013-00-06'),
    ('планово-экономический', '916-14-61'),
    ('конструкторский', '343-74-62'),
    ('управления персоналом', '949-25-48'),
    ('военизированная охрана', '045-22-26');
    
INSERT INTO abonent(phone_number, surname, name, middle_name, department_id) VALUES
	('7(416)127-21-37', 'Осипова', 'Мария', 'Дмитриевна', 1),
    ('7(589)183-65-03', 'Кириллов', 'Артём', 'Робертович', 1),
    ('7(842)993-16-33', 'Богданова', 'Эмилия', 'Александровна', 2),
    ('7(712)011-66-67', 'Кузнецов', 'Фёдор', 'Никитич', 3),
    ('7(404)450-48-49', 'Буров', 'Илья', 'Лукич', 5);
    
INSERT INTO issues(instance_id, abonent_id, date_of_issue) VALUES
	(1, 4, '2023-09-01'),
    (5, 4, '2023-10-03'),
    (2, 1, '2023-10-12'),
    (3, 2, '2023-10-15'),
    (4, 5, '2023-10-20');
    
INSERT INTO issues_archive(document_id, date_of_issue, surname, name, middle_name) VALUES
	(6, '2010-01-01', 'Робертов', 'Артём', 'Данилович'),
    (7, '2013-10-18', 'Соколова', 'Софья', 'Тимуровна'),
    (5, '2020-11-11', 'Мухин', 'Антон', 'Михайлович'),
    (5, '2022-07-15', 'Богданова', 'Эмилия', 'Александровна'),
    (5, '2016-09-24', 'Буров', 'Илья', 'Лукич');
	
-- Название наиболее востребованного документа?
WITH all_issues AS (
	SELECT document_id, date_of_issue FROM issues
  		INNER JOIN instance ON instance.instance_id = issues.instance_id
  	UNION ALL
  	SELECT document_id, date_of_issue FROM issues_archive
)
SELECT document_title, COUNT(*) AS Количество_выдач FROM all_issues
	INNER JOIN document ON all_issues.document_id = document.document_id
    GROUP BY document.document_id
	HAVING COUNT(*) = (SELECT COUNT(*) FROM all_issues GROUP BY document_id ORDER BY 1 DESC LIMIT 1);
    
-- Общее количество документов на заданную тему?
SELECT COUNT(*) AS Количество FROM document
	WHERE theme_name = 'документация';
    
-- Тема документа по заданному названию?
SELECT theme_name AS Тема FROM document
	WHERE document_title = 'План экономического развития на 2024';

-- Название документа, который имеется в архиве в максимальном количестве экземпляров?
SELECT document.document_id, document_title AS Название FROM document
INNER JOIN instance ON document.document_id = instance.document_id
GROUP BY document.document_id
HAVING COUNT(*) = (SELECT COUNT(*) FROM instance
                   WHERE status <> 'утерян'
                   GROUP BY document_id
                   ORDER BY 1 DESC
                   LIMIT 1);
                   
-- Фамилия, имя и отчество абонента, который брал указанный документ последним?
SELECT Фамилия, Имя, Отчество FROM (
SELECT surname AS Фамилия, name AS Имя, middle_name AS Отчество, date_of_issue, document_id FROM issues_archive
UNION ALL
SELECT surname AS Фамилия, name AS Имя, middle_name AS Отчество, date_of_issue, document_id FROM issues
	INNER JOIN abonent ON abonent.abonent_id = issues.abonent_id
    INNER JOIN instance ON instance.instance_id = issues.instance_id
) AS takers_info
WHERE document_id = (SELECT document_id FROM document WHERE document_title='Политика организации по охране труда')
ORDER BY date_of_issue DESC
LIMIT 1;

-- Есть ли в архиве пустые стеллажи, полки, ячейки, и в каком количестве?
WITH free_cells AS (
SELECT cell.cell_id, rack.rack_id, shelf.shelf_id, CASE WHEN document_id IS NULL THEN 1 ELSE 0 END AS cell_empty FROM cell
  	INNER JOIN rack ON rack.rack_id = cell.rack_id
  	INNER JOIN shelf ON shelf.shelf_id = rack.shelf_id
	LEFT JOIN document ON document.cell_id = cell.cell_id
),
free_racks AS (
	SELECT rack_id FROM free_cells
	GROUP BY rack_id
	HAVING COUNT(*) = SUM(cell_empty)
),
free_shelfs AS (
	SELECT shelf_id FROM free_cells
	GROUP BY shelf_id
	HAVING COUNT(*) = SUM(cell_empty)
)
SELECT 'Ячеек' AS Название, SUM(cell_empty) AS Количество FROM free_cells
UNION ALL
SELECT 'Полок' AS Название, COUNT(rack_id) AS Количество FROM free_racks
UNION ALL
SELECT 'Стелажей' AS Название, COUNT(shelf_id) AS Количество FROM free_shelfs;

-- Список документов, не востребованных в течение более, чем 5 лет?
WITH all_issues AS (
	SELECT document_id, date_of_issue FROM issues
  		INNER JOIN instance ON instance.instance_id = issues.instance_id
  	UNION ALL
  	SELECT document_id, date_of_issue FROM issues_archive
)
SELECT document.document_id, document_title, theme_name, MAX(date_of_issue) AS Дата_последней_выдачи FROM document
	LEFT JOIN all_issues ON document.document_id = all_issues.document_id
   	GROUP BY document.document_id
    HAVING MAX(date_of_issue) IS NULL OR age(MAX(date_of_issue)) > interval '5 years';
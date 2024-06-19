CREATE TABLE breed
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE club
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE ring
(
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE show
(
    breed_id BIGSERIAL,
    ring_id  BIGSERIAL REFERENCES ring(id) ON DELETE SET NULL,
    date     DATE,
    PRIMARY KEY (breed_id, ring_id, date)
);

CREATE TABLE expert
(
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    club_id BIGSERIAL REFERENCES club(id) ON DELETE CASCADE,
    ring_id BIGSERIAL REFERENCES ring(id) ON DELETE SET NULL
);

CREATE TABLE owner
(
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    age     INTEGER NOT NULL,
    club_id BIGSERIAL REFERENCES club(id) ON DELETE SET NULL
);

CREATE TABLE dog
(
    id       BIGSERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    age      INTEGER NOT NULL,
    breed_id BIGSERIAL REFERENCES breed(id) ON DELETE CASCADE,
    owner_id BIGSERIAL REFERENCES owner(id) ON DELETE SET NULL
);

CREATE TABLE medal
(
    id       BIGSERIAL PRIMARY KEY,
    rank     INTEGER,
    breed_id BIGSERIAL REFERENCES breed(id) ON DELETE SET NULL,
    dog_id   BIGSERIAL REFERENCES dog(id) ON DELETE CASCADE
);

CREATE TABLE pedigree
(
    father_id BIGSERIAL REFERENCES dog(id) ON DELETE SET NULL,
    son_id    BIGSERIAL REFERENCES dog(id) ON DELETE CASCADE,
    PRIMARY KEY (father_id, son_id)
);

INSERT INTO breed (name)
VALUES ('Labrador'),
       ('Poodle'),
       ('Bulldog'),
       ('Pug'),
       ('Chihuahua');

INSERT INTO club (name)
VALUES ('Paws and Claws'),
       ('Fluffy Friends'),
       ('Doggy Pals'),
       ('Tails and Scales'),
       ('Loyal Companions');

INSERT INTO ring
VALUES (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT),
       (DEFAULT);

INSERT INTO show (breed_id, ring_id, date)
VALUES (1, 1, '2023-10-24'),
       (2, 2, '2023-10-24'),
       (1, 4, '2023-11-10'),
       (2, 1, '2023-11-10'),
       (3, 5, '2023-11-10');

INSERT INTO expert (name, club_id, ring_id)
VALUES ('John Smith', 1, 1),
       ('Alex Mercer', 3, 1),
       ('Jane Doe', 3, 2),
       ('Bob Jones', 2, 3),
       ('Sally Brown', 5, 4),
       ('Fred Bloggs', 4, 5);

INSERT INTO owner (name, age, club_id)
VALUES ('Alice', 20, 1),
       ('Bob', 50, 2),
       ('Charlie', 18, 3),
       ('Daisy', 22, 4),
       ('Eve', 30, 5);

INSERT INTO dog (name, age, breed_id, owner_id)
VALUES ('Rex', 6, 1, 1),
       ('Spot', 12, 1, 2),
       ('Rover', 3, 2, 3),
       ('Fido', 6, 2, 4),
       ('Buddy', 7, 2, 5),
       ('Duke', 8, 3, 5);

INSERT INTO medal (rank, breed_id, dog_id)
VALUES (1, 1, 2),
       (2, 1, 1),
       (1, 2, 4),
       (2, 2, 3),
       (3, 2, 5),
       (2, 1, 1),
       (1, 2, 3),
       (3, 2, 5),
       (2, 3, 6);

INSERT INTO pedigree (father_id, son_id)
VALUES (2, 1),
       (5, 3);

-- 1.1. На каком ринге 2023-11-10 выступает хозяин с идентификатором 5?
SELECT ring.id AS ring_id
FROM ring
    INNER JOIN show s on ring.id = s.ring_id
    INNER JOIN breed b on s.breed_id = b.id
    INNER JOIN dog d on b.id = d.breed_id
    INNER JOIN owner o on d.owner_id = o.id
WHERE date = '2023-11-10'::DATE AND o.id = 5::BIGINT;

-- 1.2. На каком ринге выступает хозяин?
SELECT o.id, s.date, ring.id AS ring_id
FROM ring
    INNER JOIN show s on ring.id = s.ring_id
    INNER JOIN breed b on s.breed_id = b.id
    INNER JOIN dog d on b.id = d.breed_id
    INNER JOIN owner o on d.owner_id = o.id
ORDER BY o.id, s.date, ring.id;

-- 2. Какими породами представлен клуб?
SELECT DISTINCT o.club_id, string_agg(b.name, ', ') AS breeds
FROM breed b
    INNER JOIN dog d on b.id = d.breed_id
    INNER JOIN owner o on d.owner_id = o.id
GROUP BY o.club_id
ORDER BY o.club_id;

-- 3. Какие медали и сколько заслужены клубом?
SELECT o.club_id, m.rank, COUNT(m.rank) AS medal_count
FROM medal m
    INNER JOIN dog d on m.dog_id = d.id
    INNER JOIN owner o on d.owner_id = o.id
GROUP BY o.club_id, m.rank
ORDER BY o.club_id, m.rank;

-- 4. Какие эксперты обслуживают породу?
SELECT DISTINCT b.name, string_agg(e.name, ', ') AS experts
FROM expert e
    INNER JOIN show s on s.ring_id = e.ring_id
    INNER JOIN breed b on s.breed_id = b.id
GROUP BY b.name
ORDER BY b.name;

-- 5. Количество участников по каждой породе?
SELECT b.name, COUNT(d.id) AS dog_count
FROM breed b
    INNER JOIN dog d on b.id = d.breed_id
GROUP BY b.name
ORDER BY dog_count DESC, b.name;
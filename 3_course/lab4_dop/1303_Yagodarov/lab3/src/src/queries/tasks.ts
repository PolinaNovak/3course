import {Ring} from "../models/ring.model";
import {Show} from "../models/show.model";
import {Breed} from "../models/breed.model";
import {Dog} from "../models/dog.model";
import {Owner} from "../models/owner.model";
import * as fs from "fs";
import {QueryTypes} from "sequelize";
import {Sequelize} from "sequelize-typescript";

export async function doTasks(sequelize: Sequelize) {
  let t1 = Ring.findAll({
    attributes: ['id'],
    include: [
      {
        attributes: [],
        model: Show,
        required: true,
        include: [
          {
            attributes: [],
            model: Breed,
            required: true,
            include: [
              {
                attributes: [],
                model: Dog,
                required: true,
                include: [
                  {
                    attributes: [],
                    model: Owner,
                    required: true,
                    where: {
                      id: 5,
                    },
                  },
                ],
              },
            ],
          },
        ],
        where: {
          date: new Date('2023-11-10'),
        }
      },
    ],
  }).then((res) => {
    const task = '1. На каком ринге 2023-11-10 выступает хозяин с идентификатором 5?\n';
    fs.writeFileSync('result.txt', task + JSON.stringify(res, null, 2) + '\n\n');
  });

  let t2 = Owner.findAll({
    attributes: ['club_id'],
    include: [
      {
        attributes: ['breed_id'],
        model: Dog,
        required: true,
        include: [
          {
            attributes: ['name'],
            model: Breed,
            required: true,
          },
        ],
      },
    ],
  }).then((res) => {
    const task = '2. Какими породами представлен клуб?\n';
    fs.appendFileSync('result.txt', task + JSON.stringify(res, null, 2) + '\n\n');
  });

  let t3 = sequelize.query('' +
    'SELECT owners.club_id, medals.rank, COUNT(medals.rank) AS medalCount\n' +
    'FROM medals\n' +
    '    INNER JOIN dogs on medals.dog_id = dogs.id\n' +
    '    INNER JOIN owners on dogs.owner_id = owners.id\n' +
    'GROUP BY owners.club_id, medals.rank\n' +
    'ORDER BY owners.club_id, medals.rank;', {type: QueryTypes.SELECT}).then((res) => {
    const task = '3. Какие медали и сколько заслужены клубом??\n';
    fs.appendFileSync('result.txt', task + JSON.stringify(res, null, 2) + '\n\n');
  });

  let t4 = sequelize.query('' +
    'SELECT DISTINCT breeds.name, string_agg(experts.name, \', \') AS experts\n' +
    'FROM experts\n' +
    '    INNER JOIN shows on shows.ring_id = experts.ring_id\n' +
    '    INNER JOIN breeds on shows.breed_id = breeds.id\n' +
    'GROUP BY breeds.name\n' +
    'ORDER BY breeds.name;', {type: QueryTypes.SELECT}).then((res) => {
    const task = '4. Какие эксперты обслуживают породу?\n';
    fs.appendFileSync('result.txt', task + JSON.stringify(res, null, 2) + '\n\n');
  });

  let t5 = sequelize.query('' +
    'SELECT breeds.name, COUNT(dogs.id) AS dog_count\n' +
    'FROM breeds\n' +
    '    INNER JOIN dogs on breeds.id = dogs.breed_id\n' +
    'GROUP BY breeds.name\n' +
    'ORDER BY dog_count DESC, breeds.name;', {type: QueryTypes.SELECT}).then((res) => {
    const task = '5. Количество участников по каждой породе?\n';
    fs.appendFileSync('result.txt', task + JSON.stringify(res, null, 2) + '\n\n');
  });

  await Promise.all([t1, t2, t3, t4, t5]);
}
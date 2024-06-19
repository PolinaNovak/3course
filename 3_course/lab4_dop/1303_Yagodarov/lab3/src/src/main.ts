import {Sequelize} from "sequelize-typescript";

import {Breed} from "./models/breed.model";
import {Club} from "./models/club.model";
import {Ring} from "./models/ring.model";
import {Show} from "./models/show.model";
import {Expert} from "./models/expert.model";
import {Owner} from "./models/owner.model";
import {Dog} from "./models/dog.model";
import {Medal} from "./models/medal.model";
import {Pedigree} from "./models/pedigree.model";
import {insertValues} from "./queries/insert";
import {doTasks} from "./queries/tasks";

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  port: 5432,
  database: 'lb3',
});

sequelize.addModels([Breed, Club, Ring, Show, Expert, Owner, Dog, Medal, Pedigree]);

await sequelize.authenticate();

await sequelize.sync({force: true});

await insertValues();
await doTasks(sequelize);

await sequelize.close();
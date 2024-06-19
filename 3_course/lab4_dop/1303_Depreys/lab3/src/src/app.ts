import {Sequelize} from "sequelize-typescript";
import {Worker} from "./models/worker.model.js";
import {Cell} from "./models/cell.model.js";
import {Breed} from "./models/breed.model.js";
import {Chicken} from "./models/chicken.model.js";
import {WatchingChickenInCage} from "./models/watching_chicken_in_cage.model.js";
import {fill} from "./queries/fill_queries.js";
import {makeTasks} from "./queries/task_queries.js";

let sequelize = new Sequelize("BirdFactory",
    "postgres",
    "1",
    {
        host: "localhost",
        dialect: "postgres",
    });

sequelize.addModels(
    [Worker,
    Cell,
    Breed,
    Chicken,
    WatchingChickenInCage]);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({force: true});
    await fill(sequelize);
    await makeTasks(sequelize);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

await sequelize.close();

console.log("done");
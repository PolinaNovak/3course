import {Sequelize} from "sequelize-typescript";
import {Worker} from "./models/worker.model.js";
import {Cell} from "./models/cell.model.js";
import {Breed} from "./models/breed.model.js";
import {Chicken} from "./models/chicken.model.js";
import {WatchingChickenInCage} from "./models/watching_chicken_in_cage.model.js";
import {makeTasks} from "./queries/task_queries.js";
import {fakeFill} from "./queries/fake_fill_queries.js";
import {makeOrderedTasks} from "./queries/ordered_queries.js";

let sequelize = new Sequelize("BirdFactory",
    "postgres",
    "1",
    {
        host: "localhost",
        dialect: "postgres",
        logging: false
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
    console.log("")
    console.time();
    await fakeFill(1000000);
    console.timeEnd();
    console.log("\n")
    await makeTasks(sequelize);
    console.log("\n\n Ordered queries \n\n");
    await makeOrderedTasks(sequelize);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

await sequelize.close();

console.log("done");
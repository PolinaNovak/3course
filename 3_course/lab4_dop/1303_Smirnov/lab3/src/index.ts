import {Sequelize} from 'sequelize-typescript';
import {Shelf} from "./models/shelf";
import {Rack} from "./models/rack";
import {Cell} from "./models/cell";
import {Document} from "./models/document";
import {Issues} from "./models/issues";
import {Instance} from "./models/instance";
import {Department} from "./models/department";
import {Abonent} from "./models/abonent";
import {IssuesArchive} from "./models/issues_archive";
import fillTables from "./queries/fillTables";
import taskQuery from "./queries/task";


const sequelize = new Sequelize("Archive",
    "postgres",
    "12345",
    {
        host: "localhost",
        dialect: "postgres"
    })

sequelize.addModels([
    Shelf,
    Rack,
    Cell,
    Document,
    Instance,
    Department,
    Abonent,
    Issues,
    IssuesArchive
])

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    await fillTables();
    await taskQuery(sequelize);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

await sequelize.close()

console.log("Tasks done");
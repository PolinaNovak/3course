import { sequelize } from "../index.js";
import { Schedule } from "../models/Schedule.js";
import { Sponsor } from "../models/Sponsor.js";
import { Stadium } from "../models/stadium.js";
import { Team } from "../models/team.js";
import { TeamGame } from "../models/TeamGame.js";
import { Player } from "../models/player.js";
import { Op, Sequelize } from "sequelize";
import { generateDataBase } from "./fake.js";

const count = 1000000;
let dateForQuery = "";
let teamForQuery1 = "";
let teamForQuery2 = "";
let cityForQuery = "";

try {
    await sequelize.authenticate();
    console.log('\nConnection has been established successfully!!\n');
    await sequelize.sync({ force: true }).then(() => {
        console.log("\nall models created successfuly")
    });

    Player.belongsTo(Team, { foreignKey: "teamName" })
    Team.hasMany(Player, { foreignKey: "teamName" })

    Schedule.belongsTo(Sponsor, { foreignKey: "sponsorName" })
    Sponsor.hasMany(Schedule, { foreignKey: "sponsorName" })

    Schedule.belongsTo(Stadium, { foreignKey: "stadiumName" })
    Stadium.hasMany(Schedule, { foreignKey: "stadiumName" })

    TeamGame.belongsTo(Team, { foreignKey: "teamName" })
    Team.hasMany(TeamGame, { as: "tN1", foreignKey: "teamName1" })

    TeamGame.belongsTo(Team, { foreignKey: "teamName" })
    Team.hasMany(TeamGame, { as: "tN2", foreignKey: "teamName2" })

    TeamGame.belongsTo(Schedule, { foreignKey: "id_game" }) ///?
    Schedule.hasMany(TeamGame, { foreignKey: "id_game" })

    await completeRandom(count);
    console.log("completed filling");
    await queries();

    await sequelize.close().then(() => {
        console.log("\nConnection closed\n")
    });
} catch (error) {
    console.error('\nFailed((\n', error);
}

async function queries() {
    console.time();

    const res = await Player.findAll({
        attributes: ["firstName", "lastName", "goals"],
        where: {
            goals: await Player.max("goals")
        },
        limit: 1,
        // order: [["goals", "DESC"]]
    });
    console.timeEnd()
    console.log("1. Игрок, забивший в турнире наибольшее количество мячей:", JSON.stringify(res, null, 2), "\n\n");

    console.time()
    const young = await Player.findAll({
        attributes: ["firstName", "lastName", "age"],
        where: {
            age: await Player.min("age")
        },
        limit: 1,
        // order: [["age", "ASC"]]
    })
    console.timeEnd();
    console.log("2. Самый молодой участник турнира:", JSON.stringify(young, null, 2), "\n\n")

    console.time()
    const teams = await Team.findAll({
        attributes: ["teamName", "place"],
        where: {
            place: {
                [Op.lte]: 3
            }
        },
        // limit: 3,
        // order: [["place", "ASC"]]
    })
    console.timeEnd()
    console.log("3. Команды, занявшие призовые места:", JSON.stringify(teams, null, 2), "\n\n")

    console.time()
    const dates = await Schedule.findAll({
        attributes: ["date", "score1", "score2"],
        include: {
            model: TeamGame,
            attributes: ["teamName1", "teamName2"],
            required: true,
            where: {
                [Op.or]: [
                    { teamName1: teamForQuery1 },
                    { teamName2: teamForQuery1 },
                ]
            },
            // order: [["teamName1", "ASC"]]
        },
        limit: 1,
    })
    console.timeEnd()
    console.log(`4. Даты встреч команды ${teamForQuery1}, ее противники и счет:`, JSON.stringify(dates, null, 2), "\n\n")

    console.time()
    const price = await Schedule.findAll({
        attributes: ["price"],
        include: {
            model: TeamGame,
            attributes: [],
            required: true,
            where: {
                [Op.or]: [
                    { [Op.and]: [{ teamName1: teamForQuery1 }, { teamName2: teamForQuery2 }] },
                    { [Op.and]: [{ teamName2: teamForQuery1 }, { teamName1: teamForQuery2 }] }
                ]
            }
        },
        // order: [["id_game", "ASC"]]
    })
    console.timeEnd();
    console.log(`5. Цена билета на матч между командами ${teamForQuery1} и ${teamForQuery2}:`, JSON.stringify(price, null, 2), "\n\n")

    console.time();
    const players = await sequelize.query(`
    SELECT "number", "lastName"
    FROM "Player"
    JOIN "TeamGame" ON "TeamGame"."teamName1" = "Player"."teamName" OR "TeamGame"."teamName2" = "Player"."teamName" 
    JOIN "Schedule" ON "TeamGame"."id_game" = "Schedule"."id_game"
    JOIN "Stadium" ON "Schedule"."stadiumName" = "Stadium"."stadiumName"
    WHERE "Stadium"."city" = '${cityForQuery}' AND "Schedule"."date" = '${dateForQuery}'
    LIMIT 1;`,//ORDER BY "number"
        { type: sequelize.QueryTypes.SELECT })
    console.timeEnd();
    console.log(`6. Номера и Фамилии игроков команд, участвовахших во встрече, которая проходила ${dateForQuery} в ${cityForQuery}:`, JSON.stringify(players, null, 2), "\n\n")

    console.time();
    const teamsDiff = await sequelize.query(
        `CREATE TEMPORARY TABLE "Difference" AS
        SELECT "teamName1" AS "team", ("Schedule"."score1" - "Schedule"."score2") AS "diff"
        FROM "TeamGame"
        JOIN "Schedule" ON "TeamGame"."id_game" = "Schedule"."id_game"
        UNION
        SELECT "teamName2" AS "team", ("Schedule"."score2" - "Schedule"."score1") AS "diff"
        FROM "TeamGame"
        JOIN "Schedule" ON "TeamGame"."id_game" = "Schedule"."id_game";


        SELECT "team", "diff"
        FROM "Difference"
        WHERE "diff" = (SELECT MIN("diff") FROM "Difference")
	        OR
	        "diff" = (SELECT MAX("diff") FROM "Difference")
        LIMIT 1;`,//ORDER BY diff ASC
        { type: sequelize.QueryTypes.SELECT })
    console.timeEnd();
    console.log("7. Комманды с наилучшей и наихудшей разницей забитых и пропущенных мячей", JSON.stringify(teamsDiff, null, 2))
}

function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
}

async function completeRandom(count) {
    const DataBase = generateDataBase(count);
    console.log("\nСгенерированна база");
    dateForQuery = DataBase.dates[0];
    teamForQuery1 = DataBase.teamNames[0];
    teamForQuery2 = DataBase.teamNames[1];
    cityForQuery = DataBase.cities[0];

    // console.log(JSON.stringify(DataBase, null, 2));
    //{ teamNames, sponsorNames, stadiumNames, players, cities, coaches, dates};

    await Player.bulkCreate(
        DataBase.players.map((player, index) => ({
            teamName: DataBase.teamNames[index],
            ...player,
            age: randomInt(18, 60),
            role: ["Защитник", "Полузащитник", "Нападающий", "Вратарь"].at(randomInt(0, 3)),
            number: randomInt(1, 1000),
            goals: randomInt(0, 100),
            id_player: index + 1
        })),
        { returning: false }
    )
    console.log("Игроки заполнены");

    await Team.bulkCreate(
        DataBase.teamNames.map((teamName, index) => ({
             teamName,
             coach: DataBase.coaches[index],
             city: DataBase.cities[index],
             place: index+1
            })),
        { returning: false }
    )
    console.log("Команды заполнены");


    await Sponsor.bulkCreate(
        DataBase.sponsorNames.map(sponsorName => ({ sponsorName })),
        { returning: false }
    )
    console.log("Спонсоры заполнены");


    await Stadium.bulkCreate(
        DataBase.stadiumNames.map((stadiumName, index) => ({
             stadiumName,
             city: DataBase.cities[index],
             capacity: randomInt(1, 1000000)
            })),
        { returning: false }
    )
    console.log("Стадионы заполнены");

    await Schedule.bulkCreate(
        DataBase.dates.map((date, index) => ({
            id_game: index,
            date,
            score1: randomInt(0, 100),
            score2: randomInt(0, 100),
            price: randomInt(0, 10000),
            stadiumName: DataBase.stadiumNames[index],
            sponsorName: DataBase.sponsorNames[index]
        })),
        { returning: false }
    )
    console.log("Расписания заполнены");

    await TeamGame.bulkCreate(
        DataBase.teamNames.map((teamName, index) => ({
            id_game: index,
            teamName1: teamName,
            teamName2: index+1 == count ? DataBase.teamNames[0] : DataBase.teamNames[index+1]
            })),
        { returning: false }
    )
    console.log("Игры заполнены");
}

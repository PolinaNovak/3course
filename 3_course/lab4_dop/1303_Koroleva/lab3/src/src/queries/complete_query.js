import { sequelize } from "../index.js";
import { Schedule } from "../models/Schedule.js";
import { Sponsor } from "../models/Sponsor.js";
import { Stadium } from "../models/stadium.js";
import { Team } from "../models/team.js";
import { TeamGame } from "../models/TeamGame.js";
import { Player } from "../models/player.js";
import { Op, Sequelize } from "sequelize";

try {
    await sequelize.authenticate();
    console.log('\nConnection has been established successfully!!\n');
    await sequelize.sync({ force: true }).then(() => {
        console.log("\nall models created successfuly")
    });

    await complete();
    await queries();

    await sequelize.close().then(() => {
        console.log("\nConnection closed\n")
    });
} catch (error) {
    console.error('\nFailed((\n', error);
}

async function complete() {
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

    let PLAYERS = [
        ['Балтика', 'Лазарев', 'Владислав', 21, 'Полузащитник', 89, 1],
        ['Балтика', 'Шишкин', 'Федор', 20, 'Нападающий', 52, 7],
        ['Зенит', 'Мостовой', 'Андрей', 25, 'Полузащитник', 17, 0],
        ['Зенит', 'Самохин', 'Кирилл', 22, 'Нападающий', 8, 12],
        ['Динамо', 'Смолов', 'Фёдор', 33, 'Нападающий', 10, 5],
        ['Динамо', 'Дудко', 'Максим', 33, 'Вратарь', 2, 28],
        ['Локомотив', 'Дзюба', 'Артём', 35, 'Нападающий', 7, 3],
        ['Локомотив', 'Баринов', 'Дмитрий', 27, 'Полузащитник', 6, 0],
        ['Рубин', 'Рыбус', 'Мацей', 30, 'Защитник', 31, 0],
        ['Рубин', 'Кашуба', 'Данил', 19, 'Нападающий', 37, 5]
    ]

    await Player.bulkCreate(
        PLAYERS.map((player, index) => ({
            id_player: index + 1,
            teamName: player[0],
            lastName: player[1],
            firstName: player[2],
            age: player[3],
            role: player[4],
            number: player[5],
            goals: player[6],
        })),
        { returning: false }
    )

    let TEAMS = [
        ['Балтика', 'Калининград', 'Королев А.Л.', 1],
        ['Зенит', 'Санкт-Петербург', 'Гирман А.В.', 2],
        ['Динамо', 'Москва', 'Смирнов Д.Ю.', 3],
        ['Локомотив', 'Москва', 'Королева П.А.', 4],
        ['Рубин', 'Казань', 'Иевлев Е.А.', 5]
    ]

    await Team.bulkCreate(
        TEAMS.map(team => ({
            teamName: team[0],
            city: team[1],
            coach: team[2],
            place: team[3],
        })),
        { returning: false }
    )

    const SPONSORS = [
        'Fonbet',
        'Мир Российская Премьер Лига',
        'ЧЕ-2024',
        'Лига Чемпионов',
        'OLIMPBET'
    ]

    await Sponsor.bulkCreate(
        SPONSORS.map(sponsor => ({
            sponsorName: sponsor
        })),
        { returning: false }
    )

    const STADIUM = [
        ['Лужники', 'Москва', 76880],
        ['Газпром Арена', 'Санкт-Петербург', 64448],
        ['Динамо', 'Воронеж', 10880],
        ['Сибсельмаш', 'Новосибирск', 13000],
        ['Барс', 'Казань', 45379]
    ]

    await Stadium.bulkCreate(
        STADIUM.map(stadium => ({
            stadiumName: stadium[0],
            city: stadium[1],
            capacity: stadium[2]
        })),
        { returning: false }
    )

    const SCHEDULE = [
        [1, '2023-12-13', 3, 1, 7000, 'Лужники', 'Fonbet'],
        [2, '2023-12-17', 1, 0, 7000, 'Лужники', 'Fonbet'],
        [3, '2024-02-05', 2, 7, 3000, 'Газпром Арена', 'ЧЕ-2024'],
        [4, '2024-03-01', 0, 1, 3000, 'Газпром Арена', 'ЧЕ-2024'],
        [5, '2024-04-10', 6, 9, 1000, 'Динамо', 'OLIMPBET']
    ]

    await Schedule.bulkCreate(
        SCHEDULE.map(schedule => ({
            id_game: schedule[0],
            date: schedule[1],
            score1: schedule[2],
            score2: schedule[3],
            price: schedule[4],
            stadiumName: schedule[5],
            sponsorName: schedule[6],
        })),
        { returning: false }
    )

    const TEAMDAME = [
        [1, 'Балтика', 'Зенит'],
        [2, 'Зенит', 'Локомотив'],
        [3, 'Локомотив', 'Рубин'],
        [4, 'Рубин', 'Динамо'],
        [5, 'Динамо', 'Балтика']
    ]

    await TeamGame.bulkCreate(
        TEAMDAME.map(teamGame => ({
            id_game: teamGame[0],
            teamName1: teamGame[1],
            teamName2: teamGame[2],
        })),
        { returning: false }
    )
}

async function queries() {
    const res = await Player.findAll({
        attributes: ["firstName", "lastName", "goals"],
        where: {
            goals: await Player.max("goals") //sequelize.fn("MAX", sequelize.col("goals"))
        }
    });
    console.log("\nИгрок, забивший в турнире наибольшее количество мячей:", JSON.stringify(res, null, 2), "\n");

    const young = await Player.findAll({
        attributes: ["firstName", "lastName", "age"],
        where: {
            age: await Player.min("age")
        }
    })
    console.log("\nСамый молодой участник турнира:", JSON.stringify(young, null, 2), "\n")

    const teams = await Team.findAll({
        attributes: ["teamName", "place"],
        where: {
            place: {
                [Op.lte]: 3
            }
        }
    })
    console.log("\nКоманды, занявшие призовые места:", JSON.stringify(teams, null, 2), "\n")

    const dates = await Schedule.findAll({
        attributes: ["date", "score1", "score2"],
        include: {
            model: TeamGame,
            attributes: ["teamName1", "teamName2"],
            required: true,
            where: {
                [Op.or]: [
                    { teamName1: "Локомотив" },
                    { teamName2: "Локомотив" },
                ]
            }
        },
        raw: true
    })
    console.log("\nДаты встреч команды Локомотив, ее противники и счет:", JSON.stringify(dates, null, 2), "\n")

    const price = await Schedule.findAll({
        attributes: ["price"],
        include: {
            model: TeamGame,
            attributes: [],
            required: true,
            where: {
                [Op.or]: [
                    { [Op.and]: [{ teamName1: "Балтика" }, { teamName2: "Динамо" }] },
                    { [Op.and]: [{ teamName2: "Балтика" }, { teamName1: "Динамо" }] }
                ]
            }
        },
        raw: true
    })
    console.log("\nЦена билета на матч между командами 'Балтика' и 'Динамо':", JSON.stringify(price, null, 2), "\n")


    const players = await Player.findAll({
        attributes: ["number", "lastName"],
        where: {
            [Op.and]: [
                {
                    [Op.or]: [{ "$Team->tN1->Schedule->Stadium.city$": "Санкт-Петербург" }, { "$Team->tN2->Schedule->Stadium.city$": "Санкт-Петербург" }]
                },
                {
                    [Op.or]: [{ "$Team->tN1->Schedule.date$": "2024-02-05" }, { "$Team->tN2->Schedule.date$": "2024-02-05" }]
                }
            ]
        },
        include: {
            model: Team,
            required: true,
            attributes: [],
            include: [
                {
                    model: TeamGame,
                    as: "tN1",
                    attributes: [],
                    required: true,
                    include: {
                        model: Schedule,
                        attributes: [],
                        required: true,
                        include: {
                            model: Stadium,
                            required: true,
                            attributes: [],
                        }
                    }
                },
                {
                    model: TeamGame,
                    as: "tN2",
                    attributes: [],
                    required: true,
                    include: {
                        model: Schedule,
                        attributes: [],
                        required: true,
                        include: {
                            model: Stadium,
                            attributes: [],
                            required: true,
                        }
                    }
                },
            ]
        },
        raw: true
    })
    console.log("\nНомера и Фамилии игроков команд, участвовахших во встрече, которая проходила 2024-02-05 в Санкт-Петербурге:", JSON.stringify(players, null, 2), "\n")


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
	        "diff" = (SELECT MAX("diff") FROM "Difference");`,
        { type: sequelize.QueryTypes.SELECT })
        console.log("\nКомманды с наилучшей и наихудшей разницей забитых и пропущенных мячей", JSON.stringify(teamsDiff, null, 2))
}



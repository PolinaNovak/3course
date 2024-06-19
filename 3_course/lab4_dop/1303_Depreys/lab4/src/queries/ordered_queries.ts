import {Sequelize} from "sequelize-typescript";
import {Worker} from "../models/worker.model.js";
import {Cell} from "../models/cell.model.js";
import {Breed} from "../models/breed.model.js";
import {Chicken} from "../models/chicken.model.js";
import {WatchingChickenInCage} from "../models/watching_chicken_in_cage.model.js";
import {Op} from "sequelize";

export async function makeOrderedTasks(sequelize: Sequelize){

    console.log("Какое количество яиц получают от каждой курицы данного веса, породы, возраста?");
    console.time();
    await Chicken.findAll({
        attributes: ["chicken_id", "eggs_per_month"],
        where: {
            weight: {
                [Op.and]: {
                    [Op.lt]: 1.95 + 0.0001,
                    [Op.gt]: 1.95 - 0.0001,
                }
            }
        },
        limit: 10,
        order: [["eggs_per_month", "DESC"]]
    });
    console.timeEnd();
    console.log("\n");




    console.log("В каких клетках находятся куры указанного возраста с заданным номером диеты?");
    console.time();
    await Cell.findAll({
        include:[
            {
                model: WatchingChickenInCage,
                required: true,
                attributes: [],
                include:[
                    {
                        model: Chicken,
                        required: true,
                        attributes:[],
                        where:{ age: 2 },
                        include:[
                            {
                                model: Breed,
                                required: true,
                                where:{
                                    recommended_diet_number: 1
                                }
                            }
                        ]
                    }
                ]
            },
        ],
        limit: 10,
        order: [["cell_number","DESC"]]
    });
    console.timeEnd();
    console.log("\n");

    console.log("Сколько яиц в день приносят куры указанного работника?");
    console.time();
    await Chicken.findAll({
        attributes: [[sequelize.literal('(SUM(eggs_per_month) / 30.44)'), 'eggs_per_day']],
        include:[
            {
                model: WatchingChickenInCage,
                required: true,
                attributes: [],
                include: [{
                    model: Worker,
                    required: true,
                    where: {
                        worker_id: 2
                    },
                    attributes: []
                }]
            }
        ],
        group: ['watching_chicken_in_cages->worker.worker_id'],
        order: [[sequelize.literal('(SUM(eggs_per_month) / 30.44)'), "DESC"]],
        limit: 10
    });
    console.timeEnd();
    console.log("\n");

    console.log("Среднее количество яиц, которое получает в день каждый работник от обслуживаемых им кур?");
    console.time();
    await WatchingChickenInCage.findAll({
        attributes: ["worker_id",[sequelize.literal('(SUM(average_eggs_per_month) / 30.44)'), 'average_eggs_per_day']],
        include:[
            {
                model: Chicken,
                required: true,
                attributes: [],
                include: [{
                    model: Breed,
                    required: true,
                    attributes: []
                }]
            },
        ],
        group: ['worker_id'],
        order: [[sequelize.literal('(SUM(average_eggs_per_month) / 30.44)'), "DESC"]]
    });
    console.timeEnd();
    console.log("\n");

}
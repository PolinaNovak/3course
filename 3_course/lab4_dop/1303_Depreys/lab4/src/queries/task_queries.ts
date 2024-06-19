import {Sequelize} from "sequelize-typescript";
import {Worker} from "../models/worker.model.js";
import {Cell} from "../models/cell.model.js";
import {Breed} from "../models/breed.model.js";
import {Chicken} from "../models/chicken.model.js";
import {WatchingChickenInCage} from "../models/watching_chicken_in_cage.model.js";
import {Op} from "sequelize";
import * as fs from "fs";

export async function makeTasks(sequelize: Sequelize){

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
        limit: 10
    });
    console.timeEnd();
    console.log("\n");


    console.log("В каком цехе наибольшее количество кур определенной породы?");
    console.time();
    await Cell.findAll({
        attributes:["workshop_number"],
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
                        where:{ breed_name: 'Орловские куры' }
                    }
                ]
            },
        ],

        group: ['workshop_number'],
        order: [[sequelize.fn('COUNT', sequelize.col('workshop_number')), 'DESC']],
        limit: 1,
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
        limit: 10
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
    });
    console.timeEnd();
    console.log("\n");

    console.log("В каком цехе находится курица, от которой получают больше всего яиц?");
    console.time();
    await WatchingChickenInCage.findAll({
        attributes: [],
        include:[
            {
                model: Chicken,
                required: true,
                attributes: [],
            },
            {
                model: Cell,
                required: true,
                attributes: ["workshop_number"]
            }
        ],
        order: [[sequelize.col('chicken.eggs_per_month'), "DESC"]],
        limit: 1
    });
    console.timeEnd();
    console.log("\n");

    console.log("Сколько кур каждой породы в каждом цехе?");
    console.time();
    await Chicken.findAll({
        attributes: [[sequelize.fn("COUNT", sequelize.col('workshop_number')), "count"],
            [sequelize.literal("workshop_number"), "workshop_number"]],
        include:[
            {
                model: Breed,
                required: false,
                attributes: ["breed_name"],
            },
            {
                model: WatchingChickenInCage,
                required: true,
                attributes:[],
                include: [
                    {
                        model:Cell,
                        required: true,
                        attributes: []
                    }
                ]
            }
        ],
        group: [sequelize.col('workshop_number'), sequelize.col('breed.breed_name')],
        order: [[sequelize.col('workshop_number'), "ASC"], [sequelize.col('breed.breed_name'), "ASC"]],
        limit: 10
    });
    console.timeEnd();
    console.log("\n");
}
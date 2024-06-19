import {Sequelize} from "sequelize-typescript";
import {Worker} from "../models/worker.model.js";
import {Cell} from "../models/cell.model.js";
import {Breed} from "../models/breed.model.js";
import {Chicken} from "../models/chicken.model.js";
import {WatchingChickenInCage} from "../models/watching_chicken_in_cage.model.js";
import {Op} from "sequelize";
import * as fs from "fs";

export async function makeTasks(sequelize: Sequelize){


    await Chicken.findAll({
        attributes: ["chicken_id", "eggs_per_month"],
        where: {
            weight: {
                [Op.and]: {
                    [Op.lt]: 1.95 + 0.0001,
                    [Op.gt]: 1.95 - 0.0001,
                }
            }
        }
    }).then((res) => {
        let task = "Какое количество яиц получают от каждой курицы данного веса, породы, возраста?\n"
        fs.writeFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });


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
    }).then((res) => {
        let task = "В каком цехе наибольшее количество кур определенной породы?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });

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
        ]
    }).then((res) => {
        let task = "В каких клетках находятся куры указанного возраста с заданным номером диеты?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });


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
        group: ['watching_chicken_in_cages->worker.worker_id']
    }).then((res) => {
        let task = "Сколько яиц в день приносят куры указанного работника?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });


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
        group: ['worker_id']
    }).then((res) => {
        let task = "Среднее количество яиц, которое получает в день каждый работник от обслуживаемых им кур?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });

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
    }).then((res) => {
        let task = "В каком цехе находится курица, от которой получают больше всего яиц?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });

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
        order: [[sequelize.col('workshop_number'), "ASC"], [sequelize.col('breed.breed_name'), "ASC"]]
    }).then((res) => {
        let task = "Сколько кур каждой породы в каждом цехе?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });

    await Worker.findAll({
        attributes: ["worker_id",
            [sequelize.fn("COUNT", sequelize.col("watching_chicken_in_cage_id")), "count"]],
        include:[
            {
                model: WatchingChickenInCage,
                required: false,
                attributes: []
            }
        ],
        group: ["Worker.worker_id"],
        order: [[sequelize.col('Worker.worker_id'), "ASC"]]
    }).then((res) => {
        let task = "Какое количество кур обслуживает каждый работник?\n"
        fs.appendFileSync('result.txt',task + JSON.stringify(res, null, 2) + "\n\n");
    });
}
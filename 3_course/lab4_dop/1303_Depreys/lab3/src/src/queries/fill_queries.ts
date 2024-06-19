import {Sequelize} from "sequelize-typescript";
import {Worker} from "../models/worker.model.js";
import {Cell} from "../models/cell.model.js";
import {Breed} from "../models/breed.model.js";
import {Chicken} from "../models/chicken.model.js";
import {WatchingChickenInCage} from "../models/watching_chicken_in_cage.model.js";

export async function fill(sequelize: Sequelize){
    await Worker.bulkCreate([
        {worker_id: 1, passport_series: 1234, passport_id: 345123,
            salary: 12020, name: 'Депрейс', surname: 'Александр', patronymic: 'Сергеевич'},
        {worker_id: 2, passport_series: 1232, passport_id: 740593,
            salary: 12500, name: 'Безрукова', surname: 'Софья', patronymic: 'Ивановна'},
        {worker_id: 3, passport_series: 9365, passport_id: 376945,
            salary: 12300, name: 'Мельникова', surname: 'Маргарита', patronymic: 'Максимовна'},
        {worker_id: 4, passport_series: 2754, passport_id: 745788,
            salary: 13000, name: 'Волков', surname: 'Александр', patronymic: 'Андреевич'},
        {worker_id: 5, passport_series: 3437, passport_id: 845375,
            salary: 15200, name: 'Калашников', surname: 'Никита', patronymic: 'Николаевич'},
        {worker_id: 6, passport_series: 9374, passport_id: 883654,
            salary: 12023, name: 'Кондратьев', surname: 'Никита', patronymic: null},
        {worker_id: 7, passport_series: 6439, passport_id: 234666,
            salary: 12490, name: 'Спиридонова', surname: 'София', patronymic: null},
        {worker_id: 8, passport_series: 4386, passport_id: 636485,
            salary: 12850, name: 'Афанасьева', surname: 'Милана', patronymic: 'Данииловна'},
        {worker_id: 9, passport_series: 3567, passport_id: 528473,
            salary: 11500, name: 'Исаев', surname: 'Георгий', patronymic: 'Максимович'},
        {worker_id: 10, passport_series: 8756, passport_id: 235747,
            salary: 12050, name: 'Овсянни ков', surname: 'Михаил', patronymic: 'Серафимович'}
    ]);

    await Cell.bulkCreate([
        {cell_id:null, workshop_number:1,row_number:1,cell_number:1},
        {cell_id:null, workshop_number:1,row_number:2,cell_number:1},
        {cell_id:null, workshop_number:1,row_number:2,cell_number:2},
        {cell_id:null, workshop_number:1,row_number:2,cell_number:3},
        {cell_id:null, workshop_number:2,row_number:1,cell_number:1},
        {cell_id:null, workshop_number:2,row_number:2,cell_number:1},
        {cell_id:null, workshop_number:2,row_number:3,cell_number:1},
        {cell_id:null, workshop_number:2,row_number:3,cell_number:2},
        {cell_id:null, workshop_number:3,row_number:1,cell_number:1},
        {cell_id:null, workshop_number:3,row_number:1,cell_number:2}
    ]);

    await Breed.bulkCreate([
        {breed_name:'Адлерская серебристая курица',
            average_eggs_per_month: 15,average_weight: 2.65,recommended_diet_number: 1},
        {breed_name:'Леггорн',average_eggs_per_month: 16,average_weight: 1.75,recommended_diet_number: 2},
        {breed_name:'Доминант',average_eggs_per_month: 25,average_weight: 2.15,recommended_diet_number: 2},
        {breed_name:'Ломан Браун',average_eggs_per_month: 26,average_weight: 1.8,recommended_diet_number: 2},
        {breed_name:'Орловские куры',average_eggs_per_month: 13,average_weight: 2.5,recommended_diet_number: 1},
        {breed_name:'Хай Лайн',average_eggs_per_month: 21,average_weight: 1.32,recommended_diet_number: 1},
        {breed_name:'Маран', average_eggs_per_month:12,average_weight: 2.9,recommended_diet_number: 3},
        {breed_name:'Легбар',average_eggs_per_month: 17,average_weight: 2.35,recommended_diet_number: 3},
        {breed_name:'Араукан',average_eggs_per_month: 13,average_weight: 1.6,recommended_diet_number: 3},
        {breed_name:'Русская белая',average_eggs_per_month: 18,average_weight: 2.1,recommended_diet_number: 1}
    ]);

    await Chicken.bulkCreate([
        {chicken_id:null,weight: 2.65,age: 1,eggs_per_month: 13,breed_name: 'Адлерская серебристая курица'},
        {chicken_id:null,weight: 2.33,age: 3,eggs_per_month: 14,breed_name: 'Адлерская серебристая курица'},
        {chicken_id:null,weight: 1.65,age: 3,eggs_per_month: 23,breed_name: 'Ломан Браун'},
        {chicken_id:null,weight: 2.65,age: 2,eggs_per_month: 12,breed_name: 'Орловские куры'},
        {chicken_id:null,weight: 2.13,age: 5,eggs_per_month: 15,breed_name: 'Орловские куры'},
        {chicken_id:null,weight: 2.48,age: 2,eggs_per_month: 11,breed_name: 'Орловские куры'},
        {chicken_id:null,weight: 2.8,age: 2,eggs_per_month: 13,breed_name: 'Маран'},
        {chicken_id:null,weight: 2.9,age: 2,eggs_per_month: 11,breed_name: 'Маран'},
        {chicken_id:null,weight: 1.95,age: 1,eggs_per_month: 18,breed_name: 'Русская белая'},
        {chicken_id:null,weight: 1.95,age: 1,eggs_per_month: 21,breed_name: 'Русская белая'}
    ]);

    await  WatchingChickenInCage.bulkCreate([
        {watching_chicken_in_cage_id: null,worker_id: 1,cell_id:1,chicken_id:9},
        {watching_chicken_in_cage_id: null,worker_id: 2,cell_id:2,chicken_id:3},
        {watching_chicken_in_cage_id: null,worker_id: 2,cell_id:3,chicken_id:7},
        {watching_chicken_in_cage_id: null,worker_id: 2,cell_id:4,chicken_id:8},
        {watching_chicken_in_cage_id: null,worker_id: 3,cell_id:5,chicken_id:1},
        {watching_chicken_in_cage_id: null,worker_id: 4,cell_id:6,chicken_id:2},
        {watching_chicken_in_cage_id: null,worker_id: 5,cell_id:7,chicken_id:6},
        {watching_chicken_in_cage_id: null,worker_id: 6,cell_id:8,chicken_id:4},
        {watching_chicken_in_cage_id: null,worker_id: 6,cell_id:9,chicken_id:5},
        {watching_chicken_in_cage_id: null,worker_id: 7,cell_id:10,chicken_id:10}
    ]);
}
import {el, faker} from "@faker-js/faker";
import {Worker} from "../models/worker.model.js";
import {Cell} from "../models/cell.model.js";
import {Breed} from "../models/breed.model.js";
import {Chicken} from "../models/chicken.model.js";
import {WatchingChickenInCage} from "../models/watching_chicken_in_cage.model.js";

export async function fakeFill(count: number){
    let workers = faker.helpers.multiple(createRandomWorker,{count: count});
    let workerPromise = Worker.bulkCreate(workers);

    let cells = faker.helpers.multiple(createRandomCell,{count: count});
    let cellPromise = Cell.bulkCreate(cells);

    let breeds = faker.helpers.multiple(createRandomBreed,{count: 1000});
    await Breed.bulkCreate(breeds);

    let breedNames = breeds.map((breed) => {return breed.breed_name});
    let chickens = [];
    for (let  i = 0; i < count; i++){
        chickens.push(createRandomChicken(breedNames));
    }
    let chickenList =await Chicken.bulkCreate(chickens);
    let cellList = await cellPromise;
    let workerList = await workerPromise;

    let workerIdList = workerList.map((worker) => {return worker.worker_id})
    let chickenIdList = chickenList.map((chicken) => {return chicken.chicken_id});
    let cellIdList = cellList.map((cell) => {return cell.cell_id});
    let watchingChickenInCageList = [];
    for (let  i = 0; i < count; i++){
        watchingChickenInCageList.push(createRandomWatchingInChickenInCage(
            workerIdList,
            cellIdList,
            chickenIdList
        ));
    }

    await WatchingChickenInCage.bulkCreate(watchingChickenInCageList);
}


function createRandomBreed(){
    return{
        breed_name: faker.word.adjective() + " " + faker.word.adjective() + " " + faker.word.adjective(),
        average_eggs_per_month: faker.number.int({min: 10, max:40}),
        average_weight: faker.number.float({min: 1.3, max:3}),
        recommended_diet_number: faker.number.int({min: 1, max:100})
    }
}

let currentWorkshopNumber = 1;
let currentRowNumber = 1;
let currentCellNumber = 1;


function createRandomCell(){
    let workshopNumber = currentWorkshopNumber;
    let rowNumber = currentRowNumber;
    let cellNumber = currentCellNumber;
    if (cellNumber === 1000){
        currentCellNumber = 1;
        currentRowNumber += 1
    }else {
        currentCellNumber++;
    }
    if (rowNumber === 1000){
        currentRowNumber = 1;
        currentWorkshopNumber += 1;
    }else {
        currentRowNumber++;
    }

    return {
        cell_id: null,
        workshop_number: workshopNumber,
        row_number: rowNumber,
        cell_number: cellNumber
    }
}

function createRandomChicken(breedNamesArray: string[]){
    return {
        chicken_id: null,
        weight: faker.number.float({min: 1, max:3.5}),
        age: faker.number.int({min: 1, max: 7}),
        eggs_per_month: faker.number.int({min: 7, max:50}),
        breed_name: faker.helpers.arrayElement(breedNamesArray)
    }
}

function createRandomWatchingInChickenInCage(workerIdList: number[],
                                             cellIdList: number[],
                                             chickenIdList: number[]){
    let chickenIndex = faker.number.int({min: 0, max: chickenIdList.length - 1});
    let chickenId = chickenIdList[chickenIndex];
    chickenIdList.splice(chickenIndex, 1);

    let cellIndex = faker.number.int({min: 0, max: cellIdList.length - 1});
    let cellId = cellIdList[cellIndex];
    cellIdList.splice(cellIndex, 1);
    return{
        watching_chicken_in_cage_id: null,
        worker_id: faker.helpers.arrayElement(workerIdList),
        cell_id: cellId,
        chicken_id: chickenId
    }

}

let currentPassportId = 0;
let currentSeriesId = 0;

function createRandomWorker(){
    let passportId = currentPassportId;
    let seriesId = currentSeriesId;

    if (passportId === 999999){
        currentSeriesId += 1;
        currentPassportId = 0;
    }else {
        currentPassportId++;
    }

    return {
        worker_id: null,
        passport_id: passportId,
        passport_series: seriesId,
        salary: faker.number.int({min: 12000, max: 46000}),
        name: faker.person.firstName(),
        surname: faker.person.middleName(),
        patronymic: faker.person.lastName()
    }
}


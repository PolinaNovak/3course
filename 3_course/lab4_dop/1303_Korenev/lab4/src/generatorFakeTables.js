import {faker} from '@faker-js/faker';
import {Postman} from "./Entities/Postman.js";
import {District} from "./Entities/District.js";
import {House} from "./Entities/House.js";
import {Subscriber} from "./Entities/Subscriber.js";
import {Subscription} from "./Entities/Subscription.js";
import {Publication} from "./Entities/Publication.js";

export async function generatorFakeTables(count) {
    let postmans = faker.helpers.multiple(createRandomPostman, {count: count})
    postmans = await Postman.bulkCreate(postmans)

    let postmansIds = postmans.map((postman) => {return postman.postmanid})
    let districts = []
    for (let i = 0; i < count; i++) {
        districts.push(createRandomDistrict(postmansIds[i]))
    }
    districts = await District.bulkCreate(districts)


    let districtsIds = districts.map((district) => {return district.districtid})
    let houses = []
    for (let i = 0; i < count; i++) {
        houses.push(createRandomHouse(districtsIds[i]))
    }
    houses = await House.bulkCreate(houses)


    let housesIds = houses.map((house) => {return house.houseid})
    let subscribers = []
    for (let i = 0; i < count; i++) {
        subscribers.push(createRandomSubscriber(housesIds[i]))
    }
    subscribers = await Subscriber.bulkCreate(subscribers)

    let publications = faker.helpers.multiple(createRandomPublication, {count: count})
    publications = await Publication.bulkCreate(publications)

    let subscribersIds = subscribers.map((subscriber) => {return subscriber.subscriberid})
    let publicationsIds = publications.map((publication) => {return publication.publicationid})
    let subscriptions = []
    for (let i = 0; i < count; i++) {
        subscriptions.push(createRandomSubscription(subscribersIds[i], publicationsIds[i]))
    }
    await Subscription.bulkCreate(subscriptions)
}

function createRandomPostman() {
    return {
        firstname: faker.person.firstName(),
        middlename: faker.person.middleName(),
        lastname: faker.person.lastName()
    }
}

function createRandomDistrict(postmanId) {
    return {
        postmanid: postmanId,
        name: faker.location.city()
    }
}

function createRandomHouse(districtId) {
    return {
        districtid: districtId,
        address: faker.location.secondaryAddress()
    }
}

function createRandomSubscriber(houseId) {
    return {
        houseid: houseId,
        firstname: faker.person.firstName(),
        middlename: faker.person.middleName(),
        lastname: faker.person.lastName()
    }
}

function createRandomPublication() {
    return {
        index: faker.number.float({min: 0, max: 20}),
        title: faker.word.noun(),
        price: faker.number.float({min: 1, max: 100})
     }
}

function createRandomSubscription(subscribersId, publicationsId) {
    const date = faker.date.recent()
    return {
        subscriberid: subscribersId,
        publicationid: publicationsId,
        startdate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
        duration:  faker.number.int({min: 1, max: 365})
    }
}
import { faker } from "@faker-js/faker"

function createPlayer() {
    return {
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
    }
}

function fillTeams(count) {
    let uniqNames = new Set()
    while (uniqNames.size < count) {
        uniqNames.add(faker.word.noun() + uniqNames.size)
    }
    console.log("filled teams");
    return [...uniqNames];
}

function fillStadiums(count) {
    let uniqStadium = new Set()
    while (uniqStadium.size < count) {
        uniqStadium.add(faker.word.noun() + uniqStadium.size)
    }
    console.log("filled stadiums");
    return [...uniqStadium];
}

function fillSponsors(count) {
    let uniqSponsors = new Set()
    while (uniqSponsors.size < count) {
        uniqSponsors.add(faker.word.noun() + uniqSponsors.size)
    }
    console.log("filled sponsors");
    return [...uniqSponsors];
}

export function generateDataBase(count) {
    const teamNames = fillTeams(count); //OK
    const stadiumNames = fillStadiums(count); //OK
    const sponsorNames = fillSponsors(count); //OK

    const players = faker.helpers.multiple(createPlayer, { count }); //OK
    console.log("players done");
    const cities = faker.helpers.multiple(()=>faker.location.city(), { count }); //OK
    console.log("cities done");
    const coaches = faker.helpers.multiple(()=>faker.person.fullName(), { count }); //OK
    console.log("coaches done");
    const dates = faker.helpers.multiple(()=>faker.date.past().toISOString().slice(0, 10), { count }); //OK
    console.log("dates done");
    return { teamNames, sponsorNames, stadiumNames, players, cities, coaches, dates};
}
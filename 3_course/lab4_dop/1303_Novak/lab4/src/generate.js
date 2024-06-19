import { faker } from '@faker-js/faker';
import * as fs from 'fs';

let patientCards = [];
const genders = ['Мужской', 'Женский'];

let snilsSet = new Set();

while (snilsSet.size < 1000000) {
    let snils = faker.helpers.fromRegExp('[0-9]{9}');
    snilsSet.add(snils);
}
let uniqueSnils = Array.from(snilsSet);

for (let i = 0; i < 1000000; i++) {
    patientCards.push({
        id_card: i,
        SNILS: parseInt(uniqueSnils[i]),
        first_name: faker.person.firstName(),
        second_name: faker.person.lastName(),
        surname: faker.name.middleName(),
        address: faker.address.streetAddress(),
        sex: genders[Math.floor(Math.random() * genders.length)],
        age: faker.datatype.number({ min: 18, max: 90 }),
        id_mainer: i,
        id_doctor: i
    });
}

fs.writeFileSync('./data/patientCards.json', JSON.stringify(patientCards, null, 2));
console.log("done patient cards");

// let doctors = [];
// const categories = ['Акушер', 'Гинеколог', 'Терапевт', 'Онколог', 'ЛОР'];
// const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
//
// for (let i = 0; i < 1000000; i++) {
//     const startHour = faker.datatype.number({ min: 8, max: 14 });
//     const workEndTime = startHour + faker.datatype.number({ min: 5, max: 7 });
//     doctors.push({
//         id_doctor: i,
//         first_name: faker.person.firstName(),
//         second_name: faker.person.lastName(),
//         surname: faker.name.middleName(),
//         category: categories[Math.floor(Math.random() * categories.length)],
//         experience: faker.datatype.number({ min: 1, max: 30 }),
//         date_of_birth: faker.date.between('1960-01-01', '1990-12-31').toISOString().split('T')[0],
//         visitors_day: days[Math.floor(Math.random() * days.length)],
//         visitors_hour: `${startHour}.00`,
//         cabinet: faker.datatype.number({ min: 1, max: 10 }),
//         end_day: `${workEndTime}.00`
//     });
// }
//
// fs.writeFileSync('./data/doctors.json', JSON.stringify(doctors, null, 2));
// console.log("done doctors");

// function formatDate(date) {
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}.${month}.${year}`;
// }
//
// let notes = [];
//
// for (let i = 0; i < 1000000; i++) {
//     const visitDate = faker.date.between(new Date(), new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000));
//     const endDateSickLeave = faker.date.between(visitDate, new Date(visitDate.getTime() + 15 * 24 * 60 * 60 * 1000));
//     notes.push({
//         id_note: i,
//         visit_date: formatDate(visitDate),
//         complaint: faker.lorem.sentence(),
//         diagnose: faker.lorem.words(),
//         appointment: faker.lorem.sentence(),
//         sick_list: Math.random() < 0.5,
//         term: (Math.random() < 0.5 ? formatDate(endDateSickLeave) : formatDate(visitDate)),
//         completion_date: formatDate(visitDate),
//         id_doctor: i
//     });
// }
//
// fs.writeFileSync('./data/notes.json', JSON.stringify(notes, null, 2));
// console.log("done notes");
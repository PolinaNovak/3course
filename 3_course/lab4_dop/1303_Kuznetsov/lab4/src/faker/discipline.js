import faker from "faker"
faker.locale = 'ru';
import {reportTypes} from "../enums.js";

export default function generateDiscipline(N) {
    const disciplines = [];

    for (let i = 0; i < N; i++) {
        const discipline = {
            discipline_name: faker.lorem.words(),
            lection_hours: faker.datatype.number({ min: 20, max: 60 }),
            practice_hours: faker.datatype.number({ min: 20, max: 60 }),
            lab_hours: faker.datatype.number({ min: 20, max: 60 }),
            cw_hours: faker.datatype.number({ min: 20, max: 60 }),
            report_type: faker.random.arrayElement(reportTypes),
            semesters: faker.datatype.number({ min: 1, max: 8 }),
        };

        disciplines.push(discipline);
    }

    return disciplines
}
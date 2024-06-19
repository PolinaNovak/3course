import faker from "faker"
faker.locale = 'ru';
import {qualifications, studyForms} from "../enums.js";
//{ specialization_name: 'ПИ', dep_id: 1, specialization_code: '09.03.04', qualification: 'Бакалавр', duration: 4, study_form: 'Очная' },

export default function generateSpecialization(N) {
    const specializations = [];

    for (let i = 0; i < N; i++) {
        const specialization = {
            specialization_name: faker.lorem.words(),
            specialization_code: faker.lorem.words(),
            dep_id: faker.datatype.number({ min: 1, max: N}),
            qualification: faker.random.arrayElement(qualifications),
            duration: faker.datatype.number({ min: 1, max: 4 }),
            study_form: faker.random.arrayElement(studyForms),
        };

        specializations.push(specialization);
    }

    return specializations
}
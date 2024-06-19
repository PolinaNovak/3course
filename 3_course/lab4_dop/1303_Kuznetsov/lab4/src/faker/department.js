import faker from "faker"
faker.locale = 'ru';
import {degrees, ranks} from "../enums.js";

export default function generateDepartment(N) {
    const departments = [];

    for (let i = 0; i < N; i++) {
        const department = {
            faculty_id: faker.datatype.number({ min: 1, max: N }),
            name: faker.lorem.words(),
            head_name: faker.lorem.words(),
            head_degree: faker.random.arrayElement(degrees),
            head_rank: faker.random.arrayElement(ranks),
        };
        departments.push(department);
    }

    return departments
}
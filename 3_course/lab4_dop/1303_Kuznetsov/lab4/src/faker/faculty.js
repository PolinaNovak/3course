import faker from "faker"
faker.locale = 'ru';

export default function generateFaculty(N) {
    const faculties = [];

    for (let i = 0; i < N; i++) {
        const faculty = {
            faculty_name: faker.lorem.words(),
        };
        faculties.push(faculty);
    }

    return faculties
}
import faker from "faker"
faker.locale = 'ru';

export default function generateTelephones(N) {
    const telephones = [];

    for (let i = 0; i < N; i++) {
        const telephone = {
            telephone_number: faker.lorem.words(),
            dep_id: faker.datatype.number({ min: 1, max: N }),
        };
        telephones.push(telephone);
    }

    return telephones
}
import { fakerRU as faker } from '@faker-js/faker';

function getRandomRussianLetter(count) {
    const chars = [];
    for (let i = 0; i < count; i++) {
        const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
        chars.push(alphabet.charAt(getRandomNumber(0, alphabet.length - 1)));
    }
    return chars.join('');
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function fakeFaculty(count) {
    const faculties = new Array();
    const names = new Set();
    while (faculties.length < count) {
        const name = `Ф${getRandomRussianLetter(5)}`;
        if (!names.has(name)) {
            names.add(name);
            const faculty = {
                name: name,
                places: getRandomNumber(50, 500)
            };
            faculties.push(faculty);
        }
    }
    // fs.writeFileSync('./fakeData/faculties.json', JSON.stringify(faculties));
    return faculties;
}

export function fakeDepartment(count) {
    const departments = new Array();
    const names = new Set();
    while (departments.length < count) {
        const name = `${getRandomRussianLetter(5)}`;
        if (!names.has(name)) {
            names.add(name);
            const department = {
                name: name,
                facultyId: getRandomNumber(1, count)
            };
            departments.push(department);
        }
    }
    // fs.writeFileSync('./fakeData/departments.json', JSON.stringify(departments));
    return departments;
}

export function fakeStream(count) {
    const streams = new Array();
    let i = 1;
    while (streams.length < count) {
        const stream = {
            streamNumber: i++
        };
        streams.push(stream);
    }
    // fs.writeFileSync('./fakeData/streams.json', JSON.stringify(streams));
    return streams;
}

export function fakeGroup(count) {
    const groups = new Array();
    let i = 1;
    while (groups.length < count) {
        const group = {
            groupNumber: i++,
            streamId: getRandomNumber(1, count)
        };
        groups.push(group);
    }
    // fs.writeFileSync('./fakeData/groups.json', JSON.stringify(groups));
    return groups;
}

export function fakeStudent(count) {
    const students = new Array();
    const studentFullName = new Set();
    const passportSeries = new Set();
    const passportNumbers = new Set();
    let i = 1;
    while (students.length < count) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const middleName = faker.person.middleName();
        const fullname = `${firstName} ${lastName} ${middleName}`;
        const passportSeriea = getRandomNumber(1000, 9999);
        const passportNumber = getRandomNumber(100000, 999999);
        if (!studentFullName.has(fullname) && !(passportSeries.has(passportSeriea) && passportNumbers.has(passportNumber))) {
            studentFullName.add(fullname);
            passportSeries.add(`${passportSeriea}`);
            passportNumbers.add(`${passportNumber}`);
            const medal = getRandomNumber(0, 2) === 2 ? 'Золотая' : getRandomNumber(0, 2) === 1 ? 'Серебряная' : null;
            const student = {
                uniqueNumber: i++,
                lastName: lastName,
                firstName: firstName,
                middleName: middleName,
                passportSeries: passportSeriea,
                passportNumber: passportNumber,
                educationalInstitution: `Школа №${getRandomNumber(1, 100)}`,
                city: faker.location.city(),
                graduationDateOfTheEI: faker.date.between({from: '2023-01-01', to: '2023-12-31'}).toISOString().slice(0,10),
                medal: medal,
                statusOfDocuments: getRandomNumber(0, 2) === 2 ? 'Поданы' : getRandomNumber(0, 2) === 1 ? 'Перевод' : null,
                numberOfExams: medal === 'Золотая' || medal === 'Серебряная' ? 1 : 4,
                departmentId: getRandomNumber(1, count),
                groupId: getRandomNumber(1, count)
            };
            students.push(student);
        }
    }
    // fs.writeFileSync('./fakeData/students.json', JSON.stringify(students));
    return students;
}

export function fakeSubject(count) {
    const subjects = new Array();
    while (subjects.length < count) {
        const subject = {
            name: faker.word.words(1),
            departmentId: getRandomNumber(1, count)
        };
        subjects.push(subject);
    }
    // fs.writeFileSync('./fakeData/subjects.json', JSON.stringify(subjects));
    return subjects;
}

export function fakeExam(count) {
    const exams = new Array();
    let i = 1;
    while (exams.length < count) {
        const exam = {
            streamId: getRandomNumber(1, count),
            subjectId: i++,
            date: faker.date.between({from: '2024-01-01', to: '2024-12-31'}).toISOString().slice(0,10),
            time: `${getRandomNumber(8, 18)}:${getRandomNumber(0, 59)}`,
            auditorium: getRandomNumber(1000, 9999)
        };
        exams.push(exam);
    }
        // fs.writeFileSync('./fakeData/exams.json', JSON.stringify(exams));
    return exams;
}

export function fakeConsultation(count) {
    const consultations = new Array();
    const exams = new Set();
    while (consultations.length < count) {
        const examId = getRandomNumber(1, count);
        if (!exams.has(examId)) {
            exams.add(examId);
            const auditorium = getRandomNumber(1000, 9999) 
            const consultation = {
                examId: examId,
                date: faker.date.between({from: '2024-01-01', to: '2024-12-31'}).toISOString().slice(0,10),
                time: `${getRandomNumber(14, 18)}:${getRandomNumber(0, 59)}`,
                auditorium: auditorium < 5000 ? null : auditorium
            };
            consultations.push(consultation);
        }
    }
    // fs.writeFileSync('./fakeData/consultations.json', JSON.stringify(consultations));
    return consultations;
}

export function fakeExaminationSheet(count) {
    const examinationSheets = new Array();
    const examIds = new Set();
    let i = 1;
    while (examinationSheets.length < count) {
        let examId;
        do {
            examId = getRandomNumber(1, count);
        } while (examIds.has(examId));
        examIds.add(examId);

        const examinationSheet = {
            examId: examId,
            studentId: i++,
            grade: getRandomNumber(2, 5),
            Appeal: faker.datatype.boolean()
        };
        examinationSheets.push(examinationSheet);
    }
    // fs.writeFileSync('./fakeData/examinationSheets.json', JSON.stringify(examinationSheets));
    return examinationSheets;
}
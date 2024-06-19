import { Sequelize } from "sequelize-typescript";
import { Faculty } from "../models/faculty.model";
import { Department } from "../models/department.model";
import { Group } from "../models/group.model";
import { Student } from "../models/student.model";
import { Stream } from "../models/stream.model";
import { Subject } from "../models/subject.model";
import { Exam } from "../models/exam.model";
import { Consultation } from "../models/consultation.model";
import { ExaminationSheet } from "../models/examinationSheet.model";

export async function fillTable(sequelize: Sequelize) {
    await Faculty.bulkCreate([
        {name: 'ФРТ', places: 155},
        {name: 'ФЭЛ', places: 198},
        {name: 'ФКТИ', places: 308},
        {name: 'ФЭА', places: 243},
        {name: 'ФИБС', places: 215},
        {name: 'ИНПРОТЕХ', places: 52},
        {name: 'ГФ', places: 20}
    ]);
    await Department.bulkCreate([
        { name: 'РЭС', facultyId: 1 },
        { name: 'ФЭТ', facultyId: 2 },
        { name: 'МО ЭВМ', facultyId: 3 },
        { name: 'КСУ', facultyId: 4 },
        { name: 'БТС', facultyId: 5 },
        { name: 'МСК', facultyId: 6 },
        { name: 'ИНЯЗ', facultyId: 7 }
    ]);
    await Stream.bulkCreate([
        {streamNumber: 1},
        {streamNumber: 2}
    ]);
    await Group.bulkCreate([
        { groupNumber: 1301, streamId: 1 },
        { groupNumber: 1302, streamId: 1 },
        { groupNumber: 1303, streamId: 1 },
        { groupNumber: 1304, streamId: 1 },
        { groupNumber: 1305, streamId: 2 },
        { groupNumber: 1306, streamId: 2 },
        { groupNumber: 1307, streamId: 2 }
    ]);
    await Student.bulkCreate([
        { uniqueNumber: 15834161, lastName: 'Коновалов', firstName: 'Гавриил', middleName: 'Анатольевич', 
          passportSeries: 5719, passportNumber: 529588, educationalInstitution: 'МАОУ СОШ №3', city: 'Пермь', 
          graduationDateOfTheEI: new Date('2023-05-20'), medal: 'Золотая', statusOfDocuments: 'Поданы', 
          numberOfExams: 1, departmentId: 7, groupId: 5 },
        { uniqueNumber: 15089468, lastName: 'Шестаков', firstName: 'Вальтер', middleName: 'Всеволодович', 
          passportSeries: 2419, passportNumber: 666949, educationalInstitution: 'Лицей №67', city: 'Иваново', 
          graduationDateOfTheEI: new Date('2023-05-25'), medal: 'Золотая', statusOfDocuments: 'Поданы', 
          numberOfExams: 1, departmentId: 3, groupId: 1 },
        { uniqueNumber: 13669205, lastName: 'Авдеев', firstName: 'Леонтий', middleName: 'Эдуардович', 
          passportSeries: 6119, passportNumber: 975207, educationalInstitution: 'Многопрофильная школа № 17', 
          city: 'Рязань', graduationDateOfTheEI: new Date('2023-05-31'), medal: null, statusOfDocuments: null, 
          numberOfExams: 4, departmentId: 7, groupId: 5 },
        { uniqueNumber: 19828121, lastName: 'Меркушев', firstName: 'Альфред', middleName: 'Протасьевич', 
          passportSeries: 8919, passportNumber: 447416, educationalInstitution: 'Школа №27', city: 'Мордовия', 
          graduationDateOfTheEI: new Date('2023-05-31'), medal: null, statusOfDocuments: 'Поданы', 
          numberOfExams: 4, departmentId: 3, groupId: 1 },
        { uniqueNumber: 21952948, lastName: 'Носова', firstName: 'Рамина', middleName: 'Михаиловна', 
          passportSeries: 9620, passportNumber: 602158, educationalInstitution: 'Школа №48', city: 'Грозный', 
          graduationDateOfTheEI: new Date('2023-05-15'), medal: 'Золотая', statusOfDocuments: null, 
          numberOfExams: 1, departmentId: 3, groupId: 3 },
        { uniqueNumber: 66862382, lastName: 'Лукина', firstName: 'Анэля', middleName: 'Аристарховна', 
          passportSeries: 7919, passportNumber: 269571, educationalInstitution: 'Школа №15', city: 'Майкоп', 
          graduationDateOfTheEI: new Date('2023-05-31'), medal: 'Серебряная', statusOfDocuments: 'Поданы', 
          numberOfExams: 1, departmentId: 3, groupId: 2 },
        { uniqueNumber: 98664711, lastName: 'Кузнецова', firstName: 'Юнона', middleName: 'Ильяовна', 
          passportSeries: 3620, passportNumber: 328391, educationalInstitution: 'МБОУ Школа №32', city: 'Самара', 
          graduationDateOfTheEI: new Date('2023-05-31'), medal: null, statusOfDocuments: 'Поданы', 
          numberOfExams: 4, departmentId: 3, groupId: 3 },
        { uniqueNumber: 12636043, lastName: 'Мартынова', firstName: 'Карина', middleName: 'Мартыновна', 
          passportSeries: 4519, passportNumber: 473248, educationalInstitution: 'Школа №91', city: 'Москва', 
          graduationDateOfTheEI: new Date('2023-05-31'), medal: null, statusOfDocuments: 'Перевод', 
          numberOfExams: 4, departmentId: 7, groupId: 6 }
    ]);
    await Subject.bulkCreate([
        {name: 'Математика'},
        {name: 'Физика'},
        {name: 'Информатика'},
        {name: 'Физкультура'},
        {name: 'Русский Язык'},
        {name: 'Английский Язык'},
        {name: 'Литература'}
    ]);
    await Exam.bulkCreate([
        { streamId: 1, subjectId: 1, date: new Date('2023-08-10'), time: '10:00', auditorium: 3322 },
        { streamId: 1, subjectId: 2, date: new Date('2023-08-15'), time: '9:00', auditorium: 3102 },
        { streamId: 1, subjectId: 3, date: new Date('2023-08-20'), time: '15:00', auditorium: 5413 },
        { streamId: 2, subjectId: 7, date: new Date('2023-08-16'), time: '11:00', auditorium: 3413 },
        { streamId: 2, subjectId: 6, date: new Date('2023-08-19'), time: '9:00', auditorium: 5413 },
        { streamId: 2, subjectId: 5, date: new Date('2023-08-23'), time: '14:00', auditorium: 3102 }
    ])
    await Consultation.bulkCreate([
        { examId: 1, date: new Date('2024-08-05'), time: '18:00:00', auditorium: null },
        { examId: 2, date: new Date('2024-08-14'), time: '13:00:00', auditorium: 3102 },
        { examId: 3, date: new Date('2024-08-19'), time: '15:00:00', auditorium: null },
        { examId: 4, date: new Date('2024-08-08'), time: '15:30:00', auditorium: null },
        { examId: 5, date: new Date('2024-08-14'), time: '17:00:00', auditorium: null },
        { examId: 6, date: new Date('2024-08-17'), time: '18:30:00', auditorium: null }
    ])
    await ExaminationSheet.bulkCreate([
        { examId: 1, studentId: 15089468, grade: 5, Appeal: false },
        { examId: 1, studentId: 19828121, grade: 4, Appeal: false },
        { examId: 1, studentId: 21952948, grade: 3, Appeal: false },
        { examId: 1, studentId: 66862382, grade: 2, Appeal: true },
        { examId: 1, studentId: 98664711, grade: 3, Appeal: true },
        { examId: 2, studentId: 19828121, grade: 5, Appeal: false },
        { examId: 2, studentId: 98664711, grade: 4, Appeal: false },
        { examId: 3, studentId: 19828121, grade: 3, Appeal: true },
        { examId: 3, studentId: 98664711, grade: 4, Appeal: false },
        { examId: 4, studentId: 15834161, grade: 5, Appeal: false },
        { examId: 4, studentId: 13669205, grade: 4, Appeal: false },
        { examId: 4, studentId: 12636043, grade: 4, Appeal: true },
        { examId: 5, studentId: 13669205, grade: 5, Appeal: false },
        { examId: 5, studentId: 12636043, grade: 5, Appeal: false },
        { examId: 6, studentId: 13669205, grade: 4, Appeal: false },
        { examId: 6, studentId: 12636043, grade: 3, Appeal: false }
    ]);
}


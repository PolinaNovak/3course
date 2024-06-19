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
import * as generator from "../generator/fakeInfo";

const count = 100000;

export async function fillTable(sequelize: Sequelize) {
    const facultyData = generator.fakeFaculty(count)
    const departmentData = generator.fakeDepartment(count);
    const streamData = generator.fakeStream(count);
    const groupData = generator.fakeGroup(count);
    const studentData = generator.fakeStudent(count);
    const subjectData = generator.fakeSubject(count);
    const examData = generator.fakeExam(count);
    const consultationData = generator.fakeConsultation(count);
    const examinationSheetData = generator.fakeExaminationSheet(count);
    const faculty = await Faculty.bulkCreate(facultyData);
    console.log('faculty done');
    const department = await Department.bulkCreate(departmentData);
    console.log('department done');
    const stream = await Stream.bulkCreate(streamData);
    console.log('stream done');
    const group = await Group.bulkCreate(groupData);
    console.log('group done');
    const student = await Student.bulkCreate(studentData);
    console.log('student done');
    const subject = await Subject.bulkCreate(subjectData);
    console.log('subject done');
    const exam = await Exam.bulkCreate(examData);
    console.log('exam done');
    await Consultation.bulkCreate(consultationData);
    console.log('consultation done');
    await ExaminationSheet.bulkCreate(examinationSheetData);
    console.log('examinationSheet done');
}
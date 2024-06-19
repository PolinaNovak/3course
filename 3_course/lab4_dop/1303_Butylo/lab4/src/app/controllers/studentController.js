import { createRequire } from "module";
const require = createRequire(import.meta.url);


export class StudentController {

    constructor(count) {
        this.students = require('../data/fio_students_data.json').splice(0, count)
    }
}

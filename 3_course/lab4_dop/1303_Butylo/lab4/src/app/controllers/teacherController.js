import { createRequire } from "module";
const require = createRequire(import.meta.url);


export class TeacherController {

    constructor(count) {
        this.teachers = require('../data/fio_teachers_data.json').splice(0, count)
        this.len = count
    }

}

import { createRequire } from "module";
const require = createRequire(import.meta.url);


export class ClassController {

    constructor(count) {
        this.class_names = require('../data/class_names_data.json').splice(0, count)
        this.len = count
    }

    randomClass() {
        return this.class_names[Math.floor(Math.random() * (this.len - 1))]
    }
}

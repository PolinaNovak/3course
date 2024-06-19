import {sequelize} from "../index.js";
import {Client} from "../objects/Client.js";
import {CleaningDay} from "../objects/CleaningDay.js";
import {Employee} from "../objects/Employee.js";
import {Floor} from "../objects/Floor.js";
import {EmployeeCleaning} from "../objects/EmployeeCleaning.js";
import {Room} from "../objects/Room.js";
import {ClientRoom} from "../objects/ClientRoom.js";
import {Op} from "sequelize";


try {
    await sequelize.authenticate();
    console.log('Success.');

    await sequelize.sync({force: true});
    await fillTables();
    await doTasks();

    await sequelize.close()
        .then(() => console.log('Connection closed successfully.'));
} catch (e) {
    console.error('Failed: ', e);
}

async function fillTables() {
    await ClientRoom.belongsTo(Client, {foreignKey: 'passportNumber'});
    await Client.belongsTo(ClientRoom, {foreignKey: 'passportNumber'});

    await Employee.hasMany(EmployeeCleaning, {foreignKey: 'employeeId'});
    await EmployeeCleaning.belongsTo(Employee, {foreignKey: 'employeeId'});

    await CleaningDay.hasMany(EmployeeCleaning, {foreignKey: 'day'});
    await EmployeeCleaning.belongsTo(CleaningDay, {foreignKey: 'day'});

    await Floor.hasMany(EmployeeCleaning, {foreignKey: 'floorNumber'});
    await EmployeeCleaning.belongsTo(Floor, {foreignKey: 'floorNumber'});

    await Floor.hasMany(Room, {foreignKey: 'floorNumber'});
    await Room.belongsTo(Floor, {foreignKey: 'floorNumber'});

    await ClientRoom.belongsTo(Room, {foreignKey: 'roomNumber'});
    await Room.hasMany(ClientRoom, {foreignKey: 'roomNumber'});


    let CLIENTS = [
        [234115, 'Андреева', 'Елизавета', 'Алексеевна', 'Брест'],
        [127891, 'Козловская', 'Ольга', 'Александровна', 'Минск'],
        [458720, 'Бутыло', 'Егор', 'Алексеевич', 'Брест'],
        [392749, 'Григорьев', 'Вячеслав', 'Станиславович', 'Екатеринбург'],
        [478302, 'Афанасьева', 'Анна', 'Васильевна', 'Калининград'],
        [652035, 'Калинин', 'Григорий', 'Александрович', 'Омск']
    ]
    await Client.bulkCreate(
        CLIENTS.map((client) => ({
            passportNumber: client[0],
            secondName: client[1],
            firstName: client[2],
            patronymic: client[3],
            city: client[4]
        }))
    );

    let DAYS = [1, 2, 3, 4, 5];
    await CleaningDay.bulkCreate(
        DAYS.map((day) => ({
            day: day
        }))
    );

    let EMPLOYEES = [
        ['Алексеев', 'Сергей', 'Андреевич'],
        ['Осипова', 'Алина', 'Сергеевна'],
        ['Сергеева', 'Татьяна', 'Олеговна'],
        ['Иванов', 'Олег', 'Геннадьевич'],
        ['Сомова', 'Елена', 'Павловна']
    ]
    await Employee.bulkCreate(
        EMPLOYEES.map((employee) => ({
            secondName: employee[0],
            firstName: employee[1],
            patronymic: employee[2]
        }))
    );

    let FLOORS = [1, 2, 3, 4, 5];
    await Floor.bulkCreate(
        FLOORS.map((num) => ({
            floorNumber: num
        }))
    );

    let EMPLOYEE_CLEANINGS = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [4, 4, 4],
        [5, 5, 5]
    ]
    await EmployeeCleaning.bulkCreate(
        EMPLOYEE_CLEANINGS.map((cleaning) => ({
            floorNumber: cleaning[0],
            day: cleaning[1],
            employeeId: cleaning[2]
        }))
    );

    let ROOMS = [
        [121, 'single', 12000, 2030121, 1],
        [223, 'double', 22000, 2030223, 2],
        [343, 'double', 22000, 2030343, 3],
        [457, 'triple', 32000, 2030457, 4],
        [555, 'triple', 50000, 2030555, 5],
        [539, 'double', 32000, 2030539, 5]
    ]
    await Room.bulkCreate(
        ROOMS.map((room) => ({
            roomNumber: room[0],
            type: room[1],
            price: room[2],
            phoneNumber: room[3],
            floorNumber: room[4]
        }))
    );

    let CLIENT_ROOMS = [
        [234115, 121, '2020-01-08', '2020-01-18'],
        [127891, 223, '2023-11-02', '2023-11-23'],
        [458720, 343, '2023-10-15', '2023-10-20'],
        [392749, 457, '2021-04-08', '2021-04-20'],
        [478302, 555, '2021-01-28', '2021-02-01']
    ]
    await ClientRoom.bulkCreate(
        CLIENT_ROOMS.map((room) => ({
            passportNumber: room[0],
            roomNumber: room[1],
            checkInDate: room[2],
            checkOutDate: room[3]
        }))
    );

}

async function doTasks() {
    await Client.findAll({
        attributes: ['secondName', 'firstName', 'patronymic'],
        include: {
            model: ClientRoom,
            required: true,
            where: {
                roomNumber: 555
            },
            attributes: []
        }
    }).then((res) => {
        console.log("\n\nКлиент, проживающий в заданном номере (555):\n", JSON.stringify(res, null, 2), "\n");
    })

    await Client.findAll({
        attributes: ['secondName', 'firstName', 'patronymic'],
        where: {
            city: 'Брест',
        }
    }).then((res) => {
        console.log("\n\nКлиент, прибывший из заданного города:\n", JSON.stringify(res, null, 2), "\n");
    })

    await Employee.findAll({
        attributes: ['secondName', 'firstName', 'patronymic'],
        include: {
            model: EmployeeCleaning,
            required: true,
            attributes: [],
            include: [{
                model: CleaningDay,
                where: {
                    day: 4,
                },
                required: true,
                attributes: [],
            },
                {
                    model: Floor,
                    required: true,
                    attributes: [],
                    include: {
                        model: Room,
                        required: true,
                        attributes: [],
                        include: {
                            model: ClientRoom,
                            required: true,
                            attributes: [],
                            where: {
                                passportNumber: 392749
                            }
                        }
                    }

                }]
        }
    }).then((res) => {
        console.log("\n\nКто из служащих убирал номер указанного клиента в заданный день недели:\n", JSON.stringify(res, null, 2), "\n");
    })

    const today = new Date();

    await Room.count({
        group: '',
        include: {
            model: ClientRoom,
            attributes: [],
            required: true,
            where: {
                [Op.or]: [{
                    checkOutDate: {
                        [Op.lte]: today
                    }
                },
                    {
                        checkInDate: {
                            [Op.gte]: today
                        }
                    }]
            }
        },
    }).then((res) => {
        console.log("\n\nЕсть ли в гостинице свободные места и свободные номера и, если есть, то сколько:\n", JSON.stringify(res, null, 2), "\n");
    })
}
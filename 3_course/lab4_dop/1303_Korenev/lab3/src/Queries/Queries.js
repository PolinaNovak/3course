import { sequelize } from "../createSchemas.js"
import { Postman } from "../Entities/Postman.js"
import { District } from "../Entities/District.js"
import { House } from "../Entities/House.js"
import { Subscriber } from "../Entities/Subscriber.js"
import { Publication } from "../Entities/Publication.js"
import { Subscription } from "../Entities/Subscription.js"
import {Op, where} from "sequelize";

try {
    await sequelize.authenticate();
    await setAssociations()

    await sequelize.sync({force: true});
    await fillTables();

    await task1()
    await task2()
    await task3()
    await task4()
    await task5()
    await task6()
    await task6_1()

    sequelize.close()
        .then(() => console.log('Connection closed successfully.'));
} catch (e) {
    console.error("Error: ", e)
}

async function setAssociations() {
    await District.belongsTo(Postman, {foreignKey: 'postmanid'});
    await Postman.hasMany(District, {foreignKey: 'postmanid'});

    await House.belongsTo(District,{foreignKey: 'districtid'});
    await District.hasMany(House, {foreignKey: 'districtid'});

    await Subscriber.belongsTo(House, {foreignKey: 'houseid'});
    await House.hasMany(Subscriber, {foreignKey: 'houseid'});

    await Subscription.belongsTo(Publication, {foreignKey: 'publicationid'});
    await Publication.hasMany(Subscription, {foreignKey: 'publicationid'});

    await Subscription.belongsTo(Subscriber, {foreignKey: 'subscriberid'});
    await Subscriber.hasMany(Subscription, {foreignKey: 'subscriberid'});
}

async function fillTables() {
    const postmans = await Postman.bulkCreate([
        { firstname: 'Рубеус', lastname: 'Хагрид' },
        { firstname: 'Букля' },
        { firstname: 'Альбус', middlename: 'Персиваль', lastname: 'Дамблдор' },
        { firstname: 'Миневра', lastname: 'МакГонагалл' },
        { firstname: 'Северус', lastname: 'Снегг' }
    ], {returning: true})

    const districts = await District.bulkCreate([
        { postmanid: postmans[2].postmanid, name: 'Хогвартс' },
        { postmanid: postmans[3].postmanid, name: 'Косой Переулок' },
        { postmanid: postmans[0].postmanid, name: 'Хогсмид' },
        { postmanid: postmans[4].postmanid, name: 'Азкабан' },
        { postmanid: postmans[0].postmanid, name: 'Литтл Уингин' },
        { postmanid: postmans[1].postmanid, name: 'Оттери-Сент-Кэчпоул' }
    ])

    const houses = await House.bulkCreate([
        { districtid: districts[2].districtid, address: 'Хогсмид, Три Метлы' },
        { districtid: districts[2].districtid, address: 'Хогсмид, Волшебные палочки от Олливандера' },
        { districtid: districts[4].districtid, address: 'Литтл Уингин, Тисовая улица, дом 4' },
        { districtid: districts[3].districtid, address: 'Азкабан, 7 камера' },
        { districtid: districts[5].districtid, address: 'Оттери-Сент-Кэчпоул, Нора' },
        { districtid: districts[1].districtid, address: 'Косой Переулок, Гринготтс' },
        { districtid: districts[1].districtid, address: 'Косой Переулок, Лавка Олливандера' },
        { districtid: districts[0].districtid, address: 'Хогвартс, Башня Гриффиндор' }
    ])

    const subscribers = await Subscriber.bulkCreate([
        { houseid: houses[0].houseid, firstname: 'Мадам', lastname: 'Розмерта' },
        { houseid: houses[1].houseid, firstname: 'Гаррик', lastname: 'Олливандер' },
        { houseid: houses[2].houseid, firstname: 'Гарри', middlename: 'Джеймс', lastname: 'Поттер' },
        { houseid: houses[3].houseid, firstname: 'Сириус', lastname: 'Блэк' },
        { houseid: houses[4].houseid, firstname: 'Молли', lastname: 'Уизли' },
        { houseid: houses[5].houseid, firstname: 'Гринготт' },
        { houseid: houses[6].houseid, firstname: 'Джервейс', lastname: 'Олливандер' },
        { houseid: houses[7].houseid, firstname: 'Гермиона', lastname: 'Грейнджер' },
        { houseid: houses[7].houseid, firstname: 'Рон', lastname: 'Уизли' }
    ])

    const publications = await Publication.bulkCreate([
        { index: 93, title: 'Загадки Темного Искусства', price: 10.49 },
        { index: 89, title: 'Энциклопедия Зельеварения', price: 13.79 },
        { index: 88, title: 'Дейли Профет', price: 10.99 },
        { index: 96, title: 'Тайные Существа и Где Они Обитают', price: 8.99 },
        { index: 83, title: 'Заклинания для Начинающих', price: 6.99 },
        { index: 84, title: 'Колдовство в Повседневной Жизни', price: 9.99 },
        { index: 91, title: 'Путеводитель по Магическим Местам', price: 12.99 }
    ])

    const subscriptions = await Subscription.bulkCreate([
        { publicationid: publications[2].publicationid, subscriberid: subscribers[5].subscriberid, startdate: '2022-11-01', duration: 365 },
        { publicationid: publications[5].publicationid, subscriberid: subscribers[4].subscriberid, startdate: '2023-03-20', duration: 300 },
        { publicationid: publications[0].publicationid, subscriberid: subscribers[3].subscriberid, startdate: '2020-06-15', duration: 90 },
        { publicationid: publications[3].publicationid, subscriberid: subscribers[0].subscriberid, startdate: '2022-04-12', duration: 1000 },
        { publicationid: publications[2].publicationid, subscriberid: subscribers[1].subscriberid, startdate: '2023-01-01', duration: 365 },
        { publicationid: publications[0].publicationid, subscriberid: subscribers[2].subscriberid, startdate: '2023-10-10', duration: 180 },
        { publicationid: publications[1].publicationid, subscriberid: subscribers[7].subscriberid, startdate: '2023-08-21', duration: 90 },
        { publicationid: publications[4].publicationid, subscriberid: subscribers[8].subscriberid, startdate: '2023-03-15', duration: 120 },
        { publicationid: publications[6].publicationid, subscriberid: subscribers[6].subscriberid, startdate: '2023-05-13', duration: 150 },
        { publicationid: publications[2].publicationid, subscriberid: subscribers[2].subscriberid, startdate: '2023-10-09', duration: 90 }
    ])
}

async function task1() {
    const result = await Publication.findAll({
        attributes: ['title']
    })
    console.log('Titles:', result.map((item) => item.title));
}

async function task2() {
    const result = await Postman.findAll({
        attributes: ['lastname'],
        include: {
            model: District,
            attributes: [],
            required: true,
            include: {
                model: House,
                attributes: [],
                where: {
                    address: 'Хогсмид, Три Метлы'
                }
            }
        },
        limit: 1
    })
    console.log('Postman lastname:', result.map((item) => item.lastname));
}

async function task3() {
    const result = await Publication.findAll({
        attributes: ['title'],
        include: {
            model: Subscription,
            attributes: [],
            required: true,
            include: {
                model: Subscriber,
                attributes: [],
                required: true,
                where: {
                    firstname: 'Гарри',
                    middlename: 'Джеймс',
                    lastname: 'Поттер'
                }
            }
        }
    })
    console.log('Titles:', result.map((item) => item.title));
}

async function task4() {
    const result = await Postman.count()
    console.log('Count:', result);
}

async function task5() {
    var cnt = 0
    const preResult = await District.findAll({
        attributes: ['name', [sequelize.fn('COUNT', sequelize.col('houses.subscribers.subscriptions.subscriptionid')), 'subscription_count']],
        group: ['district.districtid'],
        include: {
            model: House,
            attributes: [],
            required: true,
            include: {
                model: Subscriber,
                attributes: [],
                required: true,
                include: {
                    model: Subscription,
                    attributes: [],
                    required: true
                }
            }
        },
        order: [[sequelize.fn('COUNT', sequelize.col('houses.subscribers.subscriptions.subscriptionid')), 'DESC']],
    })
    preResult.map((district) => cnt = Math.max(cnt, parseInt(district.get('subscription_count'))))

    const result = await District.findAll({
        attributes: ['name', [sequelize.fn('COUNT', sequelize.col('houses.subscribers.subscriptions.subscriptionid')), 'subscription_count']],
        group: ['district.districtid'],
        having: where (
            sequelize.fn('COUNT', sequelize.col('houses.subscribers.subscriptions.subscriptionid')), cnt
        ),
        include: {
            model: House,
            attributes: [],
            required: true,
            include: {
                model: Subscriber,
                attributes: [],
                required: true,
                include: {
                    model: Subscription,
                    attributes: [],
                    required: true
                }
            }
        }
    })
    console.log('Districts:', result.map((item) => item.name));
}

async function task6() {
    const result = await Subscription.findOne({
        attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('duration')), 2), 'avg_duration']]
    })
    console.log('Avg duration:', result.get('avg_duration'));
}

async function task6_1() {
    const result = await Subscription.findOne({
        attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('duration')), 2), 'avg_duration']],
        where: {
            startdate: {
                [Op.gte]: sequelize.literal('NOW() - interval \'1 day\' * duration')
            }
        }
    })
    console.log('Avg duration:', result.get('avg_duration'));
}
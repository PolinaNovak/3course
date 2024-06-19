import {Publication} from "../Entities/Publication.js";
import {Postman} from "../Entities/Postman.js";
import {District} from "../Entities/District.js";
import {House} from "../Entities/House.js";
import {Subscription} from "../Entities/Subscription.js";
import {Subscriber} from "../Entities/Subscriber.js";
import {sequelize} from "../createSchemas.js";
import {Op, where} from "sequelize";

export async function taskOrdered1() {
    console.time('t1')
    const result = await Publication.findAll({
        attributes: ['title'],
        order: ['title'],
        limit: 1,
        subQuery: false
    })
    console.log('Titles:', result.map((item) => item.title));
}

export async function taskOrdered2() {
    console.time('t2')
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
        order: ['lastname'],
        limit: 1,
        subQuery: false
    })
    console.log('Postman lastname:', result.map((item) => item.lastname));
}

export async function taskOrdered3() {
    console.time('t3')
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
        },
        order: ['title'],
        limit: 1,
        subQuery: false
    })
    console.log('Titles:', result.map((item) => item.title));
}

export async function taskOrdered4() {
    console.time('t4')
    const result = await Postman.count()
    console.log('Count:', result);
}

export async function taskOrdered5() {
    console.time('t5')
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
        limit: 1,
        subQuery: false
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
        },
        order: ['name'],
        limit: 1,
        subQuery: false
    })
    console.log('Districts:', result.map((item) => item.name));
}

export async function taskOrdered6() {
    console.time('t6')
    const result = await Subscription.findOne({
        attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('duration')), 2), 'avg_duration']],
        order: ['avg_duration'],
        limit: 1,
        subQuery: false
    })
    console.log('Avg duration:', result.get('avg_duration'));
}

export async function taskOrdered6_1() {
    console.time('t6_1')
    const result = await Subscription.findOne({
        attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('duration')), 2), 'avg_duration']],
        where: {
            startdate: {
                [Op.gte]: sequelize.literal('NOW() - interval \'1 day\' * duration')
            }
        },
        order: ['avg_duration'],
        limit: 1,
        subQuery: false
    })
    console.log('Avg duration:', result.get('avg_duration'));
}
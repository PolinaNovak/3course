var express = require('express');
const controller = require('../public/javascripts/orm/controller.js');
var routes = express.Router();


routes.get('/', function (req, res, next) {
    res.render('index');
});

routes.post('/get_subject', function (req, res, next) {
    const query_params = req.body;
    console.log(query_params)
    let number = 0
    if (typeof query_params.order_number === "string"){
        try {
            number = parseInt(query_params.order_number)
        }
        catch (error) {
            console.error(error)
        }
    }
    else {
        number = query_params.order_number
    }

    if (10 > number > 0) {
        controller.getSubject(
            query_params.class,
            query_params.day,
            number
        ).then((result) => {
            res.render('answer', {content: result});
        })
            .catch((error) => {
                res.redirect('error')
            })
    }
});

routes.post('/get_teacher', function (req, res, next) {
    const query_params = req.body;
    console.log(query_params)

    controller.getTeacher(
        query_params.class,
    ).then( (result) => {
        res.render('answer', {content: result});
    })
        .catch( (error) => {
            res.redirect('error')
        })
});

routes.post('/get_cabinet', function (req, res, next) {
    const query_params = req.body;
    console.log(query_params)

    controller.getCabinetOnW5(
        query_params.class,
    ).then( (result) => {
        res.render('answer', {content: result});
    })
        .catch( (error) => {
            res.redirect('error')
        })
});

routes.post('/get_class', function (req, res, next) {
    const query_params = req.body;
    console.log(query_params)

    controller.getClassByTeacher(
        query_params.subject,
        query_params.lastName,
        query_params.firstName,
        query_params.patronymic
    ).then( (result) => {
        res.render('answer', {content: result});
    })
        .catch( (error) => {
            res.redirect('error')
        })
});

routes.post('/get_schedule', function (req, res, next) {
    const query_params = req.body;
    console.log(query_params)

    controller.getSchedule(
        query_params.class,
        query_params.day
    ).then( (result) => {
        res.render('answer', {content: result});
    })
        .catch( (error) => {
            res.redirect('error')
        })
});

routes.post('/get_count', function (req, res, next) {
    const query_params = req.body;
    console.log(query_params)

    controller.getCountStudents(
        query_params.class
    ).then( (result) => {
        res.render('answer', {content: result});
    })
        .catch( (error) => {
            res.redirect('error')
        })
});



module.exports = routes

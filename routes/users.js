var express = require('express');
//var passport = require('passport');
//var router = express.Router();

var db = require('../db/mongoose');
var userInfo = require('../models/usersDATAModel');//Load model in to memory

db.model('userDetails'); // use model

exports.getUser = function(req,res){

    userInfo.find(function (err, users) {
        if (!err) {
            return res.json(users);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
}

exports.createUser = function(req,res){


    var user = new userInfo({
        UserId: req.body.id,
        UserName: req.body.author,
        GatewayMAC: req.body.description,
        Status:req.body.stat
    });

    user.save(function (err) {
        if (!err) {
            //log.info('New article created with id: %s', article.id);
            return res.json({
                status: 'OK',
                //article: article
            });
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
}



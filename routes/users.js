var express = require('express');
var db = require('../db/mongoose');
var userInfo = require('../models/usersDATAModel');//Load model in to memory

db.model('userDetails'); // use model

exports.getAllUser = function(req,res){

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

exports.getUser = function(req,res){

    var UserID = req.params.id
    userInfo.find({"UserId":UserID},{"_id":0},function (err, user) {
    if (!err) {
        return res.json(user);
    } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.json({
                error: 'Server error'
            });
        }
    });
}

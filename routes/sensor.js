var express = require('express');
var db = require('../db/mongoose');
var nodes = require('../models/sensorDATAModel');//Load model in to memory

db.model('sensorINFO'); // use model

exports.getGraphPoints = function(req,res){

    var node = req.params.id
    nodes.find({"NodeMAC":node,"Created_at" : {$gt: new Date('03/18/2018')}},{"Created_at":1,"Value":1,"_id":0},function (err, user) {
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

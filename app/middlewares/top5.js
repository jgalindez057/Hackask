/**
 * Created by root on 15/07/15.
 */

var Question = require('../models/question');
var mostComments = function (petic, resp, next) {
    Question
        .aggregate([
            {$unwind: "$answers"},
            {$group: {_id:"$title",
                answers: {$push:"$answers"},
                  size: {$sum:1}}},
            {$limit : 5 },
            {$sort:{size:-1}}])
        .exec(function(err, question){
            if(err){
                console.log('error haciendo el sort');
            }
            petic.fiveQuestion = question;
            next();
        });
};

module.exports = mostComments;
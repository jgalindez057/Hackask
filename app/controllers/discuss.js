var Question = require('../models/question');
var User = require('../models/user');

var disscuss = function(server) {

    server.route('/save-question')

    .post(function (petic, resp) {
            User.findOne({
                displayName: petic.user.displayName
            }, function (err, user) {
                if (user) {
                    var question = new Question({
                        user: user,
                        title: petic.body.title,
                        content: petic.body.content
                    });

                    question.save(function(err) {
                        if (err) {
                            console.log("error");
                            console.log(petic.body);
                            return;
                        };
                    });
                    resp.redirect("/");
                } else {
                    console.log("error")
                }
            })
    });
}

module.exports = disscuss;

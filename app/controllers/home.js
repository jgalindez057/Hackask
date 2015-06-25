var User = require('../models/userjohn')

var homeController = function(server) {
    console.log("Home controller Funcionando");

    server.route("/")
        .get(function (petic, resp) {
            if (petic.user) {
                var user = new User({
                	id_network : petic.user.id,
                    first_name : petic.user.name.givenName,
                    last_name : petic.user.name.familyName,
                    username : petic.user.displayName,
                })

                user.save(function(err) {
                    if (err) {
                        console.log("error");
                        console.log(user)
                        return;
                    }
                });

                var name = petic.user._json.first_name;
                var lastname = petic.user._json.last_name;
                var url_foto = "http://graph.facebook.com/" + petic.user.id + "/picture";
                resp.render('home/index', {
                    prove: true,
                    name: name + " " + lastname,
                    url_foto: url_foto
                });
            } else {
                resp.render('home/index');
            }
        });

};

module.exports = homeController;

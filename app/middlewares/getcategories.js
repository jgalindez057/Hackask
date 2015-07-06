var Category = require('../models/category');

function getCategory(petic, resp, next) {
    Category
        .find({})
        .exec(function (err, category) {
            if (category) {
                petic.category = category;
                next();

            };

            if (err) {
            	resp.redirect('/err');
            };
        })
}

module.exports = getCategory;

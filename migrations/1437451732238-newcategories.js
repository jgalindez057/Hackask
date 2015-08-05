var Category = require('../app/models/category');


exports.up = function(next) {
	var newCategories = [
		{
			nameCategory: 'Web development',
			contentCategory: 'Web development es el futuro',
			slug: 'web-development'
		},
		{
			nameCategory: 'Mobile development',
			contentCategory: 'Mobile development es el futuro',
			slug: 'web-development'
		},
		{
			nameCategory: 'Desktop development',
			contentCategory: 'Web development es el futuro',
			slug: 'web-development'
		},
		{
			nameCategory: 'Moti development',
			contentCategory: 'Moti development es el futuro',
			slug: 'web-development'
		}
	];

	newCategories.forEach(function (itemsCategories){
			var saveCategory = new Category();
			saveCategory.nameCategory = itemsCategories.nameCategory;
			saveCategory.contentCategory = itemsCategories.contentCategory;
			saveCategory.slug = itemsCategories.slug;

			saveCategory.save(function (err, category){
				if (err) return console.log("error al guardar las categorias");
				next();
			});
	});
};

exports.down = function(next) {
  next();
};

const Category = require('./routes/category');
const Recipe = require('./routes/recipe');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/category', config: Category.getCategories },
    { method: 'GET', path: '/category/{id}', config: Category.getCategoryById },
    { method: 'POST', path: '/category', config: Category.createCategory },
    { method: 'DELETE', path: '/category/{id}', config: Category.deleteCategory },
    { method: 'GET', path: '/recipe', config: Recipe.getRecipes },
    { method: 'GET', path: '/recipe/{id}', config: Recipe.getRecipeById },
    { method: 'POST', path: '/recipe', config: Recipe.createRecipe },
    { method: 'DELETE', path: '/recipe/{id}', config: Recipe.deleteRecipe },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api',
};

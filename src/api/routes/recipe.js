const Joi = require('joi');
const Boom = require('boom');

let recipes = [];

module.exports.getRecipeById = {
  description: 'Get single recipe by id',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler: (request, reply) => {
    let id = request.params['id'];

  	let recipe;

  	for(let i = 0; i < recipes.length; i++){
  		if(recipes[i]['id'] == id){
  			recipe = recipes[i];
  			break;
  		}
  	}

  	if(typeof recipe === 'undefined'){
      return reply(Boom.notFound(`Ei oo`));
  	} else {
      return reply(recipe)
  	}
  }
};

module.exports.getRecipes = {
  description: 'Get list of all games',
  handler: (request, reply) => reply(recipes),
};

module.exports.createRecipe = {
  description: 'Create new game',
  validate: {
    payload: {
      name: Joi.string().required(),
    },
  },
  handler(request, reply) {
    let name = request.payload['name'];
    let url = request.payload['url'];
    let categoryId = request.payload['categoryId'];

    //TODO: use GUID
    let id = new Date().valueOf();
    let newrecipe = {name : name,
                    id 	: id, 
                    url : url,
                categoryId: categoryId};
     games.push(newrecipe);

     return reply(newrecipe);
  },
};

module.exports.deleteRecipe = {
  description: 'Delete recipe',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler: (request, reply) => {
  	let id = request.params['id'];

  	let recipe;

  	for(let i = 0; i < recipes.length; i++){
  		if(recipes[i]['id'] == id){
  			recipe = recipes[i];
        recipes.splice(recipes.indexOf(recipe), 1);
        break;
  		}
  	}

  	if(recipe){
      return reply();
  	} else {
  		return reply(Boom.notFound('Ei oo'));
  	}
  }
}

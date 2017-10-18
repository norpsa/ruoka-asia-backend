const Joi = require('joi');
const Boom = require('boom');

let categories = [];

module.exports.getCategoryById = {
  description: 'Get single category by id',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler: (request, reply) => {
    let id = request.params['id'];

  	let category;

  	for(let i = 0; i < categories.length; i++){
  		if(categories[i]['id'] == id){
  			category = categories[i];
  			break;
  		}
  	}

  	if(typeof category === 'undefined'){
      return reply(Boom.notFound(`Ei oo`));
  	} else {
      return reply(category)
  	}
  }
};

module.exports.getCategories = {
  description: 'Get list of all games',
  handler: (request, reply) => reply(categories),
};

module.exports.createCategory = {
  description: 'Create new game',
  validate: {
    payload: {
      name: Joi.string().required(),
      description: Joi.string().optional()
    },
  },
  handler(request, reply) {
    let name = request.payload['name'];
    let description = request.payload['description'];

    //TODO: use GUID
    let id = new Date().valueOf();
    let newCategory = {name : name,
                    id 	: id, 
                    description : description};
     categories.push(newCategory);

     return reply(newCategory);
  },
};

module.exports.deleteCategory = {
  description: 'Delete category',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler: (request, reply) => {
  	let id = request.params['id'];

  	let category;

  	for(let i = 0; i < categories.length; i++){
  		if(categories[i]['id'] == id){
  			category = categories[i];
        categories.splice(categories.indexOf(category), 1);
        break;
  		}
  	}

  	if(category){
      return reply();
  	} else {
  		return reply(Boom.notFound('Ei oo'));
  	}
  }
}

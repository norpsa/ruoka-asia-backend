const Joi = require('joi');
const Boom = require('boom');

let games = [];

module.exports.getGameById = {
  description: 'Get single game by id',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler: (request, reply) => {
    let id = request.params['id'];

  	let game;

  	for(let i = 0; i < games.length; i++){
  		if(games[i]['id'] == id){
  			game = games[i];
  			break;
  		}
  	}

  	if(typeof game === 'undefined'){
      return reply(Boom.notFound(`Ei oo`));
  	} else {
      return reply(game)
  	}
  }
};

module.exports.getGames = {
  description: 'Get list of all games',
  handler: (request, reply) => reply(games),
};

module.exports.createGame = {
  description: 'Create new game',
  validate: {
    payload: {
      name: Joi.string().required(),
    },
  },
  handler(request, reply) {
    let name = request.payload['name'];

    //TODO: use GUID
    let id = new Date().valueOf();
    let newGame = {name : name,
		                id 	: id};
     games.push(newGame);

     return reply(newGame);
  },
};

module.exports.deleteGame = {
  description: 'Delete game',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler: (request, reply) => {
  	let id = request.params['id'];

  	let game;

  	for(let i = 0; i < games.length; i++){
  		if(games[i]['id'] == id){
  			game = games[i];
        games.splice(games.indexOf(game), 1);
        break;
  		}
  	}

  	if(game){
      return reply();
  	} else {
  		return reply(Boom.notFound('Ei oo'));
  	}
  }
}

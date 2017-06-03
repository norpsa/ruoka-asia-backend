const Game = require('./routes/game');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/game', config: Game.getGames },
    { method: 'GET', path: '/game/{id}', config: Game.getGameById },
    { method: 'POST', path: '/game', config: Game.createGame },
    { method: 'DELETE', path: '/game/{id}', config: Game.deleteGame },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api',
};

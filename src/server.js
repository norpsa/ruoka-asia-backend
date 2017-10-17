const config = require('./config/config');
const Hapi = require('hapi');

const server = new Hapi.Server({});

// allow port configuration through argv
server.connection({
  host: config.host,
  port: config.port,
  routes: {
    cors: true,
  },
});

// Register api and plugins
server.register([
  {
    // logging
    register: require('good'),
    options: require('./config/logging'),
  }, {
    // prints routes on startup
    register: require('blipp'),
    options: {},
  },
  // needed by lout
  require('vision'),
  require('inert'),
  {
    // api documentation
    register: require('lout'),
    options: {},
  }], {}, (err) => {
    if (err) {
      throw err;
    }
  });

server.register({
  // api
  register: require('./api'),
  options: {},
  routes: {
    prefix: '/api/v1',
  },
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});

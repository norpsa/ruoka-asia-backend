// Set NODE_ENV to development if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  port: Number(process.env.PORT || 8080),
  host: process.env.HOST || 'localhost',
};

module.exports = config;

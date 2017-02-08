"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var io = require('socket.io')(http);

// Allow cross domain requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

var games = [];

app.use(morgan('dev'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/v1', router);
router.use(bodyParser.json());
router.use(allowCrossDomain);

// CREATE GAME
router.post('/game', function(req, res){
  let name = req.body['name'];
  if(name){
    //TODO: use GUID
    let id = new Date().valueOf();
    let newGame = {name : name,
		                id 	: id};
     games.push(newGame);
     res.status(200).json(newGame);
  }else{
    res.status(400).send("Kirjota nimi, bitte");
  }
});

// GET LIST OF GAMES
router.get('/game', function(req, res){
	res.json(games);
});

// GET GAME BY ID
router.get('/game/:id', function(req, res){
	let id = req.params['id'];

	let game;

	for(let i = 0; i < games.length; i++){
		if(games[i]['id'] == id){
			game = games[i];
			break;
		}
	}

	if(typeof game === 'undefined'){
		res.status(404).send('Ei oo');
	} else {
		res.json(game);
	}

});

// DELETE GAME BY ID
router.delete('/game/:id', function(req, res){
	let id = req.params['id'];

	let game;

	for(let i = 0; i < games.length; i++){
		if(games[i]['id'] == id){
			game = games[i];
      games.splice(games.indexOf(game), 1);
      break;
		}
	}

	if(game){
    res.sendStatus(200);
	} else {
		res.status(404).send('Ei oo');
	}

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');

// your routes here

app.get('/', function(req, res) {
    res.redirect('/games');
});

app.get('/games', function(req, res) {
    var games = getGames();

    res.render('games-index', { games: games });
});

app.get('/games/new', function(req, res) {
    res.render('games-new');
});

app.post('/games', function(req, res) {
    console.log(req.body);
    var newGame = req.body;

    var games = getGames();
    games.push(newGame);
    saveGames(games);

    res.redirect('/games');
});

// show page
app.get('/game/:name', function(req, res) {
    var nameOfTheGame = req.params.name;
    var games = getGames();
    var game = getGame(games, nameOfTheGame);

    res.render('games-show', game);
});

app.get('/game/:name/edit', function(req, res) {
    var nameOfTheGame = req.params.name;
    var games = getGames();
    var game = getGame(games, nameOfTheGame);

    res.render('games-edit', game);
});

app.put('/game/:name', function(req, res) {
    var theNewGameData = req.body;

    var nameOfTheGame = req.params.name;
    var games = getGames();
    var game = getGame(games, nameOfTheGame);

    game.name = theNewGameData.name;
    game.description = theNewGameData.description;

    saveGames(games);

    res.send(req.body);
});

app.delete('/game/:name', function(req, res) {
    var nameOfTheGame = req.params.name;
    var games = getGames();
    var game = getGame(games, nameOfTheGame);
    var indexOfGameToDelete = games.indexOf(game);

    games.splice(indexOfGameToDelete, 1);

    saveGames(games);

    res.send(game);
});

// helper functions

function getGame(games, nameOfTheGame) {
    var game = null;

    for (var i = 0; i < games.length; i++) {
        if (games[i].name.toLowerCase() == nameOfTheGame.toLowerCase()) {
            game = games[i];
            break;
        }
    }

    return game;
}

// Read list of games from file.
function getGames() {
    var fileContents = fs.readFileSync('./games.json'); // :'(
    var games = JSON.parse(fileContents);
    return games;
}

// Write list of games to file.
function saveGames(games) {
    fs.writeFileSync('./games.json', JSON.stringify(games));
}

// start the server

var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);

// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');
var db = require('./models');

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

// our games listed out
app.get('/games', function(req, res) {
    db.game.findAll().then(function(games) {
        res.render('games-index', { games: games });
    }).catch(function(error) {
        res.status(404).send(error);
    });


});

// form page to add for new games
app.get('/games/new', function(req, res) {
    res.render('games-new');
});

// action for adding new game
app.post('/games', function(req, res) {


    var newGame = req.body;

    db.game.create({
        name: newGame.name,
        description: newGame.description
    }).then(function() {
        res.redirect('/games');
    });

});

// show page for each game
app.get('/game/:name', function(req, res) {

    var gameName = req.params.name;

    db.game.find({
        where: {
            name: gameName
        }
    }).then(function(foundGame) {
        res.render('games-show', foundGame.dataValues);
    });
});

//form to edit games
app.get('/game/:name/edit', function(req, res) {

    var gameName = req.params.name;

    db.game.find({
        where: {
            name: gameName
        }
    }).then(function(foundGame) {
        res.render('games-edit', foundGame.dataValues);
    });
});

// handle edit aftter submit on edit page
app.put('/game/:name', function(req, res) {
    var newGameData = req.body;

    var gameName = req.params.name;

    db.game.update({
        name: newGameData.name,
        description: newGameData.description,
        number_of_players: newGameData.number_of_players
    }, {
        where: {
            name: gameName
        }
    }).then(function() {
        res.send(req.body);
    });

});

// handle deletions
app.delete('/game/:name', function(req, res) {
    var gameName = req.params.name;

    db.game.destroy({
        where: {
            name: gameName
        }
    }).then(function() {
        res.redirect("/game");
        // why wont the page reload
    });

});




// start the server

var port = 3000;

app.listen(port);

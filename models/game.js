'use strict';
module.exports = function(sequelize, DataTypes) {
    var game = sequelize.define('game', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        number_of_players: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
                min: {
                    args: 1,
                    msg: "must be > 0"
                }
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return game;
};

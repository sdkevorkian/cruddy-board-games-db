'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity. */
        return queryInterface.addColumn('games', 'number-of-players', Sequelize.INTEGER);
        /*     Example:
             return queryInterface.createTable('users', { id: Sequelize.INTEGER });
           */
    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};

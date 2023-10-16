'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [

      {
        name: 'GLobal'
      },
      {
        name: 'Private'
      },
      {
        name: 'Recent'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', {}, null);
  }
};

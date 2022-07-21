'use strict';
let dataStore = require('../data/stores.json')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     dataStore.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
     })
     return queryInterface.bulkInsert('Stores', dataStore, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Stores', null, {})
  }
};

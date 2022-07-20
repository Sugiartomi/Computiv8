'use strict';
let dataItems = require('../data/Items.json')

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
     dataItems.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
     })
     return queryInterface.bulkInsert('Items', dataItems, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Items', null, {})
  }
};

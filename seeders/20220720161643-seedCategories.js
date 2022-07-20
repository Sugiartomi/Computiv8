'use strict';
let dataCategories = require('../data/categories.json')
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
     dataCategories.forEach(e => {
      delete e.id
      e.createdAt = new Date()
      e.updatedAt = new Date()
     })
     return queryInterface.bulkInsert('Categories', dataCategories, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Categories',null, {})
  }
};

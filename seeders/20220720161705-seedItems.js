'use strict';
let dataProduct = require('../data/products.json')

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
     dataProduct.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
     })
     return queryInterface.bulkInsert('Products', dataProduct, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {})
  }
};

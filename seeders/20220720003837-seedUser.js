'use strict';
let dataUser = require('../data/users.json')

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
   dataUser.forEach(e => {
    e.createdAt = new Date()
    e.updatedAt = new Date()
   })
   return queryInterface.bulkInsert('Users', dataUser, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null,{})
  }
};

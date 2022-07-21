'use strict';
let dataProfile = require('../data/profile.json')
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
    dataProfile.forEach(e => {
    e.createdAt = new Date()
    e.updatedAt = new Date()
   })
   return queryInterface.bulkInsert('Profiles', dataProfile, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null)
  }
};

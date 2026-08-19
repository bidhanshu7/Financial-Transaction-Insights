'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('filters',
      [
        {
        
          filterTypeId:1,
          filterValue:"0-100"
        },
        {
  
          filterTypeId:2,
          filterValue:"0-100000"
        },
        {
           filterTypeId:3,
          filterValue:"3"
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('filters', null, {});
  }
};

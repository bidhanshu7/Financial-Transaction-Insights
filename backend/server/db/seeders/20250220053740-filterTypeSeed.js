'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('filter_types',[
    {
      filterTypeId: 1 ,
      filterName:"volume" 
    },
    {
      filterTypeId: 2 ,
      filterName: "amount"
    },
    {
      filterTypeId: 3 ,
      filterName: "days"
    }
  ]
  )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('filter_types', null, {});

  }
};

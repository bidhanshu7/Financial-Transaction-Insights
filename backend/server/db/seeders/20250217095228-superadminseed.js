const {v4: uuidv4}=require("uuid");
const bcrypt= require('bcrypt')
'use strict';

const { UUID } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        id: uuidv4(),
        username:'Aaisha Pokhrel',
        email:'aaishapokhrel@gmail.com',
        password: await bcrypt.hash('aaisha123', 10),
      },
      {
        id: uuidv4(),
        username:'Abiskar Lamichhane',
        email:'abiskarlamichhane@gmail.com',
        password: await bcrypt.hash('abiskar123', 10),
      },
      {
        id: uuidv4(),
        username:'Samrat Poudel',
        email:'samratpoudel@gmail.com',
        password: await bcrypt.hash('samrat123', 10),
       
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};

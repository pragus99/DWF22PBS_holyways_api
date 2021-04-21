"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "spiderman",
          email: "spiderman@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Andi",
          email: "andi@kfcsupport.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "surti",
          email: "surti@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};

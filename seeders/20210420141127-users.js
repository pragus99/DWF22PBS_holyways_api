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
          password: "spiderman",
          image: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Andi",
          email: "andi@kfcsupport.com",
          password: "andi",
          image: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "surti",
          email: "surti@gmail.com",
          password: "surti",
          image: "",
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

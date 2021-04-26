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
      "UsersDonates",
      [
        {
          userId: "1",
          fundId: "1",
          fullName: "Ada",
          email: "ada@gmail.com",
          donateAmount: 25000,
          status: "pending",
          proofAttachment: "lalalallaal.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "2",
          fundId: "1",
          fullName: "ade",
          email: "ade@gmail.com",
          donateAmount: 90000,
          status: "pending",
          proofAttachment: "lwe222222.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "3",
          fundId: "1",
          fullName: "adi",
          email: "adi@gmail.com",
          donateAmount: 45000,
          status: "pending",
          proofAttachment: "vcvclaew.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "2",
          fundId: "2",
          fullName: "ade",
          email: "ade@gmail.com",
          donateAmount: 1000,
          status: "pending",
          proofAttachment: "bvbvbvbvl.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "3",
          fundId: "2",
          fullName: "adi",
          email: "adi@gmail.com",
          donateAmount: 500,
          status: "pending",
          proofAttachment: "21weaal.png",
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
    await queryInterface.bulkDelete("UsersDonates", null, {});
  },
};

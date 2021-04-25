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
          userId: "2",
          fundId: "1",
          fullName: "Dul",
          email: "dul@gmail.com",
          donateAmount: 25000,
          status: "pending",
          proofAttachment: "lalalallaal.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "3",
          fundId: "1",
          fullName: "Oli",
          email: "oli@gmail.com",
          donateAmount: 90000,
          status: "pending",
          proofAttachment: "lwe222222.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "4",
          fundId: "1",
          fullName: "Solar",
          email: "solar@gmail.com",
          donateAmount: 45000,
          status: "pending",
          proofAttachment: "vcvclaew.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "2",
          fundId: "2",
          fullName: "Dul",
          email: "dul@gmail.com",
          donateAmount: 1000,
          status: "pending",
          proofAttachment: "bvbvbvbvl.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "4",
          fundId: "2",
          fullName: "Solar",
          email: "solar@gmail.com",
          donateAmount: 500,
          status: "pending",
          proofAttachment: "21weaal.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "4",
          fundId: "4",
          fullName: "Solar",
          email: "solar@gmail.com",
          donateAmount: 80000,
          status: "pending",
          proofAttachment: "pioilald.png",
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

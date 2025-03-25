"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Skills",
      [
        {
          user_id: 1,
          skill: "JavaScript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          skill: "NodeJS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          skill: "React",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Skills", null, {});
  },
};

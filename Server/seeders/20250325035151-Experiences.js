"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Experiences",
      [
        {
          user_id: 1,
          company: "PT. ABC",
          position: "Software Engineer",
          start: "2020-01-01",
          end: "2022-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          company: "PT. DEF",
          position: "Software Engineer",
          start: "2022-01-01",
          end: "2024-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Experiences", null, {});
  },
};

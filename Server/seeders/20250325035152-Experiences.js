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
          start_date: "2020-01-01",
          end_date: "2022-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          company: "PT. DEF",
          position: "Software Engineer",
          start_date: "2022-01-01",
          end_date: "2024-01-01",
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

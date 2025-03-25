"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Educations",
      [
        {
          user_id: 1,
          level: "SMA",
          institution: "SMA Negeri 1 Jakarta",
          major: "IPA",
          gpa: 3.5,
          startDate: 2010,
          endDate: 2013,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          level: "S1",
          institution: "Universitas Indonesia",
          major: "Teknik Informatika",
          gpa: 3.7,
          startDate: 2013,
          endDate: 2017,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          level: "S2",
          institution: "Universitas Indonesia",
          major: "Teknik Informatika",
          gpa: 3.8,
          startDate: 2017,
          endDate: 2019,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Educations", null, {});
  },
};

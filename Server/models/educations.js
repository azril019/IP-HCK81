"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Educations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Educations.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Educations.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["SMA", "D3", "S1", "S2", "S3"]],
          notNull: { msg: "Level is required" },
          notEmpty: { msg: "Level is required" },
        },
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Institution is required" },
          notEmpty: { msg: "Institution is required" },
        },
      },
      major: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Major is required" },
          notEmpty: { msg: "Major is required" },
        },
      },
      gpa: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "GPA is required" },
          notEmpty: { msg: "GPA is required" },
        },
      },
      startDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Start date is required" },
          notEmpty: { msg: "Start date is required" },
        },
      },
      endDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "End date is required" },
          notEmpty: { msg: "End date is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Educations",
    }
  );
  return Educations;
};

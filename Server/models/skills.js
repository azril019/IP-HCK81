"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Skills.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Skills.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      skill: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Skill is required" },
          notEmpty: { msg: "Skill is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Skills",
    }
  );
  return Skills;
};

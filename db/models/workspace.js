'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Workspace.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'CASCADE'
      });

      // All list will belong to a default created workspace, this will
      // make easier to develop future fuctionalities, like having diferent
      // groups of lists or have a special workspace with shared list from
      // other users.
      Workspace.hasMany(models.List, {
        foreignKey: 'workspaceId',
        onDelete: 'CASCADE'
      });
    }
  }

  Workspace.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'dashboard:workspace.newWorkspaceName',
      validate: {
        notEmpty: {
          msg: 'validations.nameEmpty'
        }
      }
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: {
          msg: 'validations.booleanInvalid'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Workspace',
  });

  return Workspace;
};
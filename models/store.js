'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.User)
      Store.hasMany(models.Item)
    }
  }
  Store.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    income: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};
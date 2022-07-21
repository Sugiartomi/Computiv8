'use strict';
const bcryptjs = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(newUser, option){
        const salt = bcryptjs.genSaltSync(8)
        const hash = bcryptjs.hashSync(newUser.password, salt)
        newUser.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
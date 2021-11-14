'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      brand.belongsTo(models.user,{
        as : 'user',
        foreignKey : {
          name : 'userId',
        }
      }),
      brand.hasMany(models.link,{
        as : 'brand',
        foreignKey : {
          name : 'brandId',
        }
      })
    }

  };
  brand.init({
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    visits: DataTypes.STRING,
    thumbnail: DataTypes.TEXT,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'brand',
  });
  return brand;
};
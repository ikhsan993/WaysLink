'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.brand,{
        as : 'brand',
        foreignKey : {
          name : 'brandId',
        }
      })
    }
  };
  link.init({
    facebook: DataTypes.TEXT,
    instagram: DataTypes.TEXT,
    twitter: DataTypes.TEXT,
    youtube: DataTypes.TEXT,
    whatsapp: DataTypes.TEXT,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'link',
  });
  return link;
};
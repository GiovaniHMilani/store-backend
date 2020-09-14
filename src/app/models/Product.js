module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    unit_value: DataTypes.FLOAT,
  });
  return Product;
};

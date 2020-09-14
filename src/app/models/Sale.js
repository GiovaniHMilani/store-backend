module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    total_value: DataTypes.FLOAT,
    seller_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return Sale;
};

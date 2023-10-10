const { DataTypes } = require("sequelize");
const { sequelize } = require("./conn");
const Category = require("./categoryModel");

const Item = sequelize.define(
  "items",
  {
    // The model name is typically the singular form of the table name.
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Item.belongsTo(Category, {
  foreignKey: "category_id",
});

sequelize.sync();

module.exports = Item;

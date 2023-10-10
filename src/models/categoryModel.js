const { DataTypes } = require("sequelize");
const { sequelize } = require("./conn");

const Category = sequelize.define(
  "category",
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
  },
  {
    timestamps: false, //This is added to skip createdAt and updatedAt checks.
    //You can modify your database table to add these rows as needed.
  }
);

sequelize.sync();
module.exports = Category;

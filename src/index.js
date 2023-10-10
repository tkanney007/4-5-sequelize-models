const { sequelize, testConnection } = require("./models/conn");
const { Op } = require("sequelize");
const Category = require("./models/categoryModel");
const Item = require("./models/itemModel");

testConnection();

//Retrieving Data
const findCategories = async () => {
  const result = await Category.findAll();
  console.log(JSON.stringify(result));
};

// findCategories();

async function findCategoriesByName(categoryName) {
  const result = await Category.findAll({
    where: { name: categoryName },
    attributes: ["id"],
  });
  return JSON.stringify(result);
}

// findCategoriesByName();

//Creating data
const createNewCategory = async () => {
  await Category.create({
    name: "meat",
  });
  findCategories();
};

// createNewCategory();

//Editing data
const updatingCategory = async () => {
  await Category.update({ name: "meats" }, { where: { id: 3 } });
  findCategories();
};

// updatingCategory();

//Deleting data
const deleteCategory = async () => {
  await Category.destroy({ where: { id: 3 } });
  findCategories();
};

// deleteCategory();

//Associations
const findItems = async () => {
  const results = await Item.findAll({ include: Category });
  console.log(JSON.stringify(results));
};

// findItems();

// 1. Recreate the "meats" category. (Note what the id number will be)

const addCategory = async (categoryName) => {
  try {
    await Category.create({
      name: categoryName,
    });
    //findCategories();
  } catch (err) {
    console.log(err);
  }
};
//1. Recreate the "meats" category. (Note what the id number will be)
addCategory("meats");
// 2. Create 2 items called "pork" and "chicken". (Provide the other details as needed.)

const addItems = async (categoryID) => {
  try {
    await Item.bulkCreate([
      {
        name: "pork",
        price: 6.99,
        description: "Porkchops",
        category_id: categoryID,
      },
      {
        name: "chicken",
        price: 7.99,
        description: "Chicken Breasts",
        category_id: categoryID,
      },
    ]);
  } catch (err) {
    console.log(`There was an error: ${err}`);
  }
};

findCategoriesByName("meats").then((res) => {
  const result = JSON.parse(res);
  //console.log(result[0].id);
  addItems(result[0].id);
});

// 3. Search for all fruits and display the name and description of each.
addCategory("fruits");

const addFruitItems = async (categoryID) => {
  try {
    await Item.bulkCreate([
      {
        name: "Apple",
        price: 1.99,
        description: "Gala Apples",
        category_id: categoryID,
      },
      {
        name: "Orange",
        price: 2.99,
        description: "Seedless oranges",
        category_id: categoryID,
      },
    ]);
  } catch (err) {
    console.log(`There was an error: ${err}`);
  }
};

findCategoriesByName("fruits").then((res) => {
  const result = JSON.parse(res);
  //console.log(result[0].id);
  addFruitItems(result[0].id);
});
// 4. Update all the meat prices to 120.99
const updateMeatPrices = async () => {
  try {
    await Item.update({ price: 21.99 }, { where: { category_id: 30 } });
  } catch (err) {
    console.log(err);
  }
};
updateMeatPrices();
// 5. Select all items with prices greater than 20
const getItems = async () => {
  const result = await Item.findAll({ where: { price: { [Op.gt]: 20 } } });
  console.log(JSON.stringify(result));
};

getItems();

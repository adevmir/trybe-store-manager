const productsModels = require('../models/sales');

const getAll = async () => {
  const allProducts = await productsModels.getAll();
  return { code: 200, message: allProducts };
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  
  if (product.length === 0) {
    throw new Error('Sale not found');
  }
  return { code: 200, message: product };
};

async function registerSale(data) {
  const newData = await productsModels.registerSale(data);
  return {
    message: newData,
    code: 201,
  };
}

module.exports = { getAll, getById, registerSale };
const productsModels = require('../models/products');

const getAll = async () => {
  const allProducts = await productsModels.getAll();

  return { code: 200, message: allProducts };
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  
  if (product.length === 0) {
    throw new Error('Product not found');
  }
  return { code: 200, message: product[0] };
};

async function create(name) {
  const products = await productsModels.create(name);
  return {
    message: products,
    code: 201,
  };
}

async function edit(name, id) {
  const products = await productsModels.edit(name, id);
  return {
    message: products,
    code: 200,
  };
}

module.exports = { getAll, getById, create, edit };
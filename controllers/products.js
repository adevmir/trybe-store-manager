const productsServices = require('../services/products');

const getAll = async (_req, res) => {
  const { message, code } = await productsServices.getAll();
  return res.status(code).json(message);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, code } = await productsServices.getById(id);
    return res.status(code).json(message);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById };
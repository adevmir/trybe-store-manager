const salesServices = require('../services/sales');

const getAll = async (_req, res) => {
  const { message, code } = await salesServices.getAll();
  return res.status(code).json(message);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { message, code } = await salesServices.getById(id);
    return res.status(code).json(message);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const registerSale = async (req, res) => {
  const { message, code } = await salesServices.registerSale(req.body);
  return res.status(code).json(message);
};

module.exports = { getAll, getById, registerSale };
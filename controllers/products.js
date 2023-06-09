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

const create = async (req, res) => {
  const { name } = req.body;
  const { message, code } = await productsServices.create(name);
  return res.status(code).json(message);
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    await productsServices.getById(id);
    const { name } = req.body;
    const { message, code } = await productsServices.edit(name, id);
    return res.status(code).json(message);
    } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.params;
    await productsServices.getById(id);
    const { code } = await productsServices.del(id);
    return res.status(code).end();
    } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, edit, del };
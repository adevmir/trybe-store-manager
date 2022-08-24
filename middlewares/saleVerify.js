const productsModels = require('../models/products');

const verifySale = async (req, res, next) => {
  const { data } = req.body;

  const prodIds = await data.map((d) => [d.productId]);
  if (!prodIds.includes(undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const quantitys = await data.map((q) => [q.quantity]);
  if (!quantitys.includes(undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!quantitys.find((i) => i < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const product = await prodIds.map((i) => [productsModels.getById(i)]);
  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { verifySale };
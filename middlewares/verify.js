const verifyProduct = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
    }
  if (name.length < 5) {
    return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' }); 
  }
  next();
};

const productsModels = require('../models/products');

const verifySale = async (req, res, next) => {
  const prodIds = await Promise.all(req.body.map((d) => d.productId));
  if (prodIds.includes(undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  const quantitys = await Promise.all(req.body.map((q) => q.quantity));
  if (quantitys.includes(undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantitys.some((i) => i <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const product = await productsModels.getAll();
  const Ids = await Promise.all(product.map((id) => id.id));
  const teste = await Promise.all(prodIds.map((p) => Ids.includes(p))); 
  if (teste.includes(false)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};
module.exports = { verifyProduct, verifySale };
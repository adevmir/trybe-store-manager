const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [allProducts] = await connection.execute(query);
  return allProducts;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  return product;
};

async function create(name) {
  const [products] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);
  return { id: products.insertId, name };
}

async function edit(name, id) {
  await connection
    .execute('UPDATE StoreManager.products SET name = (?) WHERE id = (?);', [name, id]);
  return { id, name };
}

module.exports = { getAll, getById, create, edit };
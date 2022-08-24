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

async function registerSale(data) {
  const [sale] = await connection
    .execute('INSERT INTO StoreManager.sales (id) VALUES (NULL)');
  await Promise.all(data.map((s) =>
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', [
      sale.insertId,
      s.productId,
      s.quantity,
    ],
)));
  return { id: sale.insertId, itemsSold: data };
}

module.exports = { getAll, getById, create, registerSale };
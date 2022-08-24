const connection = require('./connection');

const getAll = async () => {
  const query = (
    'SELECT sales_products.sale_id AS saleId, sales.date, sales_products.product_id AS productId, '
    + 'sales_products.quantity FROM StoreManager.sales_products, StoreManager.sales '
    + 'WHERE sales.id = sales_products.sale_id; '
  );
  const [allProducts] = await connection.execute(query);
  return allProducts;
};

const getById = async (id) => {
  const query = (
    'SELECT sales.date, sales_products.product_id AS productId, sales_products.quantity '
    + 'FROM StoreManager.sales '
    + 'INNER JOIN StoreManager.sales_products '
    + 'ON sales.id = sales_products.sale_id AND sales.id = (?)'
  );
  const [product] = await connection.execute(query, [id]);
  console.log(product);
  return product;
};

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

module.exports = { getAll, getById, registerSale };
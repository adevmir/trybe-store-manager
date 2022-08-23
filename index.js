const app = require('./app');
require('dotenv').config();

const products = require('./controllers/products');

app.get('/products/:id', products.getById);
app.get('/products', products.getAll);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

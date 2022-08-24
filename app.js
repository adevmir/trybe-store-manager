const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const products = require('./controllers/products');
const verify = require('./middlewares/verify');

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getAll);

app.get('/products/:id', products.getById);

app.post('/products', verify.verifyProduct, products.create);

app.post('/sales', verify.verifySale, products.registerSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
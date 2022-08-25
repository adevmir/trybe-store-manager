const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const products = require('../../../models/products');

describe('Busca apenas um produto no BD por seu ID', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna um objeto de tamanho 0', async () => {
      const response = await products.getById(999);
      console.log(response);
      expect(response.length).to.be.equal(0);
    });
  });

  describe('quando existe um produto com o ID informado', () => {

    before(() => {
      sinon.stub(products, 'getById')
        .resolves(
          {
            id: 1,
            name: 'Martelo de Thor',
          }
        );
    });

    after(() => {
      products.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await products.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await products.getById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "id" e "name"', async () => {
      const item = await products.getById(1);

      expect(item).to.include.all.keys('id', 'name');
    });
  });
});

describe('Insere um novo produto no BD', () => {
  const payloadProduct = {
    name: 'ProdutoX',
  };

  before(async () => {
    const execute = [
      {
        id: 4,
        name: 'ProdutoX',
      }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await products.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await products.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

  });
});
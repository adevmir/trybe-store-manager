const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const ProductService = require('../../../services/products');
const ProductModel = require('../../../models/products');

describe('Busca apenas um produto no BD por seu ID', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  // describe('quando não existe um produto com o ID informado', () => {
  //   before(() => {
  //     sinon.stub(ProductModel, 'getById')
  //       .resolves(Error);
  //   });

  //   it('retorna "Product not Found"', async () => {
  //     const response = await ProductService.getById();

  //     expect(response).to.be.equal(Error);
  //   });
  // });

  describe('quando existe um Produto com o ID informado', () => {

    before(() => {
      sinon.stub(ProductModel, 'getById')
        .resolves(
          {
            id: 1,
            name: 'Martelo de Thor',
          }
        );
    });

    after(() => {
      ProductModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await ProductService.getById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "code" e "message"', async () => {
      const item = await ProductService.getById(1);

      expect(item).to.include.all.keys('code', 'message');
    });
  });
});

describe('Insere um novo produto no BD', () => {
  describe('quando é inserido com sucesso', () => {
    const payloadProduct = {
      name: 'capa do batman',
    };

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(ProductModel, 'create')
        .resolves({ id: ID_EXAMPLE, name: 'capa do batman' });
    });

    after(() => {
      ProductModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "code" de sucesso ao inserir novo produto', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.have.a.property('code');
    });

  });
});
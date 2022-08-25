
const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/products');
const ProductController = require('../../../controllers/products');

describe('Ao chamar o controller de getById', () => {
  // describe('quando não existem produtos no banco de dados', async () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     request.params = {
  //       id: 1,
  //     };

  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.send = sinon.stub()
  //       .returns();

  //     sinon.stub(ProductService, 'getById')
  //       .resolves(error);
  //   });

  //   after(() => {
  //     ProductService.findById.restore();
  //   });

  //   it('é chamado o método "status" passando 404', async () => {
  //     await ProductController.getById(request, response);

  //     expect(response.status.calledWith(404)).to.be.equal(true);
  //   });

  //   it('é chamado o método "send" passando a mensagem "Product not found"', async () => {
  //     await ProductController.findById(request, response);

  //     expect(response.send.calledWith('Product not found')).to.be.equal(true);
  //   });

  // });

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'getById')
        .resolves({
          code: 200,
          message:
            {
              id: 1,
              name: 'Martelo de Thor',
            }});
      });

    after(() => {
      ProductService.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

// describe('Ao chamar o controller de create', () => {
//   describe('quando o payload informado não é válido', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {};

//       response.status = sinon.stub()
//         .returns(response);
//       response.send = sinon.stub()
//         .returns();

//       sinon.stub(MoviesService, 'create')
//         .resolves(false);
//     });

//     after(() => {
//       MoviesService.create.restore();
//     });

//     it('é chamado o status com o código 400', async () => {
//       await MoviesController.create(request, response);

//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Dados inválidos"', async () => {
//       await MoviesController.create(request, response);

//       expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
//     });

//   });

//   describe('quando é inserido com sucesso', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {
//         title: 'Example Movie',
//         directedBy: 'Jane Dow',
//         releaseYear: 1999,
//       };

//       response.status = sinon.stub()
//         .returns(response);
//       response.send = sinon.stub()
//         .returns();

//       sinon.stub(MoviesService, 'create')
//         .resolves(true);
//     });

//     after(() => {
//       MoviesService.create.restore();
//     });

//     it('é chamado o status com o código 201', async () => {
//       await MoviesController.create(request, response);

//       expect(response.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Filme criado com sucesso!"', async () => {
//       await MoviesController.create(request, response);

//       expect(response.send.calledWith('Filme criado com sucesso!')).to.be.equal(true);
//     });

//   });
// });
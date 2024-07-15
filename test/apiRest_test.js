const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const app = require('/app');

describe('GET /tienda/api/productos', () => {
  beforeEach(() => {
    nock('https://fakestoreapi.com')
      .get('/products')
      .reply(200, [
        {
          id: 1,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        }
      ]);
  });

  it('revisamos que resivimos como respuesta un html con el contenido de la api', (done) => {
    request(app)
      .get('/tienda/api/productos')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Product 1');
        expect(res.text).to.include('Description for product 1');
        done();
      });
  });

  it('esperamos un error 500 si la aplicacion no envia informacion', (done) => {
    nock.cleanAll(); // Clean previous nocks
    nock('https://fakestoreapi.com')
      .get('/products')
      .replyWithError('Algo salio mal con la api');

    request(app)
      .get('/tienda/api/productos')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Error al obtener los productos');
        done();
      });
  });
});

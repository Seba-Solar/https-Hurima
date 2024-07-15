const request = require('supertest');
const app = require('/app');
const chai = require('chai');
const expect = chai.expect;

describe('POST /formulario', () => {
  it('Creara un anuncio y retornara un 200', (done) => {
    request(app)
      .post('/formulario')
      .field('titulo', 'Titulo Test')
      .field('descripcion', 'Descripcion Test')
      .attach('imagen', Buffer.from('test image'), 'test.png')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers['content-type']).to.match(/text\/html/);
        done();
      });
  });

  it('Retornara un error 500 si existen problemas en la base de datos', (done) => {
    const originalQuery = app.get('conexion').query;
    app.get('conexion').query = (sql, params, callback) => {
      callback(new Error('Error en la base de datos'), null, null);
    };

    request(app)
      .post('/formulario')
      .field('titulo', 'Tituto Test')
      .field('descripcion', 'Descripcion Test')
      .attach('imagen', Buffer.from('test image'), 'test.png')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Error al insertar el anuncio');
        app.get('conexion').query = originalQuery;
        done();
      });
  });
});
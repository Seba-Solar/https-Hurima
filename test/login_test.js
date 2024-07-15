const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('/app');

describe('GET /login.html', () => {
  it('deberiar retornar el html', (done) => {
    request(app)
      .get('/login.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<form');
        done();
      });
  });
});

describe('POST /login', () => {
  it('deberia retornarte al index despues de logear', (done) => {
    
    const mockQuery = (sql, callback) => {
      callback(null, [{ id: 1, email: 'test@test.com' }], null);
    };

    app.set('conexion', { query: mockQuery });

    request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'test123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<html>'); // la respuesta como texto es para saber si retorno una etiqueta html dentro de la data. (que seria nuestro index cargandose)
        done();
      });
  });

  it('retornaria un mensaje si existe un error al iniciar sesion', (done) => {
    const mockQuery = (sql, callback) => {
      callback(null, [], null);
    };

    app.set('conexion', { query: mockQuery });

    request(app)
      .post('/login')
      .send({ email: 'malo@malo.com', password: 'contrasena mala' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Usuario o contraseña incorrectos');
        done();
      });
  });
});

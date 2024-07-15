const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('/app');

describe('POST /registrar_usuario', () => {
  it('deberia registrar un usuario y enviarte al login.html', (done) => {
    const mockQuery = (sql, callback) => {
      callback(null, { affectedRows: 1 }, null);
    };

    app.set('conexion', { query: mockQuery });

    request(app)
      .post('/registrar_usuario')
      .send({
        nombre_completo: 'test1',
        email: 'testtest@test.com',
        telefono: '123456789',
        password: 'test123'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<html>'); // Aqui verificamos si retorno una pagina html
        done();
      });
  });

  it('retorna un error si existe un problema con la base de datos', (done) => {
    const mockQuery = (sql, callback) => {
      callback(new Error('Database error'), null, null);
    };

    app.set('conexion', { query: mockQuery });

    request(app)
      .post('/registrar_usuario')
      .send({
        nombre_completo: 'testbasedato',
        email: 'testbasedato@test.com',
        telefono: '123456789',
        password: 'test123123'
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Error al ejecutar la consulta');
        done();
      });
  });
});

const mysql = require('mysql');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

describe('Conexion a la base de datos', () => {
  let createConnectionStub, connectStub;

  before(() => {
    createConnectionStub = sinon.stub(mysql, 'createConnection').returns({
      connect: (callback) => {
        callback(null);
      }
    });
    const conexion = require('../app');

    connectStub = sinon.stub(conexion, 'connect').callsFake((callback) => {
      callback(null); 
    });
  });

  after(() => {
    createConnectionStub.restore();
    connectStub.restore();
  });

  it('deberia conectar con la base de datos', (done) => {
    const conexion = require('/app');
    conexion.connect((err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('deberia ocurrir un error en la conexion', (done) => {
    connectStub.callsFake((callback) => {
      callback(new Error('Connection error'));
    });

    const conexion = require('/app');
    conexion.connect((err) => {
      expect(err).to.be.an('error');
      expect(err.message).to.equal('Connection error');
      done();
    });
  });
});

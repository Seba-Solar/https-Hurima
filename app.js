  const express = require('express');
  const app = express();
  const path = require('path');
  const mysql = require('mysql2');
  const port = 8082;

  //IMPORTANTE NO BORRAR
  app.use(express.urlencoded({ extended: true })); // Middleware para parsear los datos del formulario

  //Configurar base de datos

  let conexion = mysql.createConnection({
    host: "localhost",
    database: "httpshurima",
    user: "root",
    password: ""
  });

  conexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  // ------------------------ ROUTING ------------------------ //
  app.get('/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'registro.html'));
  });

  app.get('/anuncio-crear.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/anuncio-crear.html'));
  });

  app.post('/formulario', (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;

  // Crea la consulta SQL
    const sqlQuery = `INSERT INTO anuncios (nombre, descripcion) VALUES ('${nombre}', '${descripcion}')`;
    conexion.query(sqlQuery, (error, results, fields) => {
      if (error) {
          return console.error('Error al ejecutar la consulta:', error.message);
      }
      console.log('Consulta ejecutada con éxito');
      res.sendFile(path.join(__dirname, 'routes/index.html'));
  });
});


  app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/index.html'));
  });


  app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/login.html'));
  });

  app.get("/" , (req, res) => {
    res.redirect('/index');
  });

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
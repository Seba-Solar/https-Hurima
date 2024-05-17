  const express = require('express');
  const app = express();
  const path = require('path');
  const mysql = require('mysql2');
  const multer = require('multer');
  const port = 8082;

  //IMPORTANTE NO BORRAR
  app.use(express.urlencoded({ extended: true })); // Middleware para parsear los datos del formulario

  // Configurar multer para almacenar archivos en la memoria
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  
  // ------------------------ Configuracion de la  base de datos ----------------------- //

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

  // ------------------------ Configuracion de la  base de datos ----------------------- //

  // ------------------------ ROUTING ------------------------ //
  app.get('/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/registro.html'));
  });

  app.get('/anuncio-crear.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/anuncio-crear.html'));
  }); 
  app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/index.html'));
  });

  app.get("/" , (req, res) => {
    res.redirect('/index');
  });

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
  // -------------------- ROUTING ------------------------ //

 // ------------------------ CREACION DE ANUNCIOS ------------------------ // 
 app.post('/formulario', upload.single('imagen'), (req, res) => {
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const imagen = req.file.buffer; 
  
  //Insert into
  const sqlQuery = 'INSERT INTO anuncios (titulo, descripcion, imagen) VALUES (?, ?, ?)';
  
  // A diferencia que en el registro de uisuarios, en este caso se pasa un array con los valores que se van a insertar
  // Ya que la imagen la pasamos como un buffer, no como un string
  // Que es un buffer? Es un tipo de dato que se utiliza para almacenar datos binarios, NO ES UN ARRAYLIST pero si es una cadena de bytes.
  conexion.query(sqlQuery, [titulo, descripcion, imagen], (error, results, fields) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error.message);
          return res.status(500).send('Error al insertar el anuncio');
      }
      console.log('Consulta ejecutada con éxito');
      res.sendFile(path.join(__dirname, 'routes/index.html'));
  });
});
  // ------------------------ CREACION DE ANUNCIOS-------------------------------- //

  // ------------------------ REGISTRO DE USUARIOS ------------------------ //
  app.post('/registrar_usuario', (req,res) =>{
    
    const nombre_completo = req.body.nombre_completo;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const password = req.body.password;

    // Crea la consulta SQL
    const sqlQuery = `INSERT INTO usuarios (nombre_completo, telefono, email, password) VALUES ('${nombre_completo}','${telefono}', '${email}', '${password}')`;
    conexion.query(sqlQuery, (error, results, fields) => {
      if (error){
        return console.error('Error al ejecutar la consulta:', error.message);
      }
      console.log('Consulta ejecutada con éxito');
      res.sendFile(path.join(__dirname, 'routes/login.html'));
    })
  });
  // ------------------------ REGISTRO DE USUARIOS ------------------------ //

  //------------------------ LOGIN DE USUARIOS ------------------------ //
  // Se crea la ruta para el login
  app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes/login.html'));
  }); 

  // Utilizaremos el boton de login para hacer un get a la ruta /login.
  // En esta ruta se ejecutara la siguiente funcion
  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Se crea la consulta SQL
    const sqlQuery = `SELECT * FROM usuarios WHERE email = '${email}' AND password = '${password}'`;
    conexion.query(sqlQuery, (error, results, fields) => {
      if (error){
        return console.error('Error al ejecutar la consulta:', error.message);
      }
      if (results.length > 0){
        console.log('Inicio de sesion exitoso');
        res.sendFile(path.join(__dirname, 'routes/index.html'));
      } else {
        res.send('Usuario o contraseña incorrectos');
      }
    })
  });
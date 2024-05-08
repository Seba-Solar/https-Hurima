const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mysql = require('mysql');

const router = express.Router();

// Configurar el tipo MIME para archivos JavaScript
app.use('/js', express.static(__dirname + '/js', { 'Content-Type': 'text/javascript' }));
app.use(express.static(__dirname + '/js', { 'Content-Type': 'text/javascript' }));


router.get('/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'registro.html'));
});

router.get('/anuncio-crear.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes/anuncio-crear.html'));
});


router.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes/index.html'));
});


router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes/login.html'));
});

app.get("/" , (req, res) => {
	res.redirect('/index');
});



app.use('/', router);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
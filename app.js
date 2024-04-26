const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();

router.get('/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'registro.html'));
});

router.get('/anuncio-crear.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'anuncio-crear.html'));
});

router.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get("/" , (req, res) => {
	res.redirect('/index.html');
});




app.use('/', router);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

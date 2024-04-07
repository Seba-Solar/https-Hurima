// app.js

var express = require('express');
const router = express.Router();
var app = express();

router.get('/index', (req, res) => {
    res.send('index');
  });

var port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
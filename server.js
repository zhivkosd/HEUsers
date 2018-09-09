const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

mongoose.connect(db.url, { useNewUrlParser: true }, (err) => {
    if (err) throw err; 
});

require('./app/routes/routes')(router);

app.use(router);
app.listen(port, () => {
    console.log('Emmit on port ' + port);
});

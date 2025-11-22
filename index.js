const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongodb = require('./database/db'); 
const bodyParser = require('body-parser');
const setupSwagger = require('./swagger');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

setupSwagger(app);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  }
});
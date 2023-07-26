const db = require('./db/database.js'); 
const app = require('./app.js');
const port = process.env.PORT || 3000;

db.sync().then(
  function(){
    app.listen(port);
  }
);
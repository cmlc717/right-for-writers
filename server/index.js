// say our sequelize instance is create in 'db.js'
const db = require('./db/database.js'); 
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require('./app.js');
const port = process.env.PORT || 3000;

db.sync().then(
  function(){
    app.listen(port) // then start listening with our express server once we have synced
}) 
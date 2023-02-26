const bodyParser = require('body-parser');
const authenticationMiddleware = require('../services/authenticationMiddleware');
const usuariosRouter = require('./usuariosRouter.js');
const loginRouter = require('./loginRouter');

module.exports = app => {
   app.use(
      bodyParser.json(),
      loginRouter,
      authenticationMiddleware,
      usuariosRouter
   );
};  
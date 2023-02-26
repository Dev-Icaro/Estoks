const express        = require('express');
const session        = require('express-session');
const passport       = require('passport');
const path           = require('path');
const routes         = require('./routes');
const cookieParser   = require('cookie-parser');
require('./auth')(passport);

const port = 3000;
const app  = express();

app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
   secret: '123',
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 1 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.listen(port, error => {
   if (error) {
      console.log(error);
      return;
   }
   console.log(`o servidor esta rodando na porta ${port}`);
});

module.exports = app;
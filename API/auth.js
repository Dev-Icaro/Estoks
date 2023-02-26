const bcrypt = require('bcrypt');
const dataBase = require('../API/models');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){

   async function findUser(username){
      const user = await dataBase.usuarios.findOne({
         where: {
            nome: String(username)
         }
      });
      return user;
   }

   async function findUserById(id){
      const usuario = await dataBase.usuarios.findOne({
         where: {
            id: Number(id)
         }
      });
      return usuario;
   };

   passport.serializeUser((user, done) => {
      return done(null, user.id);
   });

   passport.deserializeUser(async (id, done) => {
      try {
         const user = await findUserById(id);
         done(null, user);
      } 
      catch (error) {
         console.log(error.message);
         return done(error, null);
      };
   });

   passport.use(new localStrategy({
      usernameField: 'username',
      passwordField: 'password'
   },
   async (username, password, done) => {
      try {
         const user = await findUser(username);
         if (!user) return done(null, false);

         var isValid = bcrypt.compareSync(password, user.senha);
         if (!isValid) return done(null, false);

         return done(null, user);
      }
      catch(error) {
         console.log(error.message);
         return done(error, false);
      }
   }));
};
const { Router } = require('express');
const passport = require('passport');

router = Router();

router.route('/login')
   .get((req, res, next) => {
      if(req.query.fail){
         res.render('../API/views/login', { message: 'Usuario ou senha incorretos' });
      }
      else {
         res.render('../API/views/login', { message: null });  
      }
   })

   .post( 
      passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login?fail=true'
      }
   ));

module.exports = router;
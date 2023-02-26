const { Router } = require('express');

router = Router();

router.get('/', (req, res) => {
   res.status(200)
      .render('../API/views/home');
});

router.get('/teste', (req, res) => {
   res.status(200)
      .render('../API/views/layout');
})



module.exports = router;
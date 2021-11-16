const router = require('express').Router();

router.get('/', (req, res) => {
  try {
    res.render('login'); // homepage handlebar
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('sign-up'); 
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;

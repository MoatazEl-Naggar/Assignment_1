const express = require('express');
const router = express.Router();

router.use('/static',express.static('static'));
router.use('/images', express.static('images'));

router.get('/',function (req ,res) {
    res.render('login');
});

router.get('/register',function (req ,res) {
    res.render('register');
});

router.get('/home',function (req ,res) {
    res.render('home');
});

module.exports = router;
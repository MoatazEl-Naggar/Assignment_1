const express = require('express');
const router = express.Router();
const authController = require('./controllers/auth');

router.use('/static',express.static('static'));
router.use('/images', express.static('images'));

router.get('/',function (req ,res) {
    res.render('login');
});

router.get('/register',function (req ,res) {
    res.render('register');
});

router.get('/home',authController.isLoggedIn, (req ,res) => {
    if(req.user){
        res.render('home', {
            user: req.user
        });
    }else {
        res.redirect('/login');
    }

});

router.get('/profile', authController.isLoggedIn, (req ,res) => {
    if(req.user){
        res.render('profile', {
            user: req.user
        });
    }else {
        res.redirect('/login');
    }

});

module.exports = router;
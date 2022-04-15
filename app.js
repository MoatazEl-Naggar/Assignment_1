const express = require('express');
const mysql = require('mysql');
const app = express();
app.set('view engine','hbs')






const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
});

db.connect((error)=>{
    if (error){
        console.log(error)
    } else {
        console.log("Connected..")
    }
});

app.use('/static',express.static('static'));
app.use('/images', express.static('images'));

//to make sure we can grab the data from any form
app.use(express.urlencoded({extended : false}));
// to make sure we json data
app.use(express.json());

const router = require('./router.js');
const auth = require('./auth.js');
app.use('/', router);
app.use('/auth', auth);



app.listen(3000);

const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
});

exports.register = (req , res) => {
    console.log(req.body);

    const {name,email,password,passwordConfirm} = req.body;
    db.query('SELECT email FROM accounts WHERE email = ?', [email],async (error,results)=>{
        if (error) {
            console.log(error);
        }

        if (results.length > 0){
            return res.render('register',{
                msg: 'That email is already in use!'
            })
        }else if (password !== passwordConfirm){
            return res.render('register',{
                msg: 'Password do not match!'
            });
        }

        db,query('INSERT INTO accounts SET ?', {username: name, email: email, password: password},(error,results) => {
            if (error) {
                console.log(error);
            }else{
                console.log(results)
                return res.render('register',{
                    msg: 'User Registered!'
                })
            }

        });
    });



}

exports.login = (req , res) => {
    console.log(req.body);
    const {email,password} = req.body;

    db.query('SELECT email FROM accounts WHERE email = ?', [email],(error,results)=>{
        if (error) {
            console.log(error);
        }

        if (results.length === 0){
            return res.render('login',{
                msg: 'Invalid email or password!'
            })
        }

        db.query('SELECT password FROM accounts WHERE email = ?', [email],(error,results)=>{
            if (error) {
                console.log(error);
            }

            if (results[0][0] === password){
                return res.render('login',{
                    msg: 'Inva email or password!'
                })
            }else {
                return res.render('home');
            }
        });

    });


}
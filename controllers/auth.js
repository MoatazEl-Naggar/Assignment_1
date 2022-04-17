const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {promisify} = require('util')
require("dotenv").config();


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
        let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO accounts SET ?', {username: name, email: email, password: hashedPassword},(error,results) => {
            if (error) {
                console.log(error);
            }else{
                console.log(results)
                return res.redirect('login',{
                    msg: 'User Registered!'
                })
            }

        });
    });



}

exports.login = async (req , res) => {
    console.log(req.body);
    const {email,password} = req.body;

    db.query('SELECT * FROM accounts WHERE email = ?', [email], async (error,results)=>{
        if (error) {
            console.log(error);
        }

        if (!results || !(await bcrypt.compare(password , results[0].password)) ){
            res.status(401).render('login',{
                msg: 'Invalid email or password!'
            })
        } else {
            const id = results[0].id;

            const token = jwt.sign({id}, process.env.JWT_SECRET ,{
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect("/home")
        }

    });


}

exports.isLoggedIn = async (req , res ,next) => {
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            db.query('SELECT * FROM accounts WHERE id= ?' ,[decoded.id] , (error , results) => {

                if(!results){
                    return next();
                }
                req.user = results[0];
                return next();
            });
        }catch (e) {
            console.log(e);
            return next();
        }
    } else {
        next();
    }


}

exports.logout = async (req , res ) => {
    res.cookie('jwt', 'logout',{
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}
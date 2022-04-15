const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
});

exports.newPost = (req , res) => {
    console.log(req.body);

    const {username, category, text, hashtag, img} = req.body;
    db.query('INSERT INTO posts SET ?', {username: username, category: category, text: text, hashtag: hashtag, img: img },(error,results) => {
      if (error) {
        console.log(error);
      }else{
        console.log(results);
        return res.render('home',{
          msg: 'New Post Added!'
        })
      }
    });
}

exports.getPostByUser = (req , res) => {
    console.log(req.params.username);

    db.query('SELECT * FROM posts WHERE username = ?', [req.params.username],(error,results) => {
      if (error) {
        console.log(error);
      }else if(results.length <= 0){
        return res.render('profile',{
          msg: 'No Posts Found!'
        })
      } else {
        console.log(results);
        return res.render('profile',{
          msg: 'Return Posts!'
        })
      }
    });
}

exports.getPostByCategory = (req , res) => {
    console.log(req.params.category);

    db.query('SELECT * FROM posts WHERE category = ?', [req.params.category],(error,results) => {
      if (error) {
        console.log(error);
      }else if(results.length <= 0){
        return res.render('home',{
          msg: 'No Posts Found!'
        })
      } else {
        console.log(results);
        return res.render('home',{
          msg: 'Return Posts!'
        })
      }
    });
}

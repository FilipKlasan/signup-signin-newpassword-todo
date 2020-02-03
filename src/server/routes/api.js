const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const db = "mongodb://filiptjofee:ficko123@ds257372.mlab.com:57372/filipevents";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({path: __dirname + '/.env'}); 
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');


mongoose.connect(db, err => {
              if(err){
                 console.error('Error: ' + err);
              }else{
                 console.log('Connected to mongodb');
              }
});
 

router.post('/registration', (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);
    let userData = {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            todoList: req.body.todoList
        }    
    let userObj = new User(userData);
        userObj.save()
                .then(user => {
                    console.log(user + ' has been registered');
                    res.send({statusObj: 'Successfully registered'});
                })
                .catch(err => {
                    console.log('Error: ' + err);
                    res.status(401).send('Error occurred');
                });  
});


router.post('/emailandusernameverification', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
            if(!user){
               User.findOne({username: userData.username})
                   .then(user => {
                       if(!user){
                          console.log('Email has been sent');
                          sendEmail(userData, res);
                       }
                       else{
                          console.log('Username already exists');
                          res.send({statusObj: 'Username already exists'});
                       }
                   })
                   .catch(err => {
                       console.log('Error: ' + err);
                       res.status(401).send('Error occurred');
                   });
            }
            else{
                console.log('Email already exists');
                res.send({statusObj: 'Email already exists'});
            }
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});

 
router.post('/login', (req, res) => {
   let userData = req.body;
   function comparePasswordAndSendToken(user){
     if(bcrypt.compareSync(userData.password, user.password)){
        let payload = {subject: user._id};
        let token = jwt.sign(payload, 'key');
        let obj = {
            token: token,
            userEmail: user.email
        }
        res.send({obj});
        console.log('Token has been sent');
     }
     else{
        console.log('Wrong password');
        res.send({statusObj: 'Wrong password'});
     }
    }
    User.findOne({email: userData.emailOrUsername})
        .then(user => {
            if(!user){
                User.findOne({username: userData.emailOrUsername})
                    .then(user => {
                        if(!user){
                            console.log('User does not exist');
                            res.send({statusObj: 'User does not exist'});
                        }
                        else{
                            comparePasswordAndSendToken(user);
                        }
                    })
                    .catch(err => {
                        console.log('Error: ' + err);
                        res.status(401).send('Error occurred');
                    });
            }
            else{
                comparePasswordAndSendToken(user);
            }
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});


router.post('/emailverificationnewpassword', (req, res) => {
        let userData = req.body;
        User.findOne({email: userData.email})
            .then(user => {
                if(!user){
                   console.log('Wrong email');
                   res.send({statusObj: 'Wrong email'});
                }
                else{
                   sendEmail(userData, res);
                }
            })
            .catch(err => {
                console.log('Error: ' + err);
                res.status(401).send('Error occurred');
            });
});

 
router.put('/newpassword', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
            let hashedPassword = bcrypt.hashSync(userData.password, 10);  
            user.password = hashedPassword;
            user.save()
                .then(user => {
                    console.log('Password successfully changed');
                    res.send({statusObj: 'Password successfully changed'});
                })
                .catch(err => {
                     console.log('Error: ' + err);
                     res.status(401).status('Error occurred');
                });  
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});


router.post('/inserttodo', verifyToken, (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
            user.todoList.push(userData.todo);
            user.save()
            .then(user => {
                console.log('Todo has been saved');
                res.send({statusObj: 'Todo has been saved'});
            })
            .catch(err => {
                console.log('Error: ' + err);
                res.status(401).status('Error occurred');
            });  
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});



router.put('/edittodo', verifyToken, (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
            user.todoList = userData.todoList;
            user.save()
                .then(user => {
                    console.log('Todo has been edited');
                    res.send({statusObj: 'Todo has been edited'});
                })
                .catch(err => {
                     console.log('Error: ' + err);
                     res.status(401).status('Error occurred');
                });  
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});


router.post('/getalltodos', verifyToken, (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
           let obj = {
               todoList:[]
           }
           if(user.todoList.length == 0){
               res.send({statusObj: 'Todo list is empty'})
           }
           else{
             let index = 0;
             user.todoList.forEach(todo => { 
                let tempObj = {
                    id: index + 1,
                    todo: todo
                }
                obj.todoList.push(tempObj);
                index++;
             });
             res.send({obj});
           }
        })
        .catch(err => {
           console.log('Error: ' + err);
           res.status(401).send('Error occurred');
        }); 
});


router.post('/deletetodo', verifyToken, (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
            user.todoList = userData.todoList;
            user.save()
                .then(user => {
                    console.log('Todo has been deleted');
                    res.send({statusObj: 'Todo has been deleted'});
                })
                .catch(err => {
                     console.log('Error: ' + err);
                     res.status(401).status('Error occurred');
                });  
        })
        .catch(err => {
            console.log('Error: ' + err);
            res.status(401).send('Error occurred');
        });
});


function verifyToken(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'key');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    next();
}


function sendEmail(userData, res){
    const userEmail = userData.email;
    let verificationCode = Math.round((Math.random() * 8999) + 1000).toString();
    const output = `<h3>Verification code: ${verificationCode}</h3>`;
    let transporter = nodemailer.createTransport({
       service: 'gmail',
       secure: false,
       port: 25,
       auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
       },
       tls:{
          rejectUnauthorized: false
        }
     });
    let mailOptions = {
       from: '"www.filipklasan.com" <filip.klasan.333@gmail.com>',
       to: userEmail,
       subject: 'Code verification',
       text: 'Hello world',
       html: output
    }
    transporter.sendMail(mailOptions, (error, info) => {
       if(error){
           console.log('Error: ' + error);
           res.status(401).send('Error occurred');
       }
       else{
           console.log('Message sent');
           res.send({statusObj: verificationCode});
       }
    });
}


module.exports = router;

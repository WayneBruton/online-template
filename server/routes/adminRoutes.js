const express = require("express");
const router = express.Router();
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);


let jwtSecret = process.env.JWT_SECRET;

const saltRounds = parseInt(process.env.SALT_ROUNDS);


let validateAddAdmin = (req, res, next) => {
    const schema = {
      email: Joi.string().email(),
      user_password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{6,32}$")),
      first_name: Joi.string(),
      last_name: Joi.string()
    };
  
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "You must provide a valid email address"
          });
          break;
        case "user_password":
          res.status(400).send({
            error: `Password must have the following: <br>
            1. One lower case letter <br>
            2. One upper case letter <br>
            3. One number <br>
            4. More than 5 characters and less than 32`
          });
          break;
        case "first_name":
          res.status(400).send({
            error: "Names cannot be blank"
          });
          break;
        case "last_name":
          res.status(400).send({
            error: "Names cannot be blank"
          });
          break;
        default:
          res.status(400).send({
            error: "Invalid registration information"
          });
      }
    } else {
      next();
    }
  };

  function jwtSignUser(adminUser) {
    const SIX_HOURS = 60 * 60 * 6;
    return jwt.sign(adminUser, process.env.JWT_SECRET, {
      expiresIn: SIX_HOURS
    });
  }

  router.post("/registerAdmin",validateAddAdmin, (req, res) => {
    let user_password = req.body.user_password;
    let mysql = "";
    bcrypt.hash(user_password, saltRounds, function(err, hash) {
      mysql = `insert into admin_users (first_name, email, user_password) values (
          '${req.body.first_name}', '${
        req.body.email
      }', '${hash}'
      )`;
      let mysql2 = `select * from admin_users where email = '${req.body.email}'`;
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          res.json({ error: "Error with connection" });
        }
        connection.query(mysql, function(error, result) {
          if (error) {
            return res.send({ error: "That email address is already in use." });
          }
        });
        connection.release();
      });
    });
  });

  router.put("/checkAdminEmail", (req, res) => {
    let mysql = `select email from admin_users where email = '${req.body.email}'`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) {
          res.send({ error: "There is an error, try again later" })
        };
        res.json(result);
        // console.log(result)
      });
      connection.release();
    });
  });

  router.put("/loginAdmin", (req, res) => {
      // console.log(req.body)
    let user_password = req.body.user_password;

    let mysql = `select * from admin_users where email = '${req.body.email}'`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        res.json({ error: "Error with connection. Are you online?" });
      }
      connection.query(mysql, function(error, result) {
        if (error) {
          res.json({ error: "No such admin user" });
        } else {
          if (!result.length) {
            res.json({
              error: `No user registered under "${req.body.email}", try ading an admin user as a user.`
            });
          } else {
            let hash = result[0].user_password;
            let userJson = {
              id: result[0].id,
              email: result[0].email
            };
            // console.log("RESULT IS::",result)
            bcrypt.compare(user_password, hash, function(err, response) {
              if (response) {
                res.json({
                  admin_user: userJson,
                  admin_username: result[0].first_name,
                  admin_token: jwtSignUser(userJson)
                });
              } else {
                res.json({
                  error: "Password is incorrect. Please try again"
                });
              }
            });
          }
        }
      });
      connection.release();
    });
  });

  let checktoken = (req, res, next) => {
      // console.log(req.body)
    let token = req.body.token;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: "Token is not valid"
        });
        next();
      } else {
        return res.send({
          success: true,
          message: "Token is valid"
        });
      }
    });
  };

  router.put("/authenticateAdmin", checktoken, (req, res) => {});



  router.put("/resetAdminPasswordLink", (req, res) => {
    console.log(req.body.email)

    // res.send({body: req.body.email})
    let mysql = `select email from admin_users where email = '${req.body.email}'`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) {
          res.send({ error: "There is an error, try again later" })
        };
        if (!result.length) {
          return res.send({error: 'No such email on our database.'})
        }
        let resetEmail = cryptr.encrypt(JSON.stringify(req.body.email))
        let resetURL = `${process.env.RESET_ADMIN_URL}/${resetEmail}`
        console.log('THIS IS THE REST URL',resetURL)
        //SEND EMAIL TO CLIENT

        let response = {
          success: "Your Email has been sent!",
          failure: "There was a problem, please try again later"
        };

        let email = req.body.email;
        // let message = req.body.message;
        const output = `
          <p>You have a new contact request</p>
          <br>
          <h3>RESET PASSWORD</h3>
           <h4>Email Address: ${email}</h4><br>
           <p>To reset your password click the following link
           <a href="${resetURL}">RESET</a></p><br>
           <p>or copy ${resetURL} into your browser</p><br>
           <p>If you did not try to reset your password, please ignore this email</P>
          <br><br>
          <p></strong>The Boredom Busters Team</strong></P>`;
       console.log(output)
        let transporter = nodemailer.createTransport({
          host: process.env.MAILHOST,
          port: 465, //587
      
          secure: true,
          auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
          },
          tls: {
            rejectUnauthorized: false
          }
        });
      
        let mailOptions = {
          from: "Boredom Busters Contact Form <donnae@boredombusters.co.za>",
          to: "waynebruton@icloud.com, boredombusters01@gmail.com",
          subject: `Boredom Busters Reset Password Form`,
          text: "Hello world?",
          html: output
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.send(response.failure)
          } else {
            res.send(response.success)
          } 
        });
      });
      connection.release();
    });
  });

  router.get("/resetAdminPasswordStart/:uri", (req, res) => {
      // console.log(req.params)
    let uri = req.params.uri
    uri = JSON.parse(cryptr.decrypt(uri))
    res.send({uri: uri})
  });
  
  router.put("/resetAdminPassword", (req, res) => {
    let user_password = req.body.password
    // console.log(req.body)
    if (req.body.password !== req.body.passwordRepeat) {
      return res.send({issues: "Passwords do not match"})
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      let mysql = `update admin_users set user_password = '${hash}' where email = '${req.body.email}'`
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          resizeBy.send("Error with connection");
        }
        connection.query(mysql, function(error, result) {
          if (error) {
            res.send({error: "There was a connection error"})
          };
          res.json(result);
        });
        connection.release();
      });
    })
    // res.send({itWorks: "AWESOME"})
  });

  
 



module.exports = router;

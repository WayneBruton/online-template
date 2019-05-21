const express = require("express");
const router = express.Router();
const pool = require("./connection");




  router.get("/productViews", (req, res) => {
  //  res.send({ok: "Yeah"})
   let mysql = `select id, product_name, views from products order by views desc limit 10`
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

  router.get("/customerViews", (req, res) => {
    //  res.send({ok: "Yeah"})
     let mysql = `select * from users order by email`
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


  router.post("/adminEditClientDetails", (req, res) => {
    //  res.send({ok: "Yeah"})
    console.log(req.body)
    let id = req.body.id
    let last_name  = req.body.last_name
    let  first_name  = req.body.first_name
    let email  = req.body.email
    let contact_number  = req.body.contact_number
    let delivery_address = req.body.delivery_address
    let postal_code = parseInt(req.body.postal_code)
    let suburb = req.body.suburb
    let city = req.body.city
    let province = req.body.province
     let mysql = `update users set last_name = '${last_name}', first_name = '${first_name}' , email = '${email}', contact_number = '${contact_number}',
     delivery_address = '${delivery_address}', postal_code = ${postal_code}, suburb = '${suburb}',city = '${city}', province = '${province}' where id = ${id} `
     console.log(mysql)
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          resizeBy.send("Error with connection");
        }
        connection.query(mysql, function(error, result) {
          if (error) {
            res.send({ error: "There is an error, try again later" })
          };
          res.json({success: "Client details updated"});
          // console.log(result)
        });
        connection.release();
      });
    });

    router.put("/customerInvoices", (req, res) => {
      console.log(req.body)
      let user_id = req.body.id
      //  res.send({ok: "Yeah"})
       let mysql = `select id, user_id, total_Value, invoice_date from invoices where user_id = ${user_id} order by invoice_date desc`
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
  


  

module.exports = router;

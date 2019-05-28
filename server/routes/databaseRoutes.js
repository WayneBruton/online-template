const express = require("express");
const router = express.Router();
const pool = require("./connection");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
  dest: "./public/uploads/"
});

router.post("/removeImageFileName", (req, res) => {
  console.log("THIS IS THE FILENAME", req.body.fileName);
  let fileName = req.body.fileName;
  fs.unlink(`public/uploads/${fileName}`, err => {
    console.log(err);
    console.log("File Deleted");
  });
  res.send({ fileDeleted: fileName });
});

router.post("/insertProductImage", upload.single("file"), (req, res) => {
  console.log(req.file);
  let fileType = req.file.mimetype.split("image/")[1];
  console.log(fileType);

  try {
    let filePath = req.file.path.split("public/")[1];
    let imageUrl = `${process.env.IMG_URL}/${filePath}`;
    res.json({
      File: req.file,
      imageFile: imageUrl,
      fileType: fileType
    });
  } catch (err) {
    res.json({ error: "Could not upload at this time, please try later" });
  }
});

router.post("/insertProduct", (req, res) => {
  let productImg = req.body.productImg;
  let product_name = req.body.product_name;
  let product_description = req.body.product_description;
  let product_weight = parseFloat(req.body.product_weight).toFixed(2);
  let product_length = parseFloat(req.body.product_length).toFixed(2);
  let product_height = parseFloat(req.body.product_height).toFixed(2);
  let product_breadth = parseFloat(req.body.product_breadth).toFixed(2);
  let price = parseFloat(req.body.price).toFixed(2);
  let available = req.body.isAvailable;
  let fileType = req.body.fileType;

  let mysql1 = `insert into products (product_name, product_description, product_weight, product_length, product_height, product_breadth, price, available ) values (
        '${product_name}', '${product_description}', ${product_weight}, ${product_length},${product_height}, ${product_breadth}, ${price}, ${available}
    )`;
  let mysql2 = `select id from products order by created_at desc limit 1`;

  let id;

  console.log(mysql1);
  console.log(mysql2);
  let mysql = `${mysql1};${mysql2}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      id = result[1][0].id;
      fs.rename(
        `public/uploads/${productImg}`,
        `public/images/product-${id}.${fileType}`,
        err => {
          if (err) {
            return console.log(err);
          }
          console.log("File renamed and moved!!!!");
        }
      );
      let mysql3 = `update products set product_image = '/images/product-${id}.${fileType}' where id = ${id}`;
      console.log(mysql3);
      connection.query(mysql3, function(error, result) {
        if (error) throw error;
        fs.rename(
          `public/uploads/${productImg}`,
          `public/images/product-${id}.${fileType}`,
          err => {
            if (err) {
              return console.log(err);
            }
            console.log("File renamed and moved!!!!");
          }
        );

        // console.log("ID IS::",id)
        res.json({ success: "New product successfully added." });
      });
    });
    connection.release();
  });
}); 

router.put("/checkProductName", (req, res) => {
  let product_name = req.body.productName;
//   console.log(product_name)

  let mysql = `select * from products where product_name = '${product_name}'`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
    //   console.log("File renamed and moved!!!!");
      if (result.length) {
          res.json({error: "This name has been used already."})
      }
      console.log(result)
    });
    connection.release();
  });
});

// ************************ EDIT ROUTES ********************

router.get("/productsToEdit", (req, res) => {
    let mysql = "select id, product_name, product_description, product_breadth, product_height, product_image,product_length, product_weight, price, available from products order by product_name";
    // let mysql = "select * from products order by product_name";
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        result.forEach(el => {
          el.product_image = `${process.env.IMG_URL}${el.product_image}`;
          el.price = el.price.toFixed(2);
        });
        res.json(result);
      });
      connection.release();
    });
  });


  router.post("/editProduct", (req, res) => {
      console.log(req.body)
    let id = req.body.id
    let productImg = req.body.productImg;
    let product_name = req.body.product_name;
    let product_description = req.body.product_description;
    let product_weight = parseFloat(req.body.product_weight).toFixed(2);
    let product_length = parseFloat(req.body.product_length).toFixed(2);
    let product_height = parseFloat(req.body.product_height).toFixed(2);
    let product_breadth = parseFloat(req.body.product_breadth).toFixed(2);
    let price = parseFloat(req.body.price).toFixed(2);
    let available = req.body.isAvailable;
    let fileType = req.body.fileType;

    if (fileType !== null) {
        fs.rename(
            `public/uploads/${productImg}`,
            `public/images/product-${id}.${fileType}`,
            err => {
              if (err) {
                return console.log(err);
              }
              console.log("File renamed and moved!!!!");
            }
          );
    }
    let mysql;
    let finalImage = `/images/product-${id}.${fileType}`
    if (fileType !== null) {
      mysql = `update products set product_image = '${finalImage}' ,product_name = '${product_name}', product_description = '${product_description}', product_weight = ${product_weight}, product_length = ${product_length}, product_height = ${product_height}, product_breadth = ${product_breadth}, price = ${price}, available = ${available} 
       where id = ${id}`
    } else {
        mysql = `update products set product_name = '${product_name}', product_description = '${product_description}', product_weight = ${product_weight}, product_length = ${product_length}, product_height = ${product_height}, product_breadth = ${product_breadth}, price = ${price}, available = ${available} 
       where id = ${id}`
    }
    console.log(mysql)
  
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        res.json({ success: "New product successfully changed." });
      });
      connection.release();
    });
  });

//   ****************** FAQ ROUTES **************************

router.post("/addFaq", (req, res) => {
    console.log(req.body)

    let mysql = `insert into faq (title, description) values ('${req.body.title}', '${req.body.narrative}')`

    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        res.json({success: 'FAQ Added'});
      });
      connection.release();
    });
  });

  router.get("/getFaq", (req, res) => {
    let mysql = "select * from faq order by title";
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        res.json(result);
      });
      connection.release();
    });
  });

  router.post("/deleteFaq", (req, res) => {
      console.log(req.body)
      let id = req.body.id
    let mysql = `delete from faq where id = ${id}`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function(error, result) {
        if (error) throw error;
        res.json({success: 'Question Deleted'});
      });
      connection.release();
    });
  });
  
module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("./connection");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const Report = require("fluentreports").Report;
const nodemailer = require("nodemailer");


router.put("/successURL", (req, res) => {
  let successURL = cryptr.encrypt(JSON.stringify(req.body));
  let decrypted = cryptr.decrypt(successURL);
  res.json({ successURL: successURL });
});
//
router.get("/successResponse/:pfast", (req, res) => {
  let successURL = req.params.pfast;
  let decrypted = cryptr.decrypt(successURL);
  // console.log(decrypted)
  let info = JSON.parse(decrypted);
  let initialData = [];
  primary_data = [];
  let invoiceNumber;
  let email;
  let firstName;
  let lastName
  let mysql = `select first_name, last_name, email from users where id = ${info.id}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      let sending = {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        amount_paid: info.finalAmount
      };
      email = result[0].email
      firstName = result[0].first_name
      lastName = result[0].last_name
      let mysql1 = `Insert into invoices (user_id, total_Value) values (${
        info.id
      }, ${info.finalAmount})`;
      let mysql2 = `update cart set invoice_number = (
          select id from invoices where user_id = ${
            info.id
          } order by invoice_date desc limit 1)
          where invoice_number is null`;
      let mysql3 = `select i.id as invoiceNumber, i.user_id as client, i.invoice_date, i.total_value as total, c.product_id, p.product_name, c.price as price,  c.quantity, 
          c.total, c.invoice_number, u.email, u.first_name, u.last_name, u.delivery_address, u.postal_code,
          u.suburb, u.city, u.province
          from 
          invoices i, cart c, users u, products p
          where  
          i.id = c.invoice_number and 
          i.user_id = c.user_id and
          p.id = c.product_id and
          i.user_id = ${info.id} 
          and i.invoice_date = (select invoice_date from invoices where user_id = ${
            info.id
          } order by invoice_date desc limit 1)`;
      let mysql = `${mysql1};${mysql2};${mysql3}`;
      res.json(sending);
      connection.query(mysql, function(error, result) {
        if (error) {
          console.log('ERROR IS',error);
        }
        try {
          invoiceNumber = result[2][0].invoiceNumber;
        } catch (e) {
          invoiceNumber = 0 
        }

        let data = result[2];
        data.forEach(el => {
          let dataObject = {
            no: 1,
            date: el.invoice_date,
            invoiceNumber: el.invoiceNumber,
            type: "Purchase",
            name: `${el.first_name} ${el.last_name}`,
            address_1: el.delivery_address,
            address_2: "",
            address_3: "",
            suburb: el.suburb,
            city: el.city,
            state: el.province,
            zip: el.postal_code,
            qty: el.quantity,
            price: el.price,
            amount: el.total,
            description: el.product_name,
            "product.product_type": 1
          };
          initialData.push(dataObject);
        });
        let salesItemAfterDelivery = info.finalAmount;
        let salesBeforeDelivery = data.reduce((prev, el) => {
          return (prev = prev += parseFloat(el.total));
        }, 0);
        let delivery = salesItemAfterDelivery - salesBeforeDelivery;

        let dataObject2 = {
          no: 1,
          date: data[0].invoiceDate,
          invoiceNumber: "",
          type: "Delivery",
          name: '',
          address_1: "",
          address_2: "",
          address_3: "",
          suburb: "",
          city: "",
          state: "",
          zip: "",
          qty: "",
          price: delivery,
          amount: delivery,
          description: "",
          "product.product_type": 2
        };
        initialData.push(dataObject2);
        let dataObject3 = {
          no: 1,
          date: data[0].invoiceDate,
          invoiceNumber: "",
          type: "",
          name: '',
          address_1: "",
          address_2: "",
          address_3: "",
          suburb: "",
          city: "",
          state: "",
          zip: "",
          qty: "",
          price: salesItemAfterDelivery,
          amount: salesItemAfterDelivery,
          description: "",
          "product.product_type": 3
        };
        initialData.push(dataObject3);
        primary_data = initialData;
        printreport(invoiceNumber);
        console.log('Invoice Number:',invoiceNumber)
        console.log('Email is:',email)
        console.log('FirstName:',firstName)
        console.log('LastName:',lastName)
        

        //********************************** */


        let response = {
          success: "Your Email has been sent!",
          failure: "There was a problem, please try again later"
        };
        // res.send(response.success)
      
        let firstname = firstName;
        let lastname = lastName;
        email = email;
      
        const output = `
          
          <br>
          <h3>Thank you for your business.</h3>
      
          <p>Dear ${firstname} ${lastname} thank you for your purchase.</p>
          <br>
          <p>Your invoice is attached. Should you have any queries please do not hesitate to contact us.</p>
      
          <br><br>
      
          <p>Yours</p>
          <p>Boredom Busters</p>
          <h3 style="font-weight: bold;">Message</h3><br>
          `;
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
                                                     
          var mailOptions = {
            from: "Boredom Busters<donnae@boredombusters.co.za>", // sender address                                   
            to: "waynebruton@icloud.com, boredombusters01@gmail.com", // list of receivers                                 
            subject: `Boredom Busters Invoice`, // Subject line                                                 
            text: "Hello world?", // plaintext body                                                 
            html: output, // html body                                               
              attachments: [
                  {
                      filename: `Invoice-${invoiceNumber}.pdf`, 
                      path: `public/files/Invoice-${invoiceNumber}.pdf`,                                        
                      contentType: 'application/pdf'
                  }]
          };
        
      
        // let mailOptions = {
        //   from: "Boredom Busters Contact Form <donnae@boredombusters.co.za>",
        //   to: "waynebruton@icloud.com, boredombusters01@gmail.com",
        //   subject: `Boredom Busters Contact Form`,
        //   text: "Hello world?",
        //   html: output
        // };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(response.failure)
          } else {
            console.log(response.success)
          } 
        });
        //*************************************************** */



      });
    });
   

    connection.release();
  });
});

let primary_data;

function printreport(invoiceNumber) {
  "use strict";

  var detail = function(x, r, s) {
    x.band(
      [
        { data: r.description, width: 240 },
        { data: r.qty, width: 50, align: 3 },
        { data: parseFloat(r.price).toFixed(2), width: 60, align: 3 },
        { data: parseFloat(r.amount).toFixed(2), width: 90, align: 3 }
      ],
      { x: 30 }
    );
  };

  var productTypeHeader = function(x, r) {
    x.fontBold();
    x.band([{ data: r.type, width: 240, fontBold: true }], { x: 20 });
    x.fontNormal();
  };

  var productTypeFooter = function(x, r) {
    x.fontBold();
    x.band(
      [
        { data: r.type + " Total:", width: 110, align: 3 },
        { data: parseFloat(x.totals.amount).toFixed(2), width: 90, align: 3 }
      ],
      { x: 270 }
    );
    x.fontNormal();

    x.fontNormal();
  };

  var proposalHeader = function(x, r) {
    var fSize = 9;
    x.print("Some arbitrary addressAA in the Eastern Cape, OK 73533", {
      x: 20,
      fontsize: fSize
    });
    x.print("INVOICE", { x: 40, y: 70, fontSize: fSize + 19, fontBold: true });
    x.band(
      [
        { data: "Invoice #:", width: 70, fontSize: 9 },
        { data: r.invoiceNumber, width: 70, align: "left", fontSize: 9 }
      ],
      { x: 400, y: 60 }
    );
    invoiceNumber = r.invoiceNumber;
    x.band(
      [
        { data: "Date:", width: 70, fontSize: 9 },
        { data: r.date, width: 70, fontSize: 9 }
      ],
      { x: 400 }
    );
    x.band(
      [{ data: "Prepared For:", width: 100, fontSize: 9, fontBold: true }],
      { x: 400 }
    );
    x.fontSize(9);

    if (r.name) {
      x.band([{ data: r.name, width: 150 }], { x: 410 });
    }
    if (r.address_1) {
      x.band([{ data: r.address_1, width: 150 }], { x: 410 });
    }
    if (r.address_2) {
      x.band([{ data: r.address_2, width: 150 }], { x: 410 });
    }
    if (r.address_3) {
      x.band([{ data: r.address_3, width: 150 }], { x: 410 });
    }
    if (r.suburb) {
      x.band([{ data: r.suburb, width: 150 }], { x: 410 });
    }
    if (r.city) {
      x.band([{ data: r.city + ", " + r.state + " " + r.zip, width: 150 }], {
        x: 410
      });
    }
    x.fontSize(8);
    x.newline();
    x.newline();
    x.fontSize(11);
    x.band(
      [
        { data: "Description", width: 250 },
        { data: "Qty", width: 60, align: 3 },
        { data: "Price", width: 70, align: 3 },
        { data: "Total", width: 90, align: 3 }
      ],
      { x: 0 }
    );
    x.bandLine(1);
  };

  var proposalFooter = function(x, r) {
    x.newline();
    x.newline();
    x.newline();
    x.newline();
    x.newline();
    x.fontSize(7.5);
    x.print(
      "To place an order for the goods and services provided by us, please either contact us to place your order or fax a copy " +
        "of your PO to 999-555-1212",
      { x: 40, width: 570 }
    );
    x.print(
      "Please call us if you have any other questions about your order. Thank you for your business!",
      { x: 40, width: 570 }
    );
  };

  var report = new Report(`public/files/Invoice-${invoiceNumber}.pdf`).data(
    primary_data
  );
  var r = report
    .margins(20)
    .pageheader(function(x) {
      x.print("Boredom Buster's Invoicing System");
    })
    .detail(detail);

  report
    .groupBy("no")
    .header(proposalHeader)
    .footer(proposalFooter)

    .groupBy("product.product_type")
    .sum("amount")

    .header(productTypeHeader)
    .footer(productTypeFooter);
  r.printStructure();
  report.render(function(err, name) {});
}

function sendInvoice(invoiceNumber, firstName, lastName, email) {
  

}

module.exports = router;

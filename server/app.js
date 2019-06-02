const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const history = require("connect-history-api-fallback");
app = express();

// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

if (port === 3000) {
  const dotenv = require("dotenv").config();
}

// console.log(__dirname)

app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// const storeRoutes = require("../server/routes/store"),
const storeRoutes = require("./routes/store"),
  authorizationRoutes = require("./routes/authorizationRoutes"),
  checkoutRoutes = require("./routes/checkoutRoutes"),
  finalizePaymentRoutes = require("./routes/finalizePaymentRoutes"),
  contactRoutes = require("./routes/contactRoutes"),
  authenticationRoutes = require("./routes/authenticationRoutes"),
  adminRoutes = require("./routes/adminRoutes"),
  databaseRoutes = require("./routes/databaseRoutes"),
  statsRoutes = require("./routes/statsRoutes");
 historyRoutes = require("./routes/historyRoutes");

app.use(storeRoutes);
app.use(contactRoutes);
app.use(checkoutRoutes);
app.use(finalizePaymentRoutes);
app.use(authenticationRoutes);
app.use(databaseRoutes);
app.use(statsRoutes);

app.use(adminRoutes);
app.use(authorizationRoutes);

// const history = require("connect-history-api-fallback");

// // const staticFileMiddleware = express.static(path.join(__dirname + "/dist"));
// const staticFileMiddleware = express.static("/");

// app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);
// app.use(staticFileMiddleware);

app.get("/", function(req, res) {
  // res.render(path.join(__dirname + "/dist/index.html"));
  // res.render(path.join(__dirname + "/index.html"));
  res.render("index.html");
});



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

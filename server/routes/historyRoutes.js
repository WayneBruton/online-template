const express = require('express');
const path = require('path');
const router = express.Router();

const history = require('connect-history-api-fallback');

// const app = express();

// const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

// router.use(staticFileMiddleware);
router.use(history({
  disableDotRule: true,
  verbose: true
}));
// app.use(staticFileMiddleware);

router.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});

// var server = app.listen(process.env.PORT || 8080, function () {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });
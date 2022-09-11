const express = require("express");
const uploadRouter = require("./router");
const Retrieve = require("./Retrieve");
const Delete = require("./Delete");
const app = express();
const router = express.Router();
// const port = process.env.PORT || 8080;
// const cors = require("cors");
const serverless = require("serverless-http");

// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     callback(null, true);
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(uploadRouter);
router.get("/", (req, res) => {
  res.send("hello");
});
router.get("/response", (req, res) => {
  Retrieve().then((resp) => {
    res.send({ driveresponse: resp });
  });
});
router.get("/delete", (req, res) => {
  Delete().then((resp) => {
    res.send({ Message: "Files Deleted" });
  });
});
// app.listen(port, () => {
//   console.log("Form running on port 8080");
// });

app.use("/", router);

module.exports.handler = serverless(app);
